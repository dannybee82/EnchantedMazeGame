import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

//Common methods.
import { CommonArrayFunctions } from '../shared_methods/CommonArrayFunctions';
import { Misc } from '../methods/Misc';

//Models
import { MazeTreasures } from '../models/MazeTreasures';

@Injectable({
  providedIn: 'root'
})
export class TurnAndScoreboardService extends Misc {

  /**
   * Variables.
   * 
   */

  private _totalTurns: number = 0;
  private _players: number[] = [];

  private _currentPlayerTurn: number = 0;

  private _playersTreasures: MazeTreasures[] = [];

  private _isGameEnded: boolean = false;

  private _message: string = "";

  private _scores: number[] = [];

  private _commonArrayFunctions: CommonArrayFunctions = new CommonArrayFunctions();

  private _firstInitialization: ReplaySubject<boolean>; 
  private _updateTurnAndScore: ReplaySubject<boolean>;

  /**
   * Constructor.
   * 
   */

  constructor() {
    super();

    this._firstInitialization = new ReplaySubject<boolean>(0); 
    this._updateTurnAndScore = new ReplaySubject<boolean>(0);
  }

  /**
   * Getters and setters.
   * 
   */

  setTotalTurns(value: number) : void {
    this._totalTurns = value;
  }
  
  getTotalTurns() : number {
    return this._totalTurns;
  }
  
  setPlayers(amount: number) : void {
    amount = (amount < this.minimumAmountOfPlayers) ? this.minimumAmountOfPlayers : amount;
    amount = (amount > this.maximumAmountOfPlayers) ? this.maximumAmountOfPlayers : amount;
    this._players = this._commonArrayFunctions.fillNumberArray(amount, 0, true);
  }
  
  getPlayers() : number[] {
    return this._players;
  }

  setScore(amount: number) : void {
    amount = (amount < this.minimumAmountOfPlayers) ? this.minimumAmountOfPlayers : amount;
    amount = (amount > this.maximumAmountOfPlayers) ? this.maximumAmountOfPlayers : amount;
    this._scores = this._commonArrayFunctions.fillNumberArray(amount, 0, false);
  }

  updateScore(player: number) : void {
    this._scores[player]++;
  }

  getScore() : number[] {
    return this._scores;
  }
  
  setCurrentPlayerTurn(value: number) : void {
    this._currentPlayerTurn = value;
  }
  
  getCurrentPlayerTurn() : number {
    return this._currentPlayerTurn;
  }
  
  setPlayersTreasures(value: MazeTreasures[]) : void {
    this._playersTreasures = value;
  }
  
  getPlayersTreasures() : MazeTreasures[] {
    return this._playersTreasures;
  }
  
  setIsGameEnded(value: boolean) : void {
    this._isGameEnded = value;
  }
  
  getIsGameEnded() : boolean {
    return this._isGameEnded;
  }
  
  setMessage(value: string) : void {
    this._message = value;
  }
  
  getMessage() : string {
    return this._message;
  } 

  /**
   * Reset values.
   * 
   */

  reset() : void {
    this._totalTurns = 0;
    this._players = [];
    this._currentPlayerTurn = 0;
    this._playersTreasures = [];
    this._isGameEnded = false;
    this._message = "";
    this._scores = [];
  }

  /**
   * Replay Subject(s)
   * 
   */

  setFirstInitialization(value: boolean) : void {
    this._firstInitialization.next(value)
  }
  
  getFirstInitialization() : ReplaySubject<boolean> {
    return this._firstInitialization;
  }

  setUpdateTurnAndScore(value: boolean) : void {
    this._updateTurnAndScore.next(value)
  }
  
  getUpdateTurnAndScore() : ReplaySubject<boolean> {
    return this._updateTurnAndScore;
  }

}