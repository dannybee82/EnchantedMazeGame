import { Component } from '@angular/core';

import { GameSettingsService } from './services/game-settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {  

  public isGameStarted: boolean = false;

  constructor(private gameSettingsService: GameSettingsService) {
    //Listen for changes
    this.gameSettingsService.getStartGame().subscribe({
      next: (result) => {
        this.isGameStarted = result;
      }
    });
  }

}