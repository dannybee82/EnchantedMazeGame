import { MazePiece } from "../models/MazePiece";
import { PieceImages } from "./PieceImages";

export class FixedPieces {

    private _images: PieceImages = new PieceImages();

    private _fixedPiecesEasy: MazePiece[] = [
        new MazePiece(0, 0, this._images.getPiecesBrown()[3], 3, 1, true, -1, false, -1, -1),
        new MazePiece(0, 2, this._images.getPiecesBrown()[2], 2, 1, true, -1, false, -1, -1),
        new MazePiece(0, 4, this._images.getPiecesBrown()[2], 2, 1, true, -1, false, -1, -1),
        new MazePiece(0, 6, this._images.getPiecesBrown()[2], 2, 1, true, -1, false, -1, -1),
        new MazePiece(0, 8, this._images.getPiecesBrown()[3], 3, 2, true, -1, false, -1, -1),

        new MazePiece(2, 0, this._images.getPiecesBrown()[2], 2, 0, true, -1, false, -1, -1),
        new MazePiece(2, 2, this._images.getPiecesBrown()[1], 1, 1, true, -1, false, -1, -1),
        new MazePiece(2, 4, this._images.getPiecesBrown()[1], 1, 0, true, -1, false, -1, -1),
        new MazePiece(2, 6, this._images.getPiecesBrown()[1], 1, 1, true, -1, false, -1, -1),
        new MazePiece(2, 8, this._images.getPiecesBrown()[2], 2, 2, true, -1, false, -1, -1),

        new MazePiece(4, 0, this._images.getPiecesBrown()[2], 2, 0, true, -1, false, -1, -1),
        new MazePiece(4, 2, this._images.getPiecesBrown()[1], 1, 1, true, -1, false, -1, -1),
        new MazePiece(4, 4, this._images.getPiecesBrown()[1], 1, 0, true, -1, false, -1, -1),
        new MazePiece(4, 6, this._images.getPiecesBrown()[1], 1, 1, true, -1, false, -1, -1),
        new MazePiece(4, 8, this._images.getPiecesBrown()[2], 2, 2, true, -1, false, -1, -1),

        new MazePiece(6, 0, this._images.getPiecesBrown()[2], 2, 0, true, -1, false, -1, -1),
        new MazePiece(6, 2, this._images.getPiecesBrown()[1], 1, 1, true, -1, false, -1, -1),
        new MazePiece(6, 4, this._images.getPiecesBrown()[1], 1, 0, true, -1, false, -1, -1),
        new MazePiece(6, 6, this._images.getPiecesBrown()[1], 1, 1, true, -1, false, -1, -1),
        new MazePiece(6, 8, this._images.getPiecesBrown()[2], 2, 2, true, -1, false, -1, -1),

        new MazePiece(8, 0, this._images.getPiecesBrown()[3], 3, 0, true, -1, false, -1, -1),
        new MazePiece(8, 2, this._images.getPiecesBrown()[2], 2, 3, true, -1, false, -1, -1),
        new MazePiece(8, 4, this._images.getPiecesBrown()[2], 2, 3, true, -1, false, -1, -1),
        new MazePiece(8, 6, this._images.getPiecesBrown()[2], 2, 3, true, -1, false, -1, -1),
        new MazePiece(8, 8, this._images.getPiecesBrown()[3], 3, 3, true, -1, false, -1, -1)
    ];

    private _fixedPiecesNormal: MazePiece[] = [
        new MazePiece(0, 0, this._images.getPiecesBrown()[3], 3, 1, true, -1, false, -1, -1),
        new MazePiece(0, 2, this._images.getPiecesBrown()[0], 0, 1, true, -1, false, -1, -1),
        new MazePiece(0, 4, this._images.getPiecesBrown()[2], 2, 1, true, -1, false, -1, -1),
        new MazePiece(0, 6, this._images.getPiecesBrown()[0], 0, 1, true, -1, false, -1, -1),
        new MazePiece(0, 8, this._images.getPiecesBrown()[3], 3, 2, true, -1, false, -1, -1),

        new MazePiece(2, 0, this._images.getPiecesBrown()[0], 0, 0, true, -1, false, -1, -1),
        new MazePiece(2, 2, this._images.getPiecesBrown()[3], 3, 1, true, -1, false, -1, -1),
        new MazePiece(2, 4, this._images.getPiecesBrown()[1], 1, 0, true, -1, false, -1, -1),
        new MazePiece(2, 6, this._images.getPiecesBrown()[3], 3, 2, true, -1, false, -1, -1),
        new MazePiece(2, 8, this._images.getPiecesBrown()[0], 0, 0, true, -1, false, -1, -1),

        new MazePiece(4, 0, this._images.getPiecesBrown()[2], 2, 0, true, -1, false, -1, -1),
        new MazePiece(4, 2, this._images.getPiecesBrown()[1], 1, 1, true, -1, false, -1, -1),
        new MazePiece(4, 4, this._images.getPiecesBrown()[1], 1, 0, true, -1, false, -1, -1),
        new MazePiece(4, 6, this._images.getPiecesBrown()[1], 1, 1, true, -1, false, -1, -1),
        new MazePiece(4, 8, this._images.getPiecesBrown()[2], 2, 2, true, -1, false, -1, -1),

        new MazePiece(6, 0, this._images.getPiecesBrown()[0], 0, 0, true, -1, false, -1, -1),
        new MazePiece(6, 2, this._images.getPiecesBrown()[3], 3, 0, true, -1, false, -1, -1),
        new MazePiece(6, 4, this._images.getPiecesBrown()[1], 1, 0, true, -1, false, -1, -1),
        new MazePiece(6, 6, this._images.getPiecesBrown()[3], 3, 3, true, -1, false, -1, -1),
        new MazePiece(6, 8, this._images.getPiecesBrown()[0], 0, 0, true, -1, false, -1, -1),

        new MazePiece(8, 0, this._images.getPiecesBrown()[3], 3, 0, true, -1, false, -1, -1),
        new MazePiece(8, 2, this._images.getPiecesBrown()[0], 0, 1, true, -1, false, -1, -1),
        new MazePiece(8, 4, this._images.getPiecesBrown()[2], 2, 3, true, -1, false, -1, -1),
        new MazePiece(8, 6, this._images.getPiecesBrown()[0], 0, 1, true, -1, false, -1, -1),
        new MazePiece(8, 8, this._images.getPiecesBrown()[3], 3, 3, true, -1, false, -1, -1)
    ];

