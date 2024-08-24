import { Injectable } from '@angular/core';
import { GameSettings } from '../models/game-settings.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameSettingsService {

  private _gameSettingsDefault: GameSettings = {
    gameStarted: false,
    amountOfPlayers: 1,
    amountOfTreasures: 3,
    maxAmountOfTreasures: 51,
    humanOrCpu: [true],
    randomStartPositions: false,
    difficulty: 1
  };

  gameSettings$: BehaviorSubject<GameSettings> = new BehaviorSubject<GameSettings>({...this._gameSettingsDefault});

  setGameSettings(gameSettings: GameSettings): void {
    this.gameSettings$.next(gameSettings);
  }

  resetDefaults(): void {
    this.gameSettings$.next({...this._gameSettingsDefault});
  }

}