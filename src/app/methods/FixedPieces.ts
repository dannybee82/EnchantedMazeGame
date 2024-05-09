import { MazePiece } from "../models/maze-piece.interface";
import { PieceImages } from "./PieceImages";

export class FixedPieces {

    private _images: PieceImages = new PieceImages();

    private _fixedPiecesEasy: MazePiece[] = [
        {row:0, column:0, pieceImage: this._images.getPiecesBrown()[3], pieceNumber:3, orientation:1, isFixed: true, player:-1, hasTreasure: false, treasureForPlayer:-1, treasureImage: ''},
        {row:0, column:2, pieceImage: this._images.getPiecesBrown()[2], pieceNumber:2, orientation:1, isFixed: true, player:-1, hasTreasure: false, treasureForPlayer:-1, treasureImage: ''},
        {row:0, column:4, pieceImage: this._images.getPiecesBrown()[2], pieceNumber:2, orientation:1, isFixed: true, player:-1, hasTreasure: false, treasureForPlayer:-1, treasureImage: ''},
        {row:0, column:6, pieceImage: this._images.getPiecesBrown()[2], pieceNumber:2, orientation:1, isFixed: true, player:-1, hasTreasure: false, treasureForPlayer:-1, treasureImage: ''},
        {row:0, column:8, pieceImage: this._images.getPiecesBrown()[3], pieceNumber:3, orientation:2, isFixed: true, player:-1, hasTreasure: false, treasureForPlayer:-1, treasureImage: ''},

        {row:2, column:0, pieceImage: this._images.getPiecesBrown()[2], pieceNumber:2, orientation:0, isFixed: true, player:-1, hasTreasure: false, treasureForPlayer:-1, treasureImage: ''}, 
        {row:2, column:2, pieceImage: this._images.getPiecesBrown()[1], pieceNumber:1, orientation:1, isFixed: true, player:-1, hasTreasure: false, treasureForPlayer:-1, treasureImage: ''}, 
        {row:2, column:4, pieceImage: this._images.getPiecesBrown()[1], pieceNumber:1, orientation:0, isFixed: true, player:-1, hasTreasure: false, treasureForPlayer:-1, treasureImage: ''}, 
        {row:2, column:6, pieceImage: this._images.getPiecesBrown()[1], pieceNumber:1, orientation:1, isFixed: true, player:-1, hasTreasure: false, treasureForPlayer:-1, treasureImage: ''}, 
        {row:2, column:8, pieceImage: this._images.getPiecesBrown()[2], pieceNumber:2, orientation:2, isFixed: true, player:-1, hasTreasure: false, treasureForPlayer:-1, treasureImage: ''}, 


        {row:4, column:0, pieceImage: this._images.getPiecesBrown()[2], pieceNumber:2, orientation:0, isFixed: true, player:-1, hasTreasure: false, treasureForPlayer:-1, treasureImage: ''}, 
        {row:4, column:2, pieceImage: this._images.getPiecesBrown()[1], pieceNumber:1, orientation:1, isFixed: true, player:-1, hasTreasure: false, treasureForPlayer:-1, treasureImage: ''}, 
        {row:4, column:4, pieceImage: this._images.getPiecesBrown()[1], pieceNumber:1, orientation:0, isFixed: true, player:-1, hasTreasure: false, treasureForPlayer:-1, treasureImage: ''}, 
        {row:4, column:6, pieceImage: this._images.getPiecesBrown()[1], pieceNumber:1, orientation:1, isFixed: true, player:-1, hasTreasure: false, treasureForPlayer:-1, treasureImage: ''}, 
        {row:4, column:8, pieceImage: this._images.getPiecesBrown()[2], pieceNumber:2, orientation:2, isFixed: true, player:-1, hasTreasure: false, treasureForPlayer:-1, treasureImage: ''}, 

        {row:6, column:0, pieceImage: this._images.getPiecesBrown()[2], pieceNumber:2, orientation:0, isFixed: true, player:-1, hasTreasure: false, treasureForPlayer:-1, treasureImage: ''}, 
        {row:6, column:2, pieceImage: this._images.getPiecesBrown()[1], pieceNumber:1, orientation:1, isFixed: true, player:-1, hasTreasure: false, treasureForPlayer:-1, treasureImage: ''}, 
        {row:6, column:4, pieceImage: this._images.getPiecesBrown()[1], pieceNumber:1, orientation:0, isFixed: true, player:-1, hasTreasure: false, treasureForPlayer:-1, treasureImage: ''}, 
        {row:6, column:6, pieceImage: this._images.getPiecesBrown()[1], pieceNumber:1, orientation:1, isFixed: true, player:-1, hasTreasure: false, treasureForPlayer:-1, treasureImage: ''}, 
        {row:6, column:8, pieceImage: this._images.getPiecesBrown()[2], pieceNumber:2, orientation:2, isFixed: true, player:-1, hasTreasure: false, treasureForPlayer:-1, treasureImage: ''}, 

        {row:8, column:0, pieceImage: this._images.getPiecesBrown()[3], pieceNumber:3, orientation:0, isFixed: true, player:-1, hasTreasure: false, treasureForPlayer:-1, treasureImage: ''}, 
        {row:8, column:2, pieceImage: this._images.getPiecesBrown()[2], pieceNumber:2, orientation:3, isFixed: true, player:-1, hasTreasure: false, treasureForPlayer:-1, treasureImage: ''}, 
        {row:8, column:4, pieceImage: this._images.getPiecesBrown()[2], pieceNumber:2, orientation:3, isFixed: true, player:-1, hasTreasure: false, treasureForPlayer:-1, treasureImage: ''}, 
        {row:8, column:6, pieceImage: this._images.getPiecesBrown()[2], pieceNumber:2, orientation:3, isFixed: true, player:-1, hasTreasure: false, treasureForPlayer:-1, treasureImage: ''}, 
        {row:8, column:8, pieceImage: this._images.getPiecesBrown()[3], pieceNumber:3, orientation:3, isFixed: true, player:-1, hasTreasure: false, treasureForPlayer:-1, treasureImage: ''}, 
    ];

