import { Component, OnInit } from '@angular/core';
import { ComputerPlayer } from '../../methods/ComputerPlayer';
import { ComputerInsert } from '../../models/computer-insert.interface';
import { MazeService } from '../../services/maze.service';
import { MazePiece } from '../../models/maze-piece.interface';
import { InsertPieceService } from '../../services/insert-piece.service';
import { TurnService } from '../../services/turn.service';
import { Turn } from '../../models/turn.interface';
import { ShowHintService } from '../../services/show-hint.service';
import { ShowHint } from '../../models/show-hint.interface';

@Component({
  selector: 'app-enchanted-maze-hint',
  imports: [],
  templateUrl: './enchanted-maze-hint.component.html',
  styleUrl: './enchanted-maze-hint.component.scss'
})
export class EnchantedMazeHintComponent extends ComputerPlayer implements OnInit {

  constructor(
    private mazeService: MazeService,
    private insertPieceService: InsertPieceService,
    private turnService: TurnService,
    private showHintService: ShowHintService
  ) {
    super();
  }

  ngOnInit(): void {
    
  }

  showHint(): void {
    const pieces: MazePiece[] = this.mazeService.maze$.getValue();
    const insertPiece: MazePiece = this.insertPieceService.currentPiece$.getValue();
    const turn: Turn = this.turnService.turns$.getValue();

    const hint: ComputerInsert = this.computerInsertCalculation(pieces, insertPiece, turn.currentPlayerTurn, this.fixedRowAndColumnIndexes);

    insertPiece.orientation = hint.orientation;
    this.insertPieceService.updatePiece(insertPiece);

    let side: number = -1;

    if(!hint.insertAxisY) {
      side = (hint.isTopOrLeft) ? 0 : 3;
    } else {
      side = (hint.isTopOrLeft) ? 1 : 2;
    }

    const showHint: ShowHint = {
      side: side,
      index: hint.rowOrColumnIndex
    };
    this.showHintService.update(showHint);
  }

}