import { Component } from '@angular/core';

import { GameSettingsService } from 'src/app/services/game-settings.service';

@Component({
  selector: 'app-start-new-game',
  templateUrl: './start-new-game.component.html',
  styleUrls: ['./start-new-game.component.css']
})
export class StartNewGameComponent {

  public amountOfPlayers: number = 1;

  public amountOfTreasures: number = 3;

  public maxAmountOfTreasures: number = -1;

  public humanOrCpu: boolean[] = [];

  public difficulty: number = 1;

  public randomStartPositions: boolean = false;

  constructor(private gameSettingsService: GameSettingsService) {}

  ngOnInit() {
    this.maxAmountOfTreasures = this.gameSettingsService.getMaximumAmountOfTreasures();
    this.setPlayersArray();
  }

  changePlayerAmount(isPlus: boolean) : void {
    if(isPlus) {
      this.amountOfPlayers = (this.amountOfPlayers + 1 > 4) ? 4 : this.amountOfPlayers += 1;
    } else {
      this.amountOfPlayers = (this.amountOfPlayers - 1 < 1) ? 1 : this.amountOfPlayers -= 1;
    }

    if(this.amountOfPlayers >= (this.amountOfTreasures / 2)) {
      this.amountOfTreasures = this.amountOfPlayers * 2;
    }

    this.setPlayersArray();
  }

  chageTreasureAmount(isPlus: boolean) : void {
    if(isPlus) {
      this.amountOfTreasures = (this.amountOfTreasures + 1 > this.maxAmountOfTreasures) ? this.maxAmountOfTreasures : this.amountOfTreasures += 1;
    } else {
      this.amountOfTreasures = (this.amountOfTreasures - 1 < 1) ? 1 : this.amountOfTreasures -= 1;
    }
  }  

  changePlayer(index: number, isHuman: boolean) : void {
    this.humanOrCpu[index] = isHuman;
  }

  setDifficulty(value: number) : void {
    this.difficulty = value;
  }

  changeStartPositions() : void {
    this.randomStartPositions = !this.randomStartPositions;
  }

  startNewGame() : void {
    this.gameSettingsService.setAmountOfPlayers(this.amountOfPlayers);
    this.gameSettingsService.setAmountOfTreasures(this.amountOfTreasures);
    this.gameSettingsService.setHumanOrCpu(this.humanOrCpu);
    this.gameSettingsService.setDifficulty(this.difficulty);
    this.gameSettingsService.setRandomStartLocations(this.randomStartPositions);
    
    this.gameSettingsService.setStartGame(true);
  }
  
  private setPlayersArray() : void {
    this.humanOrCpu = new Array(this.amountOfPlayers);
    this.humanOrCpu[0] = true;

    if(this.humanOrCpu.length > 1) {
      for(let i = 1; i < this.humanOrCpu.length; i++) {
        this.humanOrCpu[i] = false;
      }
    }
  }

}