import { Component, InputSignal, input, OutputEmitterRef, output, inject } from '@angular/core';
import { MazePiece } from '../../models/maze-piece.interface';
import { PieceInserted } from '../../methods/Animations';
import { LastInsertedPositionService } from '../../services/last-inserted-position.service';
import { LastInsertedPosition } from '../../models/last-inserted-position.interface';
import { Position } from '../../models/position.interface';

@Component({
  selector: 'app-enchanted-maze-piece',
  standalone: true,
  imports: [],
  templateUrl: './enchanted-maze-piece.component.html',
  styleUrl: './enchanted-maze-piece.component.scss',
  animations: [PieceInserted]
})
export class EnchantedMazePieceComponent {

  mazePiece: InputSignal<MazePiece> = input.required<MazePiece>({});
  movePlayer: OutputEmitterRef<Position> = output<Position>();

  private lastInsertedPosition = inject(LastInsertedPositionService);

  isPieceAffectedByInsert(row: number, column: number) : string {
    const lastPosition: LastInsertedPosition = this.lastInsertedPosition.lastInsertedPosition$.getValue();

    if(lastPosition.row == row) {
      return "inserted";
    }

    if(lastPosition.column == column) {
      return "inserted";
    }

    return "not-inserted";
  }

  move(row: number, column: number) : void {
    const position: Position = { row: row, column: column };
    this.movePlayer.emit(position);     
  }

}