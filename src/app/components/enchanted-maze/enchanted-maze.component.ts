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

//Methods.
import { ComputerPlayer } from 'src/app/methods/ComputerPlayer';

//Animations.
import { PieceInserted } from 'src/app/methods/Animations';

@Component({
  selector: 'app-enchanted-maze',
  templateUrl: './enchanted-maze.component.html',
  styleUrls: ['./enchanted-maze.component.css'],
  animations: [PieceInserted]
})

export class EnchantedMazeComponent extends ComputerPlayer {

  public rows: number[] = [];
  public columns: number[] = [];  
  public players: number[] = [];
  public humanOrComputer: boolean[] = [];
  public score: number[] = [];
  public pieces: MazePiece[] = [];  
  public currentPiece?: MazePiece;

  public totalTurns: number = 1;

  public message: string = "";

  private _playersTurn: number = 0;
  public insertPiece: boolean = false;
  
  private _playerPaths: MazePaths[] = [];

  private _hint: number [] = [-1, -1];

  public playersTreasures: MazeTreasures[] = [];

  public isGameEnded: boolean = false;

  public logMessages: string[] = [];  

  private _lastInsertedAxisY: boolean = false;
  private _lastInsertedRowOrColumn: number = -1;

  constructor(private gameSettingsService: GameSettingsService, private mazeService: MazeService, private treasuresService: TreasuresService) {
    super();

    //Listen for changes.
    this.gameSettingsService.getStartGame().subscribe({
      next: (result) => {
        if(result) {
          this.setupNewGame();
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
    this.message = '';

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
    if(this._playersTurn + 1 == this.players.length) {
      this._playersTurn = 0;
      this.totalTurns++;
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
      let cpuInsert: ComputerInsert = this.computerInsertCalculation(this.pieces, this.currentPiece, this._playersTurn);

      if(this.currentPiece.orientation != cpuInsert.orientation) {
        this.currentPiece.orientation = cpuInsert.orientation;
        this.addLoggingMessage("CPU rotated piece to: " + this.orientationNames[cpuInsert.orientation] );
      } else {
        this.addLoggingMessage("CPU doesn't rotate piece.");
      }

      if(cpuInsert.isColumns) {
        this.addLoggingMessage("CPU inserts in column. At index:" + cpuInsert.rowOrColumnIndex);
      } else {
        this.addLoggingMessage("CPU inserts in row. At index:" + cpuInsert.rowOrColumnIndex);
      }

      if(cpuInsert.isColumns) {
        (cpuInsert.isTopOrLeft) ? this.addLoggingMessage("Column Left") : this.addLoggingMessage("Columnn Right");
      } else {
        (cpuInsert.isTopOrLeft) ? this.addLoggingMessage("Row Top") : this.addLoggingMessage("Row Bottom");
      }

      if(cpuInsert.isColumns) {
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
        this.message = "Can't move to that place.";
      }

      if(canContinue && !this.canMove(this.pieces, this._playerPaths, indexFound, this._playersTurn)) {
        canContinue = false;
        this.message = "There is already a player at that location.";
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
            this.animate(shortestRoute).then((result) => {     
              if(result === true) {
                this.checkTreasure(indexPlayer, destination);
              }                      
            })
          } else {
            this.checkTreasure(indexPlayer, destination);
          }          
        } else {
          this.endTurn();
        }
      }
    } else {
      this.message = "Insert piece first";
    }    
  }

  checkTreasure(indexPlayer: number, destination: number) : void {
    this.pieces = this.move(this.pieces, this._playerPaths, destination, indexPlayer, this._playersTurn);

    if (this.hasTreasure(this.pieces, destination, this._playersTurn)) {
      this.score[this._playersTurn]++;
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
          this.playersTreasures[this._playersTurn].treasureImage = nextTreasure.treasureImage;
        }

        this.pieces = this.move(this.pieces, this._playerPaths, destination, indexPlayer, this._playersTurn);
        this.endTurn();
      } else {
        this.pieces = this.move(this.pieces, this._playerPaths, destination, indexPlayer, this._playersTurn);
        this.finishGame();
      }            
    } else {
      this.pieces = this.move(this.pieces, this._playerPaths, destination, indexPlayer, this._playersTurn);
      this.endTurn();
    }
  }

