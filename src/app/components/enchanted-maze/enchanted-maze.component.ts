import { Component } from '@angular/core';

//Models.
import { MazePiece } from 'src/app/models/MazePiece';
import { MazePaths } from 'src/app/models/MazePaths';
import { MazeTreasures } from 'src/app/models/MazeTreasures';
import { ComputerInsert } from 'src/app/models/ComputerInsert';
import { ComputerMove } from 'src/app/models/ComputerMove';

//Services.
import { GameSettingsService } from 'src/app/services/game-settings.service';
import { MazeService } from 'src/app/services/maze.service';
import { TreasuresService } from 'src/app/services/treasures.service';
import { TurnAndScoreboardService } from 'src/app/services/turn-and-scoreboard.service';

//Methods.
import { ComputerPlayer } from 'src/app/methods/ComputerPlayer';

//Animations.
import { PieceInserted } from 'src/app/methods/Animations';
import { Observable, concatMap, interval, of } from 'rxjs';

@Component({
  selector: 'app-enchanted-maze',
  templateUrl: './enchanted-maze.component.html',
  styleUrls: ['./enchanted-maze.component.css'],
  animations: [PieceInserted]
})

export class EnchantedMazeComponent extends ComputerPlayer {
 
  public humanOrComputer: boolean[] = [];
  public pieces: MazePiece[] = [];  
  public currentPiece?: MazePiece;

  private _playersTurn: number = 0;
  public insertPiece: boolean = false;
  
  private _playerPaths: MazePaths[] = [];

  private _hint: number [] = [-1, -1];

  public isGameEnded: boolean = false;

  public logMessages: string[] = [];  

  private _lastInsertedAxisY: boolean = false;
  private _lastInsertedRowOrColumn: number = -1;

  private _amountOfPlayers: number = 0;

  constructor(private gameSettingsService: GameSettingsService, private mazeService: MazeService, private treasuresService: TreasuresService,
    private turnAndScoreboardService: TurnAndScoreboardService) {
    super();

    //Listen for changes.
    this.gameSettingsService.getStartGame().subscribe({
      next: (result) => {
        if(result) {
          this.setupNewGame();
        } else {
          this.resetDefaults();
        }
      }      
    });
  }  

  getImageOfPiece(row: number, column: number) : string {
    let index: number = this.pieces.findIndex(item => item.row == row && item.column == column);
    return (index > -1) ? this.pieces[index].pieceImage : "";
  }

  getImageOrientation(row: number, column: number) : number {
    let index: number = this.pieces.findIndex(item => item.row == row && item.column == column);
    return (index > -1) ? this.pieces[index].orientation : 0;
  }
 
  rotateCurrentPiece(isClockwise: boolean) : void {
    if(this.currentPiece !== undefined) {
      let currentOrientation: number = this.currentPiece.orientation;

      (isClockwise) ? currentOrientation += 1 : currentOrientation -= 1;
      currentOrientation = (currentOrientation >= 4)  ? 0 : currentOrientation;
      currentOrientation = (currentOrientation < 0)  ? 3 : currentOrientation;
    
      this.currentPiece.orientation = currentOrientation;
    }
  }

  insertPieceAxis(isInsertAxisY: boolean, fromTopOrLeft: boolean, rowOrcolumn: number) : void {
    this.turnAndScoreboardService.setMessage('');
    this.turnAndScoreboardService.setUpdateTurnAndScore(true);

    if (!this.insertPiece && this.currentPiece != undefined) {
      this.pieces = this.insert(this.pieces, this.currentPiece, isInsertAxisY, fromTopOrLeft, rowOrcolumn, false);
      this.currentPiece = this.getChangedCurrentPiece();

      this._lastInsertedAxisY = isInsertAxisY;
      this._lastInsertedRowOrColumn = rowOrcolumn;

      if (this.getPlayerAtCurrentPiece() == this._playersTurn) {
        this.endTurn();
      } else {
        this.insertPiece = true;
        this._playerPaths = this.search(this._playersTurn, this.pieces);

        if (this.humanOrComputer[this._playersTurn]) {          
          this.pieces = this.showPlayerPaths(this.pieces, this._playerPaths, true);
        }
      }
    }    
  }