    private _fixedPiecesHard: MazePiece[] = [
        new MazePiece(0, 0, this._images.getPiecesBrown()[3], 3, 1, true, -1, false, -1, -1),
        new MazePiece(0, 2, this._images.getPiecesBrown()[0], 0, 1, true, -1, false, -1, -1),
        new MazePiece(0, 4, this._images.getPiecesBrown()[0], 0, 1, true, -1, false, -1, -1),
        new MazePiece(0, 6, this._images.getPiecesBrown()[0], 0, 1, true, -1, false, -1, -1),
        new MazePiece(0, 8, this._images.getPiecesBrown()[3], 3, 2, true, -1, false, -1, -1),

        new MazePiece(2, 0, this._images.getPiecesBrown()[0], 0, 0, true, -1, false, -1, -1),
        new MazePiece(2, 2, this._images.getPiecesBrown()[3], 3, 1, true, -1, false, -1, -1),
        new MazePiece(2, 4, this._images.getPiecesBrown()[0], 0, 1, true, -1, false, -1, -1),
        new MazePiece(2, 6, this._images.getPiecesBrown()[3], 3, 2, true, -1, false, -1, -1),
        new MazePiece(2, 8, this._images.getPiecesBrown()[0], 0, 0, true, -1, false, -1, -1),

        new MazePiece(4, 0, this._images.getPiecesBrown()[0], 0, 0, true, -1, false, -1, -1),
        new MazePiece(4, 2, this._images.getPiecesBrown()[0], 0, 0, true, -1, false, -1, -1),
        new MazePiece(4, 4, this._images.getPiecesBrown()[1], 1, 0, true, -1, false, -1, -1),
        new MazePiece(4, 6, this._images.getPiecesBrown()[0], 0, 0, true, -1, false, -1, -1),
        new MazePiece(4, 8, this._images.getPiecesBrown()[0], 0, 0, true, -1, false, -1, -1),

        new MazePiece(6, 0, this._images.getPiecesBrown()[0], 0, 0, true, -1, false, -1, -1),
        new MazePiece(6, 2, this._images.getPiecesBrown()[3], 3, 0, true, -1, false, -1, -1),
        new MazePiece(6, 4, this._images.getPiecesBrown()[0], 0, 1, true, -1, false, -1, -1),
        new MazePiece(6, 6, this._images.getPiecesBrown()[3], 3, 3, true, -1, false, -1, -1),
        new MazePiece(6, 8, this._images.getPiecesBrown()[0], 0, 0, true, -1, false, -1, -1),

        new MazePiece(8, 0, this._images.getPiecesBrown()[3], 3, 0, true, -1, false, -1, -1),
        new MazePiece(8, 2, this._images.getPiecesBrown()[0], 0, 1, true, -1, false, -1, -1),
        new MazePiece(8, 4, this._images.getPiecesBrown()[0], 0, 1, true, -1, false, -1, -1),
        new MazePiece(8, 6, this._images.getPiecesBrown()[0], 0, 1, true, -1, false, -1, -1),
        new MazePiece(8, 8, this._images.getPiecesBrown()[3], 3, 3, true, -1, false, -1, -1)
    ];

    getFixedPiece(row: number, column: number, difficulty: number) : MazePiece | undefined {
        let index: number = -1;

        switch(difficulty) {
            case 1:
                index = this._fixedPiecesEasy.findIndex(item => item.row == row && item.column == column);
                break;
            case 2:
                index = this._fixedPiecesNormal.findIndex(item => item.row == row && item.column == column);
                break;
            case 3: 
                index = this._fixedPiecesHard.findIndex(item => item.row == row && item.column == column);
                break;
        }

        if(difficulty == 1) {
            return this._fixedPiecesEasy[index];
        } else if (difficulty == 2) {
            return this._fixedPiecesNormal[index];
        } else if(difficulty == 3) {
            return this._fixedPiecesHard[index];
        }

        return undefined;
    }


}