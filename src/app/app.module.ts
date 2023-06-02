import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ServiceWorkerModule } from '@angular/service-worker';

//Services
import { GameSettingsService } from './services/game-settings.service';
import { MazeService } from './services/maze.service';
import { TreasuresService } from './services/treasures.service';
import { TurnAndScoreboardService } from './services/turn-and-scoreboard.service';

//Components
import { AppComponent } from './app.component';
import { EnchantedMazeComponent } from './components/enchanted-maze/enchanted-maze.component';
import { StartNewGameComponent } from './components/start-new-game/start-new-game.component';
import { TurnAndScoreboardComponent } from './components/turn-and-scoreboard/turn-and-scoreboard.component';

@NgModule({
  declarations: [
    AppComponent,
    EnchantedMazeComponent,
    StartNewGameComponent,
    TurnAndScoreboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    GameSettingsService,
    MazeService,
    TreasuresService,
    TurnAndScoreboardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }