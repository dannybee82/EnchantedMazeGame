import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

//Methods.
import { PieceImages } from '../methods/PieceImages';

@Injectable({
  providedIn: 'root'
})
export class GameSettingsService {

  /**
   * Variables.
   * 
   */

  private _amountOfPlayers: number = -1;
  private _amountOfTreasures: number = -1;
  private _humanOrCpu: boolean[] = [];
  private _difficulty: number = 1;

  private _rows: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  private _columns: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  /**
   * Subjects.
   * 
   */

  private _startGame: BehaviorSubject<boolean>;

  /**
   * Classes.
   * 
   */

  private _pieceImages: PieceImages = new PieceImages();

  /**
   * Constructor.
   * 
   */

  constructor() {
    this._startGame = new BehaviorSubject<boolean>(false);
  }

  /**
   * Getters and setters.
   * 
   */

  setAmountOfPlayers(value: number) : void {
    this._amountOfPlayers = value;
  }
  
  getAmountOfPlayers() : number {
    return this._amountOfPlayers;
  }
  
  setAmountOfTreasures(value: number) : void {
    this._amountOfTreasures = value;
  }
  
  getAmountOfTreasures() : number {
    return this._amountOfTreasures;
  }

  getMaximumAmountOfTreasures() : number {
    return this._pieceImages.getTreasureImages().length;
  }
  
  getRows() : number[] {
    return this._rows;
  }
  
  getColumns() : number[] {
    return this._columns;
  }

  setHumanOrCpu(value: boolean[]) : void {
    this._humanOrCpu = value;
  }
  
  getHumanOrCpu() : boolean[] {
    return this._humanOrCpu;
  }

  setDifficulty(value: number) : void {
    this._difficulty = value;
  }
  
  getDifficulty() : number {
    return this._difficulty;
  }

  /**
   * Other methods.
   * 
   */

  resetDefaults() : void {
    this._amountOfPlayers = -1;
    this._amountOfTreasures = -1;
    this._humanOrCpu = [];
  }

  /**
   * Subjects.
   * 
   */

  setStartGame(value: boolean) : void {
    this._startGame.next(value)
  }
  
  getStartGame() : BehaviorSubject<boolean> {
    return this._startGame;
  }

}