    private _fixedPiecesNormal: MazePiece[] = [
        {row:0, column:0, pieceImage: this._images.getPiecesBrown()[3], pieceNumber:3, orientation:1, isFixed: true, player:-1, hasTreasure: false, treasureForPlayer:-1, treasureImage: ''}, 
        {row:0, column:2, pieceImage: this._images.getPiecesBrown()[0], pieceNumber:0, orientation:1, isFixed: true, player:-1, hasTreasure: false, treasureForPlayer:-1, treasureImage: ''}, 
        {row:0, column:4, pieceImage: this._images.getPiecesBrown()[2], pieceNumber:2, orientation:1, isFixed: true, player:-1, hasTreasure: false, treasureForPlayer:-1, treasureImage: ''}, 
        {row:0, column:6, pieceImage: this._images.getPiecesBrown()[0], pieceNumber:0, orientation:1, isFixed: true, player:-1, hasTreasure: false, treasureForPlayer:-1, treasureImage: ''}, 
        {row:0, column:8, pieceImage: this._images.getPiecesBrown()[3], pieceNumber:3, orientation:2, isFixed: true, player:-1, hasTreasure: false, treasureForPlayer:-1, treasureImage: ''}, 

        {row:2, column:0, pieceImage: this._images.getPiecesBrown()[0], pieceNumber:0, orientation:0, isFixed: true, player:-1, hasTreasure: false, treasureForPlayer:-1, treasureImage: ''}, 
        {row:2, column:2, pieceImage: this._images.getPiecesBrown()[3], pieceNumber:3, orientation:1, isFixed: true, player:-1, hasTreasure: false, treasureForPlayer:-1, treasureImage: ''}, 
        {row:2, column:4, pieceImage: this._images.getPiecesBrown()[1], pieceNumber:1, orientation:0, isFixed: true, player:-1, hasTreasure: false, treasureForPlayer:-1, treasureImage: ''}, 
        {row:2, column:6, pieceImage: this._images.getPiecesBrown()[3], pieceNumber:3, orientation:2, isFixed: true, player:-1, hasTreasure: false, treasureForPlayer:-1, treasureImage: ''}, 
        {row:2, column:8, pieceImage: this._images.getPiecesBrown()[0], pieceNumber:0, orientation:0, isFixed: true, player:-1, hasTreasure: false, treasureForPlayer:-1, treasureImage: ''}, 

        {row:4, column:0, pieceImage: this._images.getPiecesBrown()[2], pieceNumber:2, orientation:0, isFixed: true, player:-1, hasTreasure: false, treasureForPlayer:-1, treasureImage: ''}, 
        {row:4, column:2, pieceImage: this._images.getPiecesBrown()[1], pieceNumber:1, orientation:1, isFixed: true, player:-1, hasTreasure: false, treasureForPlayer:-1, treasureImage: ''}, 
        {row:4, column:4, pieceImage: this._images.getPiecesBrown()[1], pieceNumber:1, orientation:0, isFixed: true, player:-1, hasTreasure: false, treasureForPlayer:-1, treasureImage: ''}, 
        {row:4, column:6, pieceImage: this._images.getPiecesBrown()[1], pieceNumber:1, orientation:1, isFixed: true, player:-1, hasTreasure: false, treasureForPlayer:-1, treasureImage: ''}, 
        {row:4, column:8, pieceImage: this._images.getPiecesBrown()[2], pieceNumber:2, orientation:2, isFixed: true, player:-1, hasTreasure: false, treasureForPlayer:-1, treasureImage: ''}, 

        {row:6, column:0, pieceImage: this._images.getPiecesBrown()[0], pieceNumber:0, orientation:0, isFixed: true, player:-1, hasTreasure: false, treasureForPlayer:-1, treasureImage: ''}, 
        {row:6, column:2, pieceImage: this._images.getPiecesBrown()[3], pieceNumber:3, orientation:0, isFixed: true, player:-1, hasTreasure: false, treasureForPlayer:-1, treasureImage: ''}, 
        {row:6, column:4, pieceImage: this._images.getPiecesBrown()[1], pieceNumber:1, orientation:0, isFixed: true, player:-1, hasTreasure: false, treasureForPlayer:-1, treasureImage: ''}, 
        {row:6, column:6, pieceImage: this._images.getPiecesBrown()[3], pieceNumber:3, orientation:3, isFixed: true, player:-1, hasTreasure: false, treasureForPlayer:-1, treasureImage: ''}, 
        {row:6, column:8, pieceImage: this._images.getPiecesBrown()[0], pieceNumber:0, orientation:0, isFixed: true, player:-1, hasTreasure: false, treasureForPlayer:-1, treasureImage: ''}, 

        {row:8, column:0, pieceImage: this._images.getPiecesBrown()[3], pieceNumber:3, orientation:0, isFixed: true, player:-1, hasTreasure: false, treasureForPlayer:-1, treasureImage: ''}, 
        {row:8, column:2, pieceImage: this._images.getPiecesBrown()[0], pieceNumber:0, orientation:1, isFixed: true, player:-1, hasTreasure: false, treasureForPlayer:-1, treasureImage: ''}, 
        {row:8, column:4, pieceImage: this._images.getPiecesBrown()[2], pieceNumber:2, orientation:3, isFixed: true, player:-1, hasTreasure: false, treasureForPlayer:-1, treasureImage: ''}, 
        {row:8, column:6, pieceImage: this._images.getPiecesBrown()[0], pieceNumber:0, orientation:1, isFixed: true, player:-1, hasTreasure: false, treasureForPlayer:-1, treasureImage: ''}, 
        {row:8, column:8, pieceImage: this._images.getPiecesBrown()[3], pieceNumber:3, orientation:3, isFixed: true, player:-1, hasTreasure: false, treasureForPlayer:-1, treasureImage: ''}, 
    ];

