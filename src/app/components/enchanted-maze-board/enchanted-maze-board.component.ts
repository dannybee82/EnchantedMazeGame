import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { MazeService } from '../../services/maze.service';
import { MazePiece } from '../../models/maze-piece.interface';
import { EnchantedMazePieceComponent } from '../enchanted-maze-piece/enchanted-maze-piece.component';
import { InsertPieceService } from '../../services/insert-piece.service';
import { ComputerPlayer } from '../../methods/ComputerPlayer';
import { TurnService } from '../../services/turn.service';
import { Turn } from '../../models/turn.interface';
import { MazePaths } from '../../models/maze-paths.interface';
import { LastInsertedPositionService } from '../../services/last-inserted-position.service';
import { LastInsertedPosition } from '../../models/last-inserted-position.interface';
import { ShowHint } from '../../models/show-hint.interface';
import { ShowHintService } from '../../services/show-hint.service';
import { GameSettingsService } from '../../services/game-settings.service';
import { ComputerInsert } from '../../models/computer-insert.interface';
import { ComputerMove } from '../../models/computer-move.interface';
import { Position } from '../../models/position.interface';
import { Observable, concatMap, interval, of } from 'rxjs';
import { Score } from '../../models/score.interface';
import { ScoreService } from '../../services/score.service';
import { TreasureService } from '../../services/treasure.service';
import { Treasure } from '../../models/treasure.interface';
import { TreasureData } from '../../models/treasure-data.interface';

@Component({
  selector: 'app-enchanted-maze-board',
  standalone: true,
  imports: [
    EnchantedMazePieceComponent
  ],
  templateUrl: './enchanted-maze-board.component.html',
  styleUrl: './enchanted-maze-board.component.scss'
})
export class EnchantedMazeBoardComponent extends ComputerPlayer implements OnInit {

  showBoard: WritableSignal<boolean> = signal(false);
  isInsertDisabled: WritableSignal<boolean> = signal(false);

  pieces: MazePiece[] = [];

  showHint: ShowHint = { side: -1, index: -1 };

  constructor(
    private mazeService: MazeService,
    private insertPieceService: InsertPieceService,
    private turnService: TurnService,
    private lastInsertedPositionService: LastInsertedPositionService,
    private showHintService: ShowHintService,
    private gameSettingsService: GameSettingsService,
    private scoreService: ScoreService,
    private treasureService: TreasureService
  ) {
    super();
  }

  ngOnInit(): void {
    this.mazeService.maze$.subscribe((data: MazePiece[]) => {
      if(data.length > 0) {
        this.pieces = data;
        this.showBoard.set(true);
      }
    });

    this.showHintService.showHint$.subscribe((data: ShowHint) => {
      this.showHint = data;
    });

    this.turnService.turns$.subscribe((data: Turn) => {
      const currentPlayer: number = data.currentPlayerTurn;
      const humanOrComputer: boolean[] = data.humanOrComputer;
      const isPieceInserted = this.insertPieceService.isPieceInserted$.getValue();

      if(isPieceInserted || !humanOrComputer[currentPlayer]) {
        this.isInsertDisabled.set(true);
      } else {
        this.isInsertDisabled.set(false);
      }

      if(!humanOrComputer[currentPlayer]) {
        this.currentTurnForHumanOrComputer(currentPlayer);
      }
    });

    this.insertPieceService.isPieceInserted$.subscribe((data: boolean) => {
      this.isInsertDisabled.set(data);
    });
  }

  getPiece(row: number, column: number): MazePiece {
    const piece: MazePiece | undefined = this.pieces.find(item => item.row === row && item.column === column);

    if(piece !== undefined) {
      return piece;
    }

    return this.mazeService.getDefaultPiece();
  }

  insertPieceAxis(isInsertAxisY: boolean, fromTopOrLeft: boolean, rowOrcolumn: number) : void {    
    this.showHint = { side: -1, index: -1 };

    const mazePieces: MazePiece[] = this.insert(
      this.mazeService.maze$.getValue(), 
      this.insertPieceService.currentPiece$.getValue(), 
      isInsertAxisY, 
      fromTopOrLeft, 
      rowOrcolumn, 
      false
    );
    const insertPiece: MazePiece = this.getChangedCurrentPiece();

    this.mazeService.updateMaze(mazePieces);
    this.insertPieceService.updatePiece(insertPiece);

    const lastPosition: LastInsertedPosition = {
      column: isInsertAxisY ? rowOrcolumn : -1,
      row: isInsertAxisY ? -1 : rowOrcolumn
    };
    this.lastInsertedPositionService.update(lastPosition);

    const turn: Turn = this.turnService.turns$.getValue();
    const currentPlayer = turn.currentPlayerTurn;

    if (insertPiece.player == turn.currentPlayerTurn) {
      this.endTurn();
    } else {        
      this.insertPieceService.setPieceInserted(true);
      const mazePaths: MazePaths[] = this.search(turn.currentPlayerTurn, this.mazeService.maze$.getValue());

      if (turn.humanOrComputer[currentPlayer]) {          
        this.pieces = this.showPlayerPaths(this.pieces, mazePaths, true);
      }
    }  
  }

