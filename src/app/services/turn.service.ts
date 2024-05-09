import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Turn } from '../models/turn.interface';

@Injectable({
  providedIn: 'root'
})
export class TurnService {

  private _defaultTurn: Turn = {
    totalTurns: 0,
    currentPlayerTurn: 0,
    humanOrComputer: [true]
  };

  turns$: BehaviorSubject<Turn> = new BehaviorSubject<Turn>({...this._defaultTurn});

  updateTurns(turn: Turn): void {
    this.turns$.next(turn);
  }

  resetDefaults(): void {
    this.turns$.next({...this._defaultTurn});
  }

  nextTurn(amountOfPlayers: number): void {
    const turn: Turn = this.turns$.getValue();
    turn.currentPlayerTurn = turn.currentPlayerTurn + 1 === amountOfPlayers ? 0 : turn.currentPlayerTurn += 1;
    turn.totalTurns = turn.currentPlayerTurn + 1 === amountOfPlayers ? turn.totalTurns += 1: turn.totalTurns;
    this.updateTurns(turn);
  }

}