  isInsertDisabled() : boolean {
    if(this.insertPiece || !this.humanOrComputer[this._playersTurn]) {
      return true;
    }

    return false;
  }

  isPlayerLocation(row: number, column: number) : boolean {
    let index: number = this.pieces.findIndex(item => item.row == row && item.column == column);
    return (index == -1) ? false : (this.pieces[index].player > -1) ? true : false;
  }

  getPlayerAtCurrentPiece() : number {
    if(this.currentPiece != undefined) {
      return this.currentPiece.player;
    }

    return -1;
  }

  getPlayerNumber(row: number, column: number) : number {
    let index: number = this.pieces.findIndex(item => item.row == row && item.column == column);
    return this.pieces[index].player;
  }

  getPlayersTurn() : number {
    return this._playersTurn;
  }

  nextTurn() : void {
    if(this._playersTurn + 1 == this._amountOfPlayers) {
      this._playersTurn = 0;
      let currentTurns: number = this.turnAndScoreboardService.getTotalTurns();
      this.turnAndScoreboardService.setTotalTurns(currentTurns + 1);
      this.turnAndScoreboardService.setUpdateTurnAndScore(true);
    } else {
      this._playersTurn++;
    }

    this.currentTurnForHumanOrComputer();
  }

  currentTurnForHumanOrComputer() : void {
    this.addLoggingMessage("----------");
    this.addLoggingMessage("Player: " + (this._playersTurn + 1));

    if(!this.humanOrComputer[this._playersTurn] && this.currentPiece != undefined) {
      //Computer control from this point.
      let cpuInsert: ComputerInsert = this.computerInsertCalculation(this.pieces, this.currentPiece, this._playersTurn, this.fixedRowAndColumnIndexes);

      if(this.currentPiece.orientation != cpuInsert.orientation) {
        this.currentPiece.orientation = cpuInsert.orientation;
        this.addLoggingMessage("CPU rotated piece to: " + this.orientationNames[cpuInsert.orientation] );
      } else {
        this.addLoggingMessage("CPU doesn't rotate piece.");
      }

      if(!cpuInsert.insertAxisY) {
        this.addLoggingMessage("CPU inserts in column. At index:" + cpuInsert.rowOrColumnIndex);
      } else {
        this.addLoggingMessage("CPU inserts in row. At index:" + cpuInsert.rowOrColumnIndex);
      }

      if(!cpuInsert.insertAxisY) {
        (cpuInsert.isTopOrLeft) ? this.addLoggingMessage("Column Left") : this.addLoggingMessage("Columnn Right");
      } else {
        (cpuInsert.isTopOrLeft) ? this.addLoggingMessage("Row Top") : this.addLoggingMessage("Row Bottom");
      }

      if(!cpuInsert.insertAxisY) {
        this.insertCpuAxis(false, cpuInsert.isTopOrLeft, cpuInsert.rowOrColumnIndex);  
      } else {
        this.insertCpuAxis(true, cpuInsert.isTopOrLeft, cpuInsert.rowOrColumnIndex);
      }      
    }
  }

  insertCpuAxis(isInsertAxisY: boolean, fromTop: boolean, rowOrcolumn: number) : void {
    if (this.currentPiece != undefined) {
      this.pieces = this.insert(this.pieces, this.currentPiece, isInsertAxisY, fromTop, rowOrcolumn, false);
      this.currentPiece = this.getChangedCurrentPiece();

      this._lastInsertedAxisY = isInsertAxisY;
      this._lastInsertedRowOrColumn = rowOrcolumn;

      if (this.getPlayerAtCurrentPiece() == this._playersTurn) {
        this.endTurn();
      } else {
        this.insertPiece = true;
        this._playerPaths = this.search(this._playersTurn, this.pieces);

        this.cpuMove();
      }
    } else {
      this.endTurn();
    }
  }

