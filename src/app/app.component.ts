import { Component, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { GameSettingsService } from './services/game-settings.service';
import { StartNewGameComponent } from './components/start-new-game/start-new-game.component';
import { GameSettings } from './models/game-settings.interface';
import { EnchantedMazeMainComponent } from './components/enchanted-maze-main/enchanted-maze-main.component';

@Component({
  selector: 'app-root',
  imports: [
    StartNewGameComponent,
    EnchantedMazeMainComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  public title = 'Enchanted Maze Game';

  protected isGameStarted: WritableSignal<boolean> = signal(false);

  private gameSettingsService = inject(GameSettingsService);

  ngOnInit(): void {
    this.gameSettingsService.gameSettings$.subscribe((data: GameSettings) => {
      this.isGameStarted.set(data.gameStarted);
    });
  }

}