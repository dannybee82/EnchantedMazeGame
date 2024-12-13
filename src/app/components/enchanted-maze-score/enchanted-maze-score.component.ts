import { Component, OnInit, inject } from '@angular/core';
import { ScoreService } from '../../services/score.service';
import { Score } from '../../models/score.interface';
import { MazeService } from '../../services/maze.service';
import { InsertPieceService } from '../../services/insert-piece.service';
import { MazePiece } from '../../models/maze-piece.interface';

@Component({
  selector: 'app-enchanted-maze-score',
  imports: [],
  templateUrl: './enchanted-maze-score.component.html',
  styleUrl: './enchanted-maze-score.component.scss'
})
export class EnchantedMazeScoreComponent implements OnInit {

  private scoreService = inject(ScoreService);
  private mazeService = inject(MazeService);
  private InsertPieceService = inject(InsertPieceService);

  currentScore?: Score;

  ngOnInit(): void {
    this.scoreService.score$.subscribe((data: Score) => {
      if(data.totalTreasuresAmount > 0) {
        this.currentScore = data;
      }
    });
  }

  getTreasureForPlayer(player: number): string {
    const mazePieces: MazePiece[] = this.mazeService.maze$.getValue();

    for(let i = 0; i < mazePieces.length; i++) {
      if(mazePieces[i].hasTreasure && mazePieces[i].treasureForPlayer === player) {
        return mazePieces[i].treasureImage;
      }
    }

    const InsertPiece: MazePiece = this.InsertPieceService.currentPiece$.getValue();

    if(InsertPiece.hasTreasure && InsertPiece.treasureForPlayer === player) {
      return InsertPiece.treasureImage;
    }

    return "";
  }

  getHighestScore() : number {
    return Math.max(...this.scoreService.score$.getValue().scores);
  }

  getWinningPlayers() : number[] {
    let winning: number[] = [];

    const highestScore: number = this.getHighestScore();
    const scores: number[] = this.scoreService.score$.getValue().scores;

    for(let i = 0; i < scores.length; i++) {
      if(scores[i] == highestScore) {
        winning.push(i);
      }
    }    

    return winning;
  }

}