    private _fixedPiecesHard: MazePiece[] = [
        {row:0, column:0, pieceImage: this._images.getPiecesBrown()[3], pieceNumber:3, orientation:1, isFixed: true, player:-1, hasTreasure: false, treasureForPlayer:-1, treasureImage: ''}, 
        {row:0, column:2, pieceImage: this._images.getPiecesBrown()[0], pieceNumber:0, orientation:1, isFixed: true, player:-1, hasTreasure: false, treasureForPlayer:-1, treasureImage: ''}, 
        {row:0, column:4, pieceImage: this._images.getPiecesBrown()[0], pieceNumber:0, orientation:1, isFixed: true, player:-1, hasTreasure: false, treasureForPlayer:-1, treasureImage: ''}, 
        {row:0, column:6, pieceImage: this._images.getPiecesBrown()[0], pieceNumber:0, orientation:1, isFixed: true, player:-1, hasTreasure: false, treasureForPlayer:-1, treasureImage: ''}, 
        {row:0, column:8, pieceImage: this._images.getPiecesBrown()[3], pieceNumber:3, orientation:2, isFixed: true, player:-1, hasTreasure: false, treasureForPlayer:-1, treasureImage: ''}, 

        {row:2, column:0, pieceImage: this._images.getPiecesBrown()[0], pieceNumber:0, orientation:0, isFixed: true, player:-1, hasTreasure: false, treasureForPlayer:-1, treasureImage: ''}, 
        {row:2, column:2, pieceImage: this._images.getPiecesBrown()[3], pieceNumber:3, orientation:1, isFixed: true, player:-1, hasTreasure: false, treasureForPlayer:-1, treasureImage: ''}, 
        {row:2, column:4, pieceImage: this._images.getPiecesBrown()[0], pieceNumber:0, orientation:1, isFixed: true, player:-1, hasTreasure: false, treasureForPlayer:-1, treasureImage: ''}, 
        {row:2, column:6, pieceImage: this._images.getPiecesBrown()[3], pieceNumber:3, orientation:2, isFixed: true, player:-1, hasTreasure: false, treasureForPlayer:-1, treasureImage: ''}, 
        {row:2, column:8, pieceImage: this._images.getPiecesBrown()[0], pieceNumber:0, orientation:0, isFixed: true, player:-1, hasTreasure: false, treasureForPlayer:-1, treasureImage: ''}, 

        {row:4, column:0, pieceImage: this._images.getPiecesBrown()[0], pieceNumber:0, orientation:0, isFixed: true, player:-1, hasTreasure: false, treasureForPlayer:-1, treasureImage: ''}, 
        {row:4, column:2, pieceImage: this._images.getPiecesBrown()[0], pieceNumber:0, orientation:0, isFixed: true, player:-1, hasTreasure: false, treasureForPlayer:-1, treasureImage: ''}, 
        {row:4, column:4, pieceImage: this._images.getPiecesBrown()[1], pieceNumber:1, orientation:0, isFixed: true, player:-1, hasTreasure: false, treasureForPlayer:-1, treasureImage: ''}, 
        {row:4, column:6, pieceImage: this._images.getPiecesBrown()[0], pieceNumber:0, orientation:0, isFixed: true, player:-1, hasTreasure: false, treasureForPlayer:-1, treasureImage: ''}, 
        {row:4, column:8, pieceImage: this._images.getPiecesBrown()[0], pieceNumber:0, orientation:0, isFixed: true, player:-1, hasTreasure: false, treasureForPlayer:-1, treasureImage: ''}, 

        {row:6, column:0, pieceImage: this._images.getPiecesBrown()[0], pieceNumber:0, orientation:0, isFixed: true, player:-1, hasTreasure: false, treasureForPlayer:-1, treasureImage: ''}, 
        {row:6, column:2, pieceImage: this._images.getPiecesBrown()[3], pieceNumber:3, orientation:0, isFixed: true, player:-1, hasTreasure: false, treasureForPlayer:-1, treasureImage: ''}, 
        {row:6, column:4, pieceImage: this._images.getPiecesBrown()[0], pieceNumber:0, orientation:1, isFixed: true, player:-1, hasTreasure: false, treasureForPlayer:-1, treasureImage: ''}, 
        {row:6, column:6, pieceImage: this._images.getPiecesBrown()[3], pieceNumber:3, orientation:3, isFixed: true, player:-1, hasTreasure: false, treasureForPlayer:-1, treasureImage: ''}, 
        {row:6, column:8, pieceImage: this._images.getPiecesBrown()[0], pieceNumber:0, orientation:0, isFixed: true, player:-1, hasTreasure: false, treasureForPlayer:-1, treasureImage: ''}, 

        {row:8, column:0, pieceImage: this._images.getPiecesBrown()[3], pieceNumber:3, orientation:0, isFixed: true, player:-1, hasTreasure: false, treasureForPlayer:-1, treasureImage: ''}, 
        {row:8, column:2, pieceImage: this._images.getPiecesBrown()[0], pieceNumber:0, orientation:1, isFixed: true, player:-1, hasTreasure: false, treasureForPlayer:-1, treasureImage: ''}, 
        {row:8, column:4, pieceImage: this._images.getPiecesBrown()[0], pieceNumber:0, orientation:1, isFixed: true, player:-1, hasTreasure: false, treasureForPlayer:-1, treasureImage: ''}, 
        {row:8, column:6, pieceImage: this._images.getPiecesBrown()[0], pieceNumber:0, orientation:1, isFixed: true, player:-1, hasTreasure: false, treasureForPlayer:-1, treasureImage: ''}, 
        {row:8, column:8, pieceImage: this._images.getPiecesBrown()[3], pieceNumber:3, orientation:3, isFixed: true, player:-1, hasTreasure: false, treasureForPlayer:-1, treasureImage: ''}, 
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