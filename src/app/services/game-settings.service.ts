import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

//Methods.
import { PieceImages } from '../methods/PieceImages';
import { Misc } from '../methods/Misc';

@Injectable({
  providedIn: 'root'
})
export class GameSettingsService extends Misc {

  /**
   * Variables.
   * 
   */

  private _amountOfPlayers: number = -1;
  private _amountOfTreasures: number = -1;
  private _humanOrCpu: boolean[] = [];
  private _difficulty: number = 1;
  private _randomStartLocations: boolean = false;

  /**
   * Subjects.
   * 
   */

  private _startGame: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

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
    super();
  }

  /**
   * Getters and setters.
   * 
   */

  setAmountOfPlayers(value: number) : void {
    value = (value < this.minimumAmountOfPlayers) ? this.minimumAmountOfPlayers : value;
    value = (value > this.maximumAmountOfPlayers) ? this.maximumAmountOfPlayers : value;

    this._amountOfPlayers = value;
  }
  
  getAmountOfPlayers() : number {
    return this._amountOfPlayers;
  }
  
  setAmountOfTreasures(value: number) : void {
    value = (value < this.minimumAmountOfTreasures) ? this.minimumAmountOfPlayers : value;
    value = (value > this.getMaximumAmountOfTreasures()) ? this.getMaximumAmountOfTreasures() : value;

    this._amountOfTreasures = value;
  }
  
  getAmountOfTreasures() : number {
    return this._amountOfTreasures;
  }

  getMaximumAmountOfTreasures() : number {
    return this._pieceImages.getTreasureImages().length;
  }
  
  setHumanOrCpu(value: boolean[]) : void {
    this._humanOrCpu = value;
  }
  
  getHumanOrCpu() : boolean[] {
    return this._humanOrCpu;
  }

  setDifficulty(value: number) : void {
    value = (value < this.minimumDifficulty) ? this.minimumDifficulty : value;
    value = (value > this.maximumDifficulty) ? this.maximumDifficulty : value;

    this._difficulty = value;
  }
  
  getDifficulty() : number {
    return this._difficulty;
  }

  setRandomStartLocations(value: boolean) : void {
    this._randomStartLocations = value;
  }
  
  getRandomStartLocations() : boolean {
    return this._randomStartLocations;
  }
  
  /**
   * Other methods.
   * 
   */

  resetDefaults() : void {
    this._amountOfPlayers = -1;
    this._amountOfTreasures = -1;
    this._difficulty = 1;
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