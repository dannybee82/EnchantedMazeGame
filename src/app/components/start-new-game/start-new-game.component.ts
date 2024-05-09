import { Component, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { GameSettingsService } from '../../services/game-settings.service';
import { GameSettings } from '../../models/game-settings.interface';

@Component({
  selector: 'app-start-new-game',
  standalone: true,
  imports: [],
  templateUrl: './start-new-game.component.html',
  styleUrl: './start-new-game.component.scss'
})
export class StartNewGameComponent implements OnInit {

  showComponent: WritableSignal<boolean> = signal(false);

  gameSettings: GameSettings = {
    gameStarted: false,
    amountOfPlayers: 1,
    amountOfTreasures: 3,
    maxAmountOfTreasures: 51,
    humanOrCpu: [true],
    randomStartPositions: false,
    difficulty: 1
  };

  private gameSettingsService = inject(GameSettingsService);

  ngOnInit(): void {
    this.gameSettings = this.gameSettingsService.gameSettings$.getValue();
    this.showComponent.set(true);
  }

  changePlayerAmount(addPlayer: boolean): void {
    if(addPlayer) {
      this.gameSettings.amountOfPlayers = (this.gameSettings.amountOfPlayers + 1 > 4) ? 4 : this.gameSettings.amountOfPlayers += 1;
    } else {
      this.gameSettings.amountOfPlayers = (this.gameSettings.amountOfPlayers - 1 < 1) ? 1 : this.gameSettings.amountOfPlayers -= 1;
    }

    if(this.gameSettings.amountOfPlayers >= (this.gameSettings.amountOfTreasures / 2)) {
      this.gameSettings.amountOfTreasures = this.gameSettings.amountOfPlayers * 2;
    }

    this.setPlayers();
  }

  changeTreasureAmount(addTreasure: boolean): void {
    if(addTreasure) {
      this.gameSettings.amountOfTreasures = (this.gameSettings.amountOfTreasures + 1) > (this.gameSettings.maxAmountOfTreasures) ? this.gameSettings.maxAmountOfTreasures : this.gameSettings.amountOfTreasures += 1;
    } else {
      this.gameSettings.amountOfTreasures = (this.gameSettings.amountOfTreasures - 1 < 1) ? 1 : this.gameSettings.amountOfTreasures -= 1;
    }
  }

  setDifficulty(value: number) : void {
    this.gameSettings.difficulty = value;
  }

  changePlayer(index: number, isHuman: boolean): void {
    let humarOrCpu: boolean[] = this.gameSettings.humanOrCpu;
    humarOrCpu[index] = isHuman;
    this.gameSettings.humanOrCpu = humarOrCpu;
  }

  changeStartPositions(): void {
    this.gameSettings.randomStartPositions = !this.gameSettings.randomStartPositions;
  }

  startNewGame(): void {
    this.gameSettings.gameStarted = true;
    this.gameSettingsService.setGameSettings(this.gameSettings);
  }

  private setPlayers(): void {
    let humarOrCpu: boolean[] = this.gameSettings.humanOrCpu;

    if(this.gameSettings.amountOfPlayers > humarOrCpu.length) {
      humarOrCpu = [...humarOrCpu, false];
    } else {      
      humarOrCpu = humarOrCpu.slice(0, humarOrCpu.length - 1);
    }

    this.gameSettings.humanOrCpu = humarOrCpu;
  }

}
