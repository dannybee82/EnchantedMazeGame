import { Component, OnInit, inject, WritableSignal, signal } from '@angular/core';
import { InsertPieceService } from '../../services/insert-piece.service';
import { MazePiece } from '../../models/maze-piece.interface';
import { EnchantedMazePieceComponent } from '../enchanted-maze-piece/enchanted-maze-piece.component';

@Component({
  selector: 'app-enchanted-maze-insert-piece',
  imports: [
    EnchantedMazePieceComponent
  ],
  templateUrl: './enchanted-maze-insert-piece.component.html',
  styleUrl: './enchanted-maze-insert-piece.component.scss'
})
export class EnchantedMazeInsertPieceComponent implements OnInit {

  private insertPieceService = inject(InsertPieceService);

  protected insertPiece: WritableSignal<boolean> = signal(false);
  currentPiece?: MazePiece;

  ngOnInit(): void {
    this.insertPieceService.currentPiece$.subscribe((data: MazePiece) => {
      if(data.pieceNumber > -1 && data.pieceImage !== '') {
        this.currentPiece = {...data};
      }
    });

    this.insertPieceService.isPieceInserted$.subscribe((data: boolean) => {
      this.insertPiece.set(data);
    });
  }

  rotateCurrentPiece(isClockwise: boolean) : void {
    const piece: MazePiece = {...this.insertPieceService.currentPiece$.getValue()};
    let currentOrientation: number = piece.orientation;

    (isClockwise) ? currentOrientation += 1 : currentOrientation -= 1;
    currentOrientation = (currentOrientation >= 4) ? 0 : currentOrientation;
    currentOrientation = (currentOrientation < 0) ? 3 : currentOrientation;
    
    piece.orientation = currentOrientation;
    this.insertPieceService.updatePiece(piece);
  }

}