  private endTurn(): void {
    this.showHint = { side: -1, index: -1 };
    this.clearPaths();

    const amountOfPlayers: number = this.gameSettingsService.gameSettings$.getValue().amountOfPlayers;
    this.insertPieceService.setPieceInserted(false);

    this.turnService.nextTurn(amountOfPlayers); 
  }

  private currentTurnForHumanOrComputer(cpuPlayer: number) : void {    
    //Computer control from this point.
    const insertPiece: MazePiece = this.insertPieceService.currentPiece$.getValue();
    const cpuInsert: ComputerInsert = this.computerInsertCalculation(this.pieces, insertPiece, cpuPlayer, this.fixedRowAndColumnIndexes);

    if(insertPiece.orientation != cpuInsert.orientation) {
      insertPiece.orientation = cpuInsert.orientation;
    }

    if(!cpuInsert.insertAxisY) {
      this.insertCpuAxis(false, cpuInsert.isTopOrLeft, cpuInsert.rowOrColumnIndex);  
    } else {
      this.insertCpuAxis(true, cpuInsert.isTopOrLeft, cpuInsert.rowOrColumnIndex);
    }
  }

  private insertCpuAxis(isInsertAxisY: boolean, fromTop: boolean, rowOrcolumn: number) : void {
    let insertPiece: MazePiece = this.insertPieceService.currentPiece$.getValue();

    const mazePieces: MazePiece[] = this.insert(this.mazeService.maze$.getValue(), insertPiece, isInsertAxisY, fromTop, rowOrcolumn, false);
    insertPiece = this.getChangedCurrentPiece();

    this.mazeService.updateMaze(mazePieces);
    this.insertPieceService.updatePiece(insertPiece);

    const lastInserted: LastInsertedPosition = {
      row: isInsertAxisY ? -1 : rowOrcolumn,
      column: isInsertAxisY ? rowOrcolumn : -1
    };
    this.lastInsertedPositionService.update(lastInserted);

    const turn: Turn = this.turnService.turns$.getValue();

    if (insertPiece.player == turn.currentPlayerTurn) {
      this.endTurn();
    } else {
      this.insertPieceService.setPieceInserted(true);        
      this.cpuMove();
    }    
  }

  private cpuMove() : void {
    const turn: Turn = this.turnService.turns$.getValue();
    const insertPiece: MazePiece = this.insertPieceService.currentPiece$.getValue();

    let cpuMove: ComputerMove = this.computerMoveCalculation(this.pieces, insertPiece, turn.currentPlayerTurn);

    if(cpuMove.canMove) {
      this.insertPieceService.setPieceInserted(true);
      const position: Position = { row: cpuMove.row, column: cpuMove.column };
      this.movePlayer(position);
    } else {
      this.endTurn();
    }
  }

  movePlayer($event: Position) : void {
    const isPieceInserted = this.insertPieceService.isPieceInserted$.getValue();

    if(isPieceInserted) {
      let canContinue: boolean = true;

      const insertPiece: MazePiece = this.insertPieceService.currentPiece$.getValue();
      const turn: Turn = this.turnService.turns$.getValue();

      if(insertPiece.player == turn.currentPlayerTurn) {
        canContinue = false;
        this.endTurn();        
      }

      //Test path validity.
      const pieces: MazePiece[] = this.mazeService.maze$.getValue();
      const playerPaths: MazePaths[] = this.search(turn.currentPlayerTurn, pieces);

      let indexFound: number = playerPaths.findIndex(item => item.column == $event.column && item.row == $event.row);

      if(canContinue && indexFound == -1) {
        canContinue = false;
      }

      if(canContinue && !this.canMove(this.pieces, playerPaths, indexFound, turn.currentPlayerTurn)) {
        canContinue = false;
      }

      if(canContinue) {
        let path: MazePaths = playerPaths[indexFound];
        let indexPlayer: number = this.pieces.findIndex(item => item.player == turn.currentPlayerTurn);
        let destination: number = this.pieces.findIndex(item => item.row == path.row && item.column == path.column);

        this.pieces = this.showPlayerPaths(this.pieces, playerPaths, false);

        if(!this.isNotSamePiece(this.pieces, destination, indexPlayer)) {
          this.pieces[indexPlayer].player = -1;

          let shortestRoute: number[][] = this.findShortestWay(this.pieces, playerPaths, this.pieces[indexPlayer].row, this.pieces[indexPlayer].column, this.pieces[destination].row, this.pieces[destination].column);

          if(shortestRoute.length > 2) {
            let subscription = this.animateRefactored(shortestRoute).subscribe({
              next: (positions) => {
                if(positions.length > 0) {
                  this.animatePositions(positions, turn.currentPlayerTurn);      
                  this.clearPreviousRoutes(positions);              
                } else {
                  this.checkTreasure(indexPlayer, destination); 
                  
                  subscription.unsubscribe();                          
                }                              
              },
              complete: () => {}
            });
          } else {
            this.checkTreasure(indexPlayer, destination);
          }          
        } else {
          this.endTurn();
        }
      }
    } else {
      alert('Insert piece first');
    }    
  }

