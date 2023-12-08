import { Injectable } from '@angular/core';

//Model
import { MazePiece } from '../models/MazePiece';
import { MazeTreasures } from '../models/MazeTreasures';

//Methods.
import { FixedPieces } from '../methods/FixedPieces';
import { PiecesPool } from "../methods/PiecesPool";
import { PieceImages } from "../methods/PieceImages";
import { RandomNumbers } from '../shared_methods/RandomNumbers';

@Injectable({
  providedIn: 'root'
})
export class MazeService {

  private _dimensionX: number = 9;
  private _dimensionY: number = 9;

  private _mazePieces: MazePiece[] = [];

  private _fixedPieces: FixedPieces = new FixedPieces();
  private _piecesPool: PiecesPool = new PiecesPool();
  private _pieceImages: PieceImages = new PieceImages();
  private _randomNumbers: RandomNumbers = new RandomNumbers();

  constructor() { }

  generate(difficulty: number) : void {
    this._piecesPool.fillPool(difficulty);
    let poolIndex: number = 0;

    for(let i = 0; i < this._dimensionY; i++) {
        for(let j = 0; j < this._dimensionX; j++) {
            let fixedPiece: MazePiece | undefined = this._fixedPieces.getFixedPiece(i, j, difficulty);

            if(fixedPiece !== undefined) {
              this._mazePieces.push(fixedPiece);
            } else {
              let piece: MazePiece = this._piecesPool.getPiece(poolIndex);
              piece.row = i;
              piece.column = j;
              this._mazePieces.push(piece);
              poolIndex++;
            }
        }
    }
  }

  addPlayers(amountOfPlayers: number, isRandomStartLocations: boolean) : void {
    if(isRandomStartLocations) {
      for (let i = 0; i < amountOfPlayers; i++) {
        let randomStartPosition: number = this._randomNumbers.generateRandomNumber(0, this._mazePieces.length);

        while(this._mazePieces[randomStartPosition].player > -1) {
          randomStartPosition = this._randomNumbers.generateRandomNumber(0, this._mazePieces.length);
        }

        this._mazePieces[randomStartPosition].player = i;
      }
    } else {
      let startPoints: number[] = [0, 8, 72, 80];

      for (let i = 0; i < amountOfPlayers; i++) {
        let point: number = startPoints[i];
        this._mazePieces[point].player = i;
      }
    }
  }

  getAllPieces() : MazePiece[] {
    return structuredClone(this._mazePieces);
  }

  clearAllPieces() : void {
    this._mazePieces = [];
  }

  generateStartPiece() : MazePiece {
    let randomImageIndex: number = this._randomNumbers.generateRandomNumber(0, 4);
    let randomOrientation: number = this._randomNumbers.generateRandomNumber(0, 4);
    return new MazePiece(-1, -1, this._pieceImages.getPiecesRed()[randomImageIndex], randomImageIndex, randomOrientation, false, -1, false, -1, -1);    
  }

  placeTreasureInMaze(pieces: MazePiece[], mazeTreasure: MazeTreasures, targetPlayer: number) : MazePiece[] {
    let randomPieceIndex: number = this._randomNumbers.generateRandomNumber(0, pieces.length);

    while (pieces[randomPieceIndex].player > -1 || pieces[randomPieceIndex].hasTreasure) {
        randomPieceIndex = this._randomNumbers.generateRandomNumber(0, pieces.length);
    }

    pieces[randomPieceIndex].hasTreasure = true;
    pieces[randomPieceIndex].treasureForPlayer = targetPlayer;
    pieces[randomPieceIndex].treasureImage = mazeTreasure.treasureImage;
    pieces[randomPieceIndex].treasureIndex = mazeTreasure.index;

    return pieces;
  }
  
}