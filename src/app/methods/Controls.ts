import { MazePiece } from "../models/MazePiece";
import { MazePaths } from "../models/MazePaths";
import { SearchMazePath } from "./SearchMazePath";

export class Controls extends SearchMazePath {

    private _piecesAtAxis: MazePiece[] = [];
    private _atIndexes: number[] = [];

    private _changedCurrentPiece: MazePiece = new MazePiece(-1, -1, '', -1, -1, false, -1, false, -1, -1, '');
    private _dummyCurrentPiece: MazePiece = new MazePiece(-1, -1, '', -1, -1, false, -1, false, -1, -1, '');

    insert(pieces: MazePiece[], currentPiece: MazePiece, isAxisY: boolean, fromTopOrLeft: boolean, targetColumnOrRow: number, isDummy: boolean) : MazePiece[] {
        this._piecesAtAxis = [];
        this._atIndexes = [];
        this._changedCurrentPiece = this.getDefaultMazePiece();
        this._dummyCurrentPiece = this.getDefaultMazePiece();

        if(isAxisY) {
            this.getColumns(pieces, targetColumnOrRow);
            currentPiece.column = targetColumnOrRow;
        } else {
            this.getRows(pieces, targetColumnOrRow);
            currentPiece.row = targetColumnOrRow;
        }

        (fromTopOrLeft) ? this._piecesAtAxis.unshift(currentPiece) : this._piecesAtAxis.push(currentPiece);
        let targetElement: number = (fromTopOrLeft) ? this._piecesAtAxis.length - 1 : 0;

        if(!isDummy) {
            this._changedCurrentPiece = currentPiece;
            this._changedCurrentPiece = this._piecesAtAxis.splice(targetElement, 1)[0];
            this._changedCurrentPiece.row = -1;
            this._changedCurrentPiece.column = -1;
        } else {
            this._dummyCurrentPiece = currentPiece;
            this._dummyCurrentPiece = this._piecesAtAxis.splice(targetElement, 1)[0];
            this._dummyCurrentPiece.row = -1;
            this._dummyCurrentPiece.column = -1;
        }        

        if(isAxisY) {
            //Axis Y -> insert in column -> top or bottom -> will affect rows.
            this.reorderRows();
        } else {
            //Axis X -> insert in row -> left or right -> will affect columns.
            this.reorderColumns();
        }

       return this.replacePieces(pieces);        
    }

    getChangedCurrentPiece() : MazePiece {
        return this._changedCurrentPiece;
    }

    getDummyCurrentPiece() : MazePiece {
        return this._dummyCurrentPiece;
    }

    canMove(pieces: MazePiece[], playerPaths: MazePaths[], indexFound: number, player: number) : boolean {
        let path: MazePaths = playerPaths[indexFound];
        let indexPlayer: number = pieces.findIndex(item => item.player == player);
        let destination: number = pieces.findIndex(item => item.row == path.row && item.column == path.column);

        let canMove: boolean = true;

        if(pieces[destination].player > -1 && pieces[destination].player != player) {          
          canMove = false;
        }

        if(indexPlayer > -1 && destination > -1 && canMove) {
            return true;
        }

        return false;
    }

    isNotSamePiece(pieces: MazePiece[], destination: number, indexPlayer: number) : boolean {        
        if(pieces[destination].row === pieces[indexPlayer].row && pieces[destination].column === pieces[indexPlayer].column) {
            return true;
        }

        return false;
    }

    hasTreasure(pieces: MazePiece[], destination: number, player: number) : boolean {
        if(pieces[destination].hasTreasure && pieces[destination].treasureForPlayer == player) {
            return true;
        }

        return false;
    }

    move(pieces: MazePiece[], paths: MazePaths[], destination: number, indexPlayer: number, player: number) : MazePiece[] {
        //Undo player paths.
        pieces = this.showPlayerPaths(pieces, paths, false);

        pieces[destination].player = player;
        pieces[indexPlayer].player = -1;

        return pieces;
    }

    moveToDestinations(pieces: MazePiece[], start: number[], destination: number[], player: number) : MazePiece[] {
        let startIndex: number = pieces.findIndex(item => item.row == start[0] && item.column == start[1]);
        let destinationIndex: number = pieces.findIndex(item => item.row == destination[0] && item.column == destination[1]);

        if(startIndex > -1 && destinationIndex > -1) {
            pieces[destinationIndex].player = player;
            pieces[startIndex].player = -1;
        }        

        return pieces;
    }

    private getColumns(pieces: MazePiece[], column: number) : void {
        for(let i = 0; i < pieces.length; i++) {
            if(pieces[i].column == column) {
                this._piecesAtAxis.push(pieces[i]);
                this._atIndexes.push(i);
              }
        }
    }

    private getRows(pieces: MazePiece[], row: number) : void {
        for(let i = 0; i < pieces.length; i++) {
            if(pieces[i].row == row) {
                this._piecesAtAxis.push(pieces[i]);
                this._atIndexes.push(i);
            }
        }
    }

    private getDefaultMazePiece() : MazePiece {
        return new MazePiece(-1, -1, '', -1, -1, false, -1, false, -1, -1 , '');
    }

    private reorderRows() : void {
        for(let i = 0; i < this._piecesAtAxis.length; i++) {
            this._piecesAtAxis[i].row = i;
        }
    }

    private reorderColumns() : void {
        for(let i = 0; i < this._piecesAtAxis.length; i++) {
            this._piecesAtAxis[i].column = i;
        }
    }

    private replacePieces(pieces: MazePiece[]) : MazePiece[] {
        let index: number = 0;

        for(let i = 0; i < this._atIndexes.length; i++) {
          let targetIndex: number = this._atIndexes[i];
          pieces[targetIndex] = this._piecesAtAxis[index];
          index++;
        }

        return pieces;
    }

}