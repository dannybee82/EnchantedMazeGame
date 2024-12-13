import { Component, OnInit, inject } from '@angular/core';
import { TurnService } from '../../services/turn.service';
import { Turn } from '../../models/turn.interface';
import { MazeService } from '../../services/maze.service';
import { MazePiece } from '../../models/maze-piece.interface';

@Component({
  selector: 'app-enchanted-maze-turn',
  imports: [],
  templateUrl: './enchanted-maze-turn.component.html',
  styleUrl: './enchanted-maze-turn.component.scss'
})
export class EnchantedMazeTurnComponent implements OnInit {

  private turnService = inject(TurnService);
  private mazeService = inject(MazeService);

  currentTurn?: Turn;
  treasureImage: string = '';

  ngOnInit(): void {
    this.turnService.turns$.subscribe((data: Turn) => {
      if(data.totalTurns > 0) {
        this.currentTurn = {...data};
        this.treasureImage = this.getPlayerTargetTreasure(data.currentPlayerTurn);
      }
    });
  }

  getPlayerTargetTreasure(player: number): string {
    const pieces: MazePiece[] = this.mazeService.maze$.getValue();
    const found: MazePiece | undefined = pieces.find(item => item.treasureForPlayer === player);

    if(found !== undefined) {
      return found.treasureImage;
    }

    return '';
  }

}