  cpuMove() : void {
    if(!this.humanOrComputer[this._playersTurn] && this.currentPiece != undefined) {
      let cpuMove: ComputerMove = this.computerMoveCalculation(this.pieces, this.currentPiece, this._playersTurn);

      if(cpuMove.canMove) {
        this.addLoggingMessage("CPU can move.");
        this.addLoggingMessage("Target Row: " + cpuMove.row);
        this.addLoggingMessage("Target Column: " + cpuMove.column);

        this.movePlayer(cpuMove.row, cpuMove.column);
      } else {
        this.addLoggingMessage("CPU can't move!");
        this.endTurn();
      }

      this.addLoggingMessage("End turn for CPU");
    }
  }

  addLoggingMessage(message: string) : void {
    this.logMessages.push(message);

    if(this.logMessages.length == 15) {
      this.logMessages.shift();
    }
  }

  isPieceInserted() : boolean {
    return this.insertPiece;
  }

  movePlayer(row: number, column: number) : void {
    if(this.insertPiece) {
      let canContinue: boolean = true;

      if(this.getPlayerAtCurrentPiece() == this._playersTurn) {
        canContinue = false;
        this.endTurn();        
      }

      //Test path validity.
      let indexFound: number = this._playerPaths.findIndex(item => item.column == column && item.row == row);

      if(canContinue && indexFound == -1) {
        canContinue = false;
        this.turnAndScoreboardService.setMessage("Can't move to that place.");
        this.turnAndScoreboardService.setUpdateTurnAndScore(true);
      }

      if(canContinue && !this.canMove(this.pieces, this._playerPaths, indexFound, this._playersTurn)) {
        canContinue = false;
        this.turnAndScoreboardService.setMessage('There is already a player at that location.');
        this.turnAndScoreboardService.setUpdateTurnAndScore(true);
      }

      if(canContinue) {
        let path: MazePaths = this._playerPaths[indexFound];
        let indexPlayer: number = this.pieces.findIndex(item => item.player == this._playersTurn);
        let destination: number = this.pieces.findIndex(item => item.row == path.row && item.column == path.column);

        this.pieces = this.showPlayerPaths(this.pieces, this._playerPaths, false);

        if(!this.isNotSamePiece(this.pieces, destination, indexPlayer)) {
          this.pieces[indexPlayer].player = -1;

          let shortestRoute: number[][] = this.findShortestWay(this.pieces, this._playerPaths, this.pieces[indexPlayer].row, this.pieces[indexPlayer].column, this.pieces[destination].row, this.pieces[destination].column);

          if(shortestRoute.length > 2) {
            let subscription = this.animateRefactored(shortestRoute).subscribe({
              next: (positions) => {
                if(positions.length > 0) {
                  this.animatePositions(positions);      
                  this.clearPreviousRoutes(positions);              
                } else {
                  this.checkTreasure(indexPlayer, destination); 
                  
                  subscription.unsubscribe();                          
                }                              
              },
              complete: () => {
                console.log('COMPLETED???');
              }
            });
          } else {
            this.checkTreasure(indexPlayer, destination);
          }          
        } else {
          this.endTurn();
        }
      }
    } else {
      this.turnAndScoreboardService.setMessage('Insert piece first');
      this.turnAndScoreboardService.setUpdateTurnAndScore(true);
    }    
  }

