import { Injectable } from '@angular/core';
import { PieceImages } from '../methods/PieceImages';
import { BehaviorSubject } from 'rxjs';
import { MazePiece } from '../models/maze-piece.interface';
import { RandomNumbers } from '../methods/RandomNumbers';

@Injectable({
  providedIn: 'root'
})
export class InsertPieceService {

  private _pieceImages: PieceImages = new PieceImages();
  private _randomNumbers: RandomNumbers = new RandomNumbers();
  
  private _defaultMazePiece: MazePiece = {
    row: -1,
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

  currentPiece$: BehaviorSubject<MazePiece> = new BehaviorSubject<MazePiece>({...this._defaultMazePiece});
  isPieceInserted$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  generateStartPiece(): void {
    let randomImageIndex: number = this._randomNumbers.generateRandomNumber(0, 4);
    let randomOrientation: number = this._randomNumbers.generateRandomNumber(0, 4);

    const piece: MazePiece = {
      row: -1,
      column: -1,
      pieceImage: this._pieceImages.getPiecesRed()[randomImageIndex],
      pieceNumber: randomImageIndex,
      orientation: randomOrientation,
      isFixed: false,
      player: -1,
      hasTreasure: false,
      treasureForPlayer: -1,
      treasureImage: ''
    };

    this.currentPiece$.next(piece);
  }  

  updatePiece(piece: MazePiece): void {
    this.currentPiece$.next(piece);
  }

  resetDefaults(): void {
    this.currentPiece$.next({...this._defaultMazePiece});
    this.isPieceInserted$.next(false);
  }

  setPieceInserted(value: boolean): void {
    this.isPieceInserted$.next(value);
  }

}