  animate(shortestRoute: number[][]) : Promise<boolean> {
    return new Promise<boolean>((resolve) => {      
      //Animate.
      let index: number = 1;

      const interval = setInterval(() => {
        this.pieces = this.moveToDestinations(this.pieces, shortestRoute[index - 1], shortestRoute[index], this._playersTurn);
        index++;

        if (index == shortestRoute.length) {
          this.clearPreviousRoutes(shortestRoute);
          clearInterval(interval);
          resolve(true); 
        }
      }, 500);           
    });  
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

  clearPreviousRoutes(shortestRoute: number[][]) : void {
    for(let i = 0; i < shortestRoute.length; i++) {      
      let indexFound: number = this.pieces.findIndex(item => item.row == shortestRoute[i][0] && item.column == shortestRoute[i][1]);

      if(indexFound > -1) {
        this.pieces[indexFound].player = -1;
      }
    }
  }

  getTreasureImage(player: number) : string {
    if(this.playersTreasures.length > 0) {
      return this.playersTreasures[player].treasureImage;
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

  getHighestScore() : number {
    return Math.max(...this.score);
  }

  getWinningPlayers() : number[] {
    let winning: number[] = [];

    let highestScore: number = this.getHighestScore();

    for(let i = 0; i < this.score.length; i++) {
      if(this.score[i] == highestScore) {
        winning.push(i);
      }
    }    

    return winning;
  }

  showHint() : void {
    if(this.currentPiece != undefined) {
      let hint: ComputerInsert = this.computerInsertCalculation(this.pieces, this.currentPiece, this._playersTurn);

      this.currentPiece.orientation = hint.orientation;
    
      if(!hint.isColumns) {
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
    this.message = "";
    this._hint = [-1, -1];
    this._playerPaths = [];
    this.clearPaths();
    this.nextTurn();
    this.insertPiece = false;
  }

  private setupNewGame() {
    this.isGameEnded = false;

    let amountOfPlayers: number = this.gameSettingsService.getAmountOfPlayers();
    let amountOfTreasures: number = this.gameSettingsService.getAmountOfTreasures();
    let difficulty = this.gameSettingsService.getDifficulty();

    this.mazeService.generate(difficulty);
    this.mazeService.addPlayers(amountOfPlayers);
    
    this.currentPiece = this.mazeService.generateStartPiece();  

    this.treasuresService.generateTreasures(amountOfTreasures, amountOfPlayers);
    let treasures: MazeTreasures[] = this.treasuresService.getMazeTreasures();
    
    this.players = this.commonArrayFunctions.fillNumberArray(amountOfPlayers, 0, true);
    this.score = this.commonArrayFunctions.fillNumberArray(amountOfPlayers, 0, false);
    this.rows = this.gameSettingsService.getRows();
    this.columns = this.gameSettingsService.getColumns();
    this.humanOrComputer = this.gameSettingsService.getHumanOrCpu();
    
    this.pieces = this.mazeService.getAllPieces();

    for(let i = 0; i < this.players.length; i++) {
      this.pieces = this.mazeService.placeTreasureInMaze(this.pieces, treasures[i], i);
    }

    this.playersTreasures = this.treasuresService.getPlayersTreasures();    

    this.currentTurnForHumanOrComputer();
  }

  private finishGame() : void {
    this.insertPiece = true;
    this._playerPaths = [];
    this.isGameEnded = true;
  }

  private resetDefaults() : void {
    this.rows = [];
    this.columns = [];  
    this.players= [];
    this.humanOrComputer = [];
    this.score = [];
    this.pieces = [];  
    this.currentPiece = undefined;
    this.totalTurns = 1;
  
    this.message = "";
    this._playersTurn = 0;
    this.insertPiece = false;
    this._playerPaths = [];
  
    this._hint = [-1, -1];
    this.playersTreasures = [];
    this.logMessages = [];

    this._lastInsertedAxisY = false;
    this._lastInsertedRowOrColumn = -1;    

    this.clearPaths();
    this.mazeService.clearAllPieces();
    this.treasuresService.clearMazeTreasures();
  }

  backToMenu() : void {
    this.resetDefaults();
    
    this.gameSettingsService.resetDefaults();
    this.gameSettingsService.setStartGame(false);
  }

}