  checkTreasure(indexPlayer: number, destination: number) : void {
    if(this.humanOrComputer[this._playersTurn]) {
      this.pieces = this.showPlayerPaths(this.pieces, this._playerPaths, false);
    }

    this.pieces = this.move(this.pieces, destination, indexPlayer, this._playersTurn);

    if (this.hasTreasure(this.pieces, destination, this._playersTurn)) {
      this.turnAndScoreboardService.updateScore(this._playersTurn);
      this.pieces[destination].hasTreasure = false;
      this.pieces[destination].treasureForPlayer = -1;
      this.pieces[destination].treasureImage = '';

      let treasureIndex: number = this.pieces[destination].treasureIndex;
      this.treasuresService.setTreasureFound(treasureIndex);
      this.pieces[destination].treasureIndex = -1;

      if (this.treasuresService.amountOfTreasuresNotFound() > 0) {
        let nextTreasure: MazeTreasures | undefined = this.treasuresService.getNextTreasure(this._playersTurn);

        if (nextTreasure != undefined) {
          this.pieces = this.mazeService.placeTreasureInMaze(this.pieces, nextTreasure, this._playersTurn);
          let allPlayersTreasures: MazeTreasures[] = this.turnAndScoreboardService.getPlayersTreasures();
          allPlayersTreasures[this._playersTurn].treasureImage = nextTreasure.treasureImage;
          this.turnAndScoreboardService.setPlayersTreasures(allPlayersTreasures);
        }

        this.pieces = this.move(this.pieces, destination, indexPlayer, this._playersTurn);
        this.endTurn();
      } else {
        this.pieces = this.move(this.pieces, destination, indexPlayer, this._playersTurn);
        this.finishGame();
      }            
    } else {
      this.pieces = this.move(this.pieces, destination, indexPlayer, this._playersTurn);
      this.endTurn();
    }
  }

  animatePositions(positions: number[]) : void {
    let playerIndex: number = this.findIndexOfPiece(this.pieces, positions[0], positions[1]);
    let destinationIndex: number = this.findIndexOfPiece(this.pieces, positions[2], positions[3]);

    if(playerIndex > - 1 && destinationIndex > -1) {
      this.pieces = this.move(this.pieces, destinationIndex,  playerIndex, this._playersTurn);
    }
  }

