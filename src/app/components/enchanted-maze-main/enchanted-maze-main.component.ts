import { Component, OnDestroy, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { TreasureService } from '../../services/treasure.service';
import { GameSettingsService } from '../../services/game-settings.service';
import { GameSettings } from '../../models/game-settings.interface';
import { InsertPieceService } from '../../services/insert-piece.service';
import { MazeService } from '../../services/maze.service';
import { TurnService } from '../../services/turn.service';
import { Turn } from '../../models/turn.interface';
import { ScoreService } from '../../services/score.service';
import { Score } from '../../models/score.interface';
import { ShowHintService } from '../../services/show-hint.service';
import { LastInsertedPositionService } from '../../services/last-inserted-position.service';
import { EnchantedMazeInsertPieceComponent } from '../enchanted-maze-insert-piece/enchanted-maze-insert-piece.component';
import { EnchantedMazeTurnComponent } from '../enchanted-maze-turn/enchanted-maze-turn.component';
import { EnchantedMazeScoreComponent } from '../enchanted-maze-score/enchanted-maze-score.component';
import { EnchantedMazeBoardComponent } from '../enchanted-maze-board/enchanted-maze-board.component';
import { EnchantedMazeHintComponent } from '../enchanted-maze-hint/enchanted-maze-hint.component';
import { Treasure } from '../../models/treasure.interface';
import { TreasureData } from '../../models/treasure-data.interface';

@Component({
  selector: 'app-enchanted-maze-main',
  standalone: true,
  imports: [
    EnchantedMazeInsertPieceComponent,
    EnchantedMazeTurnComponent,
    EnchantedMazeScoreComponent,
    EnchantedMazeBoardComponent,
    EnchantedMazeHintComponent
  ],
  templateUrl: './enchanted-maze-main.component.html',
  styleUrl: './enchanted-maze-main.component.scss'
})
export class EnchantedMazeMainComponent implements OnInit, OnDestroy {

  isAllSet: WritableSignal<boolean> = signal(false);
  isGameEnded: WritableSignal<boolean> = signal(false);

  private gameSettingsService = inject(GameSettingsService);
  private treasureService = inject(TreasureService);
  private insertPieceService = inject(InsertPieceService);
  private mazeService = inject(MazeService);
  private turnService = inject(TurnService);
  private scoreService = inject(ScoreService);
  private lastInsertPositionService = inject(LastInsertedPositionService);
  private showHintService = inject(ShowHintService);

  ngOnInit(): void {
    this.gameSettingsService.gameSettings$.subscribe((gameSettings: GameSettings) => {
      if(gameSettings.gameStarted) {
        this.treasureService.generateRandomTreasures(gameSettings);
        this.insertPieceService.generateStartPiece();
        this.insertPieceService.setPieceInserted(false);
        this.mazeService.generateMaze(gameSettings);

        const treasureData: TreasureData = this.treasureService.treasureData$.getValue();
        const treasures: Treasure[] = treasureData.treasures;
        let index: number = 0;

        for(let i = 0; i < gameSettings.amountOfPlayers; i++) {
          let treasure: Treasure = treasures[index];
          this.mazeService.placeSingleTreasure(treasure, i);
          index++;          
        }     
        treasureData.index = index;
        this.treasureService.update(treasureData);

        const turns: Turn = this.turnService.turns$.getValue();
        turns.totalTurns = 1;
        turns.currentPlayerTurn = 0;
        turns.humanOrComputer = gameSettings.humanOrCpu;
        this.turnService.updateTurns(turns);

        const score: Score = this.scoreService.score$.getValue();
        let scoreOfPlayers: number[] = [];

        for(let i = 0; i < gameSettings.amountOfPlayers; i++) {
          scoreOfPlayers.push(0);
        }

        score.scores = scoreOfPlayers;
        score.totalTreasuresAmount = gameSettings.amountOfTreasures;
        this.scoreService.updateScore(score);

        this.isAllSet.set(true);

        //Debugging:
        // console.log('gamesettings', this.gameSettingsService.gameSettings$.getValue());        
        // console.log('treasure', this.treasureService.treasureData$.getValue()); 
        // console.log('insertPiece', this.insertPieceService.currentPiece$.getValue());
        // console.log('insertPiece 2', this.insertPieceService.isPieceInserted$.getValue());
        // console.log('maze', this.mazeService.maze$.getValue());
        // console.log('turn', this.turnService.turns$.getValue());
        // console.log('score', this.scoreService.score$.getValue());
        // console.log('lastInsertPosition', this.lastInsertPositionService.lastInsertedPosition$.getValue());
        // console.log('showHint', this.showHintService.showHint$.getValue());
      }   
    });   
    
    this.scoreService.score$.subscribe((data: Score) => {
      if(data.isGameEnded) {
        this.isGameEnded.set(true);
      }
    });
  }

  ngOnDestroy(): void {
    this.resetAllDefaults();    
  }

  endGame(): void {
    this.resetAllDefaults();
  }

  private resetAllDefaults(): void {
    this.gameSettingsService.resetDefaults();
    this.treasureService.resetDefaults();
    this.insertPieceService.resetDefaults();
    this.mazeService.resetDefaults();
    this.turnService.resetDefaults();
    this.scoreService.resetDefaults();
    this.lastInsertPositionService.resetDefaults();
    this.showHintService.resetDefaults();

    //Debugging:
    // console.log('gamesettings', this.gameSettingsService.gameSettings$.getValue());
    // console.log('treasure', this.treasureService.treasureData$.getValue()); 
    // console.log('insertPiece', this.insertPieceService.currentPiece$.getValue());
    // console.log('insertPiece 2', this.insertPieceService.isPieceInserted$.getValue());
    // console.log('maze', this.mazeService.maze$.getValue());
    // console.log('turn', this.turnService.turns$.getValue());
    // console.log('score', this.scoreService.score$.getValue());
    // console.log('lastInsertPosition', this.lastInsertPositionService.lastInsertedPosition$.getValue());
    // console.log('showHint', this.showHintService.showHint$.getValue());
  }

}