  private animateRefactored(shortestRoutes: number[][]) : Observable<number[]> {
    let positions: number[] = [];

    const interval$: Observable<number[]> = interval(500).pipe(
      concatMap(x => {
        if(x < shortestRoutes.length - 1) {
          positions = [];
          positions.push(shortestRoutes[x][0]);
          positions.push(shortestRoutes[x][1]);
          positions.push(shortestRoutes[x + 1][0]);
          positions.push(shortestRoutes[x + 1][1]);
          return of(positions);
        }

        return of([]);
      })
    );   

    return interval$;
  }

  private animatePositions(positions: number[], playersTurn: number) : void {
    let playerIndex: number = this.findIndexOfPiece(this.pieces, positions[0], positions[1]);
    let destinationIndex: number = this.findIndexOfPiece(this.pieces, positions[2], positions[3]);

    if(playerIndex > - 1 && destinationIndex > -1) {
      this.pieces = this.move(this.pieces, destinationIndex,  playerIndex, playersTurn);
    }
  }

  private clearPreviousRoutes(shortestRoute: number[]) : void {
    for(let i = 0; i < shortestRoute.length; i++) {      
      let indexFound: number = this.pieces.findIndex(item => item.row == shortestRoute[0] && item.column == shortestRoute[1]);

      if(indexFound > -1) {
        this.pieces[indexFound].player = -1;
      }
    }
  }

  checkTreasure(indexPlayer: number, destination: number) : void {
    const turn: Turn = this.turnService.turns$.getValue();
    const playerTurn: number = turn.currentPlayerTurn;
    const humanOrComputer: boolean[] = turn.humanOrComputer;

    const pieces: MazePiece[] = this.mazeService.maze$.getValue();
    const playerPaths: MazePaths[] = this.search(turn.currentPlayerTurn, pieces);

    if(humanOrComputer[playerTurn]) {
      this.pieces = this.showPlayerPaths(this.pieces, playerPaths, false);
    }

    this.pieces = this.move(this.pieces, destination, indexPlayer, playerTurn);

    if (this.hasTreasure(this.pieces, destination, playerTurn)) {
      let scoreObject: Score = this.scoreService.score$.getValue();

      let score: number[] = scoreObject.scores;
      score[playerTurn]++;
      scoreObject.scores = score;
      scoreObject.totalTreasuresFound++;
      this.scoreService.updateScore(scoreObject);

      this.pieces[destination].hasTreasure = false;
      this.pieces[destination].treasureForPlayer = -1;
      this.pieces[destination].treasureImage = '';

      const treasureData: TreasureData = this.treasureService.treasureData$.getValue();

      if (treasureData.index < treasureData.treasures.length) {        
        const nextTreasure: Treasure = treasureData.treasures[treasureData.index];
        this.mazeService.placeSingleTreasure(nextTreasure, playerTurn);

        this.pieces = this.move(this.pieces, destination, indexPlayer, playerTurn);
        this.mazeService.updateMaze(this.pieces);

        treasureData.index = treasureData.index + 1;
        this.treasureService.update(treasureData);
        this.endTurn();
      } else {
        this.pieces = this.move(this.pieces, destination, indexPlayer, playerTurn);
        this.mazeService.updateMaze(this.pieces);
        this.finishGame();
      }            
    } else {
      this.pieces = this.move(this.pieces, destination, indexPlayer, playerTurn);
      this.mazeService.updateMaze(this.pieces);
      this.endTurn();
    }
  }

  private finishGame() : void {
    this.insertPieceService.setPieceInserted(true);

    const scoreObject: Score = this.scoreService.score$.getValue();
    scoreObject.isGameEnded = true;
    this.scoreService.updateScore(scoreObject);
  }

}