  animateRefactored(shortestRoutes: number[][]) : Observable<number[]> {
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

  clearPreviousRoutes(shortestRoute: number[]) : void {
    for(let i = 0; i < shortestRoute.length; i++) {      
      let indexFound: number = this.pieces.findIndex(item => item.row == shortestRoute[0] && item.column == shortestRoute[1]);

      if(indexFound > -1) {
        this.pieces[indexFound].player = -1;
      }
    }
  }

  isPieceAffectedByInsert(row: number, column: number) : string {
    if(!this._lastInsertedAxisY) {
      if(this._lastInsertedRowOrColumn == row) {
        return "inserted";
      }
    } else {
      if(this._lastInsertedRowOrColumn == column) {
        return "inserted";
      }
    }

    return "not-inserted";
  }

  getTreasureImage(player: number) : string {
    if(this.turnAndScoreboardService.getPlayersTreasures().length > 0) {
      return this.turnAndScoreboardService.getPlayersTreasures()[player].treasureImage;
    }

    return "";
  }

  tileHasTreasure(row: number, column: number) : boolean {
    if(this.pieces.length > 0) {
      let indexOfPiece: number = this.pieces.findIndex(item => item.row == row && item.column == column);

      if(indexOfPiece > -1) {
        return this.pieces[indexOfPiece].hasTreasure;
      }
    }

    return false;
  }

  getTreasureImageOfTile(row: number, column: number) : string {
    if(this.pieces.length > 0) {
      let indexOfPiece: number = this.pieces.findIndex(item => item.row == row && item.column == column);

      if(indexOfPiece > -1) {
        return this.pieces[indexOfPiece].treasureImage ?? '';
      }
    }

    return "";
  }

  treasureAtPiece() : boolean {
    if(this.currentPiece != undefined) {
      return this.currentPiece.hasTreasure;
    }

    return false;
  }

  getTreasureImageOfPiece() : string {    
    if(this.currentPiece != undefined) {
      return this.currentPiece.treasureImage ?? '';
    }

    return "";
  }
  
  showHint() : void {
    if(this.currentPiece != undefined) {
      let hint: ComputerInsert = this.computerInsertCalculation(this.pieces, this.currentPiece, this._playersTurn, this.fixedRowAndColumnIndexes);

      this.currentPiece.orientation = hint.orientation;
    
      if(!hint.insertAxisY) {
        this._hint[0] = (hint.isTopOrLeft) ? 0 : 3;
      } else {
        this._hint[0] = (hint.isTopOrLeft) ? 1 : 2;
      }

      this._hint[1] = hint.rowOrColumnIndex;      
    }
  }

  hasHint(side: number, rowOrColumnIndex: number) : boolean {
    if(this._hint[0] === side && this._hint[1] === rowOrColumnIndex) {
      return true;
    }   

    return false;
  }

  private endTurn() : void {
    this.turnAndScoreboardService.setMessage('');
    this._hint = [-1, -1];
    this._playerPaths = [];
    this.clearPaths();
    this.nextTurn();
    this.insertPiece = false;
    this.turnAndScoreboardService.setUpdateTurnAndScore(true);
  }

  private setupNewGame() {
    this.isGameEnded = false;

    let amountOfPlayers: number = this.gameSettingsService.getAmountOfPlayers();
    let amountOfTreasures: number = this.gameSettingsService.getAmountOfTreasures();
    let difficulty = this.gameSettingsService.getDifficulty();

    let useRandomStartLocations: boolean = this.gameSettingsService.getRandomStartLocations();
    this.mazeService.generate(difficulty);
    this.mazeService.addPlayers(amountOfPlayers, useRandomStartLocations);
    
    this.currentPiece = this.mazeService.generateStartPiece();  

    this.treasuresService.generateTreasures(amountOfTreasures, amountOfPlayers);
    let treasures: MazeTreasures[] = this.treasuresService.getMazeTreasures();
    
    this.turnAndScoreboardService.setPlayers(amountOfPlayers);
    this._amountOfPlayers = amountOfPlayers;
    this.turnAndScoreboardService.setScore(amountOfPlayers);
    this.humanOrComputer = this.gameSettingsService.getHumanOrCpu();
    
    this.pieces = this.mazeService.getAllPieces();

    for(let i = 0; i < this._amountOfPlayers; i++) {      
      this.pieces = this.mazeService.placeTreasureInMaze(this.pieces, treasures[i], i);
    }

    this.turnAndScoreboardService.setPlayersTreasures( this.treasuresService.getPlayersTreasures() );

    this.turnAndScoreboardService.setFirstInitialization(true);
    this.currentTurnForHumanOrComputer();
  }

  private finishGame() : void {
    this.insertPiece = true;
    this._playerPaths = [];
    this.isGameEnded = true;
    this.turnAndScoreboardService.setIsGameEnded(true);
    this.turnAndScoreboardService.setUpdateTurnAndScore(true);
  }

  private resetDefaults() : void {
    this.humanOrComputer = [];
    this.pieces = [];  
    this.currentPiece = undefined;

    this._playersTurn = 0;
    this.insertPiece = false;
    this._playerPaths = [];
  
    this._hint = [-1, -1];

    this.isGameEnded = false;

    this.logMessages = [];

    this._lastInsertedAxisY = false;
    this._lastInsertedRowOrColumn = -1;    

    this._amountOfPlayers = 0;

    this.clearPaths();
    this.mazeService.clearAllPieces();
    this.treasuresService.clearMazeTreasures();
    this.turnAndScoreboardService.reset();
  }

  backToMenu() : void {
    this.resetDefaults();
    
    this.gameSettingsService.resetDefaults();
    this.gameSettingsService.setStartGame(false);
  }

}