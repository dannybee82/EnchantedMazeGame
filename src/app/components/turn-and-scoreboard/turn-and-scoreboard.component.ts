import { Component } from '@angular/core';

//Models.
import { MazeTreasures } from 'src/app/models/MazeTreasures';

//Services
import { TurnAndScoreboardService } from 'src/app/services/turn-and-scoreboard.service';

@Component({
  selector: 'app-turn-and-scoreboard',
  templateUrl: './turn-and-scoreboard.component.html',
  styleUrls: ['./turn-and-scoreboard.component.css']
})
export class TurnAndScoreboardComponent {

  public totalTurns: number = 1;

  public players: number[] = [];
  public score: number[] = [];

  public currentPlayerTurn: number = 0;

  public playersTreasures: MazeTreasures[] = [];

  public isGameEnded: boolean = false;

  public message: string = "";
  
  constructor(private turnAndScoreboardService: TurnAndScoreboardService) {
    //Listen for first initilization.
    this.turnAndScoreboardService.getFirstInitialization().subscribe({
      next: (result) => {
        if(result) {
          this.players = this.turnAndScoreboardService.getPlayers();
          this.score = this.turnAndScoreboardService.getScore();
          this.totalTurns = this.turnAndScoreboardService.getTotalTurns();
          this.currentPlayerTurn = this.turnAndScoreboardService.getCurrentPlayerTurn();
          this.playersTreasures = this.turnAndScoreboardService.getPlayersTreasures();
          this.isGameEnded = this.turnAndScoreboardService.getIsGameEnded();
          this.message = this.turnAndScoreboardService.getMessage();
        }
      }      
    });

    //Listen for changes.
    this.turnAndScoreboardService.getUpdateTurnAndScore().subscribe({
      next: (result) => {
        if(result) {
          this.totalTurns = this.turnAndScoreboardService.getTotalTurns();
          this.score = this.turnAndScoreboardService.getScore();
          this.currentPlayerTurn = this.turnAndScoreboardService.getCurrentPlayerTurn();
          this.playersTreasures = this.turnAndScoreboardService.getPlayersTreasures();
          this.isGameEnded = this.turnAndScoreboardService.getIsGameEnded();
          this.message = this.turnAndScoreboardService.getMessage();
        }
      }      
    });

  }

  getHighestScore() : number {
    return Math.max(...this.score);
  }

  getWinningPlayers() : number[] {
    let winning: number[] = [];

    let highestScore: number = this.getHighestScore();

    for(let i = 0; i < this.score.length; i++) {
      if(this.score[i] == highestScore) {
        winning.push(i);
      }
    }    

    return winning;
  }

}