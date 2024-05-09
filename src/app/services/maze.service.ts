import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, max } from 'rxjs';
import { MazePiece } from '../models/maze-piece.interface';
import { FixedPieces } from '../methods/FixedPieces';
import { PiecesPool } from '../methods/PiecesPool';
import { RandomNumbers } from '../methods/RandomNumbers';
import { GameSettings } from '../models/game-settings.interface';
import { Treasure } from '../models/treasure.interface';

@Injectable({
  providedIn: 'root'
})
export class MazeService {

  private _dimensionX: number = 9;
  private _dimensionY: number = 9;

  private _fixedPieces: FixedPieces = new FixedPieces();
  private _piecesPool: PiecesPool = new PiecesPool();
  private _randomNumbers: RandomNumbers = new RandomNumbers();

  maze$: BehaviorSubject<MazePiece[]> = new BehaviorSubject<MazePiece[]>([]);
  
  generateMaze(gameSettings: GameSettings): void {
    let mazePieces: MazePiece[] = this.createMaze([], gameSettings);
    mazePieces = this.addPlayers(mazePieces, gameSettings);
    this.maze$.next(mazePieces);
  }

  placeSingleTreasure(treasures: Treasure, targetPlayer: number): void {
    let mazePieces: MazePiece[] = this.maze$.getValue();

    let randomPieceIndex: number = this._randomNumbers.generateRandomNumber(0, mazePieces.length);

    while(mazePieces[randomPieceIndex].player > -1 || mazePieces[randomPieceIndex].hasTreasure) {
      randomPieceIndex = this._randomNumbers.generateRandomNumber(0, mazePieces.length);
    }

    mazePieces[randomPieceIndex].hasTreasure = true;
    mazePieces[randomPieceIndex].treasureForPlayer = targetPlayer;
    mazePieces[randomPieceIndex].treasureImage = treasures.treasureImage;

    this.maze$.next(mazePieces);  
  }

  resetDefaults(): void {
    this.maze$.next([]);
  }

  updateMaze(pieces: MazePiece[]): void {
    this.maze$.next(pieces);
  }

  getDefaultPiece(): MazePiece {
    const defaultPiece: MazePiece = {row: -1,
      column: -1,
      pieceImage: '',
      pieceNumber: -1,
      orientation: -1,
      isFixed: false,
      player: -1,
      hasTreasure: false,
      treasureForPlayer: -1,
      treasureImage: ''
    };
    return defaultPiece;
  }

  private createMaze(mazePieces: MazePiece[], gameSettings: GameSettings): MazePiece[] {
    this._piecesPool.fillPool(gameSettings.difficulty);
    let poolIndex: number = 0;

    for(let i = 0; i < this._dimensionY; i++) {
      for(let j = 0; j < this._dimensionX; j++) {
          let fixedPiece: MazePiece | undefined = this._fixedPieces.getFixedPiece(i, j, gameSettings.difficulty);

          if(fixedPiece !== undefined) {
            mazePieces.push(fixedPiece);
          } else {
            let piece: MazePiece = this._piecesPool.getPiece(poolIndex);
            piece.row = i;
            piece.column = j;
            mazePieces.push(piece);
            poolIndex++;
          }
      }
    }

    return mazePieces;
  }
 
  private addPlayers(mazePieces: MazePiece[], gameSettings: GameSettings): MazePiece[] {
    const startPoints: number[] = gameSettings.randomStartPositions ? 
      this._randomNumbers.generateUniqueRandomNumbers(gameSettings.amountOfPlayers, mazePieces.length) : 
      [0, 8, 72, 80];

    for(let i = 0; i < gameSettings.amountOfPlayers; i++) {
      let position: number = startPoints[i];
      mazePieces[position].player = i;
    }

    return mazePieces;
  }

}