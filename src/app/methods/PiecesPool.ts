import { PieceImages } from "./PieceImages";
import { MazePiece } from "../models/maze-piece.interface";
import { RandomNumbers } from "./RandomNumbers";
import { CommonArrayFunctions } from "./CommonArrayFunctions";

export class PiecesPool {

    private _difficultyLevels: number[][] = [[32, 4, 4, 16],
                                             [26, 2, 2, 26],
                                             [20, 1, 1, 34]];

    private _addPieces: number[] = [];

    private _pool: MazePiece[] = [];

    private _images: PieceImages = new PieceImages();

    fillPool(difficulty: number) : void {
        let randomNumbers: RandomNumbers = new RandomNumbers();
        this._pool = [];
        this._addPieces = [];

        this.setPieces(difficulty);

        for(let i = 0; i < this._addPieces.length; i++) {
            let amount: number = this._addPieces[i];

            for(let j = 0; j < amount; j++) {
                let orientation: number = randomNumbers.generateRandomNumber(0, 4);
                const mazePiece: MazePiece = {
                    row: -1,
                    column: -1,
                    pieceImage: this._images.getPiecesRed()[i],
                    pieceNumber: i, 
                    orientation: orientation,
                    isFixed: false,
                    player: -1,
                    hasTreasure: false,
                    treasureForPlayer: -1,
                    treasureImage: ''
                };
                this._pool.push(mazePiece);
            }
        }

        this.shufflePieces();
    }

    setPieces(difficulty: number) : boolean {
        let amountOfPieces: number[] = this._difficultyLevels[difficulty - 1];

        for(let i = 0; i < amountOfPieces.length; i++) {
            this._addPieces.push(amountOfPieces[i]);
        } 
        
        return true;
    }

    getPiece(index: number) : MazePiece {
        return this._pool[index];
    }

    private shufflePieces() : void {
        let randomNumbers: RandomNumbers = new RandomNumbers();
        let commonArrayFunctions: CommonArrayFunctions = new CommonArrayFunctions();

        for(let i = 0; i < this._pool.length; i++) {
            let randomIndex: number = randomNumbers.generateRandomNumber(0, this._pool.length);
            this._pool = commonArrayFunctions.swap(this._pool, i, randomIndex);
        }
    }

}