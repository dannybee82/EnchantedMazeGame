import { MazePiece } from "../models/MazePiece";
import { PiecesEntryPoints } from "./PiecesEntryPoints";
import { MazePaths } from "../models/MazePaths";
import { PieceImages } from "./PieceImages";
import { CommonArrayFunctions } from "../shared_methods/CommonArrayFunctions";

export class SearchMazePath extends PiecesEntryPoints {

    private _paths: MazePaths[] = [];
    private _indexes: number[] = [];

    private _pieceImages: PieceImages = new PieceImages();
    
    search(player: number, pieces: MazePiece[]) : MazePaths[] {
        this.clearPaths();

        let playerPosition: number = this.getPlayerPosition(player, pieces);
        
        if(playerPosition > -1) {
            this._paths.push( new MazePaths( pieces[playerPosition].row, pieces[playerPosition].column ) );

            this.getPaths(playerPosition, pieces);
            let isChanged: boolean = true;
            let indexesLength: number = this._indexes.length;
            
            while(isChanged) {
                for(let i = 0; i < this._indexes.length; i++) {
                    this.getPaths(this._indexes[i], pieces);
                }    
                
                isChanged = (this._indexes.length != indexesLength) ? true : false;
        
                if(isChanged) {
                    indexesLength = this._indexes.length;
                }
            }               
        }

        return this._paths;
    }

    clearPaths() : void {
        this._paths = [];
        this._indexes = [];
    }

    showPlayerPaths(pieces: MazePiece[], paths: MazePaths[], showPaths: boolean) : MazePiece[] {
        for(let i = 0; i < paths.length; i++) {
           let index: number = pieces.findIndex(item => item.row == paths[i].row && item.column == paths[i].column);

            if(index > -1) {
                let pieceNumber: number = pieces[index].pieceNumber;

                if(pieces[index].isFixed) {
                    pieces[index].pieceImage = (showPaths) ? this._pieceImages.getPiecesBrownPaths()[pieceNumber] : this._pieceImages.getPiecesBrown()[pieceNumber]
                } else {
                    pieces[index].pieceImage = (showPaths) ? this._pieceImages.getPiecesRedPaths()[pieceNumber] : this._pieceImages.getPiecesRed()[pieceNumber];
                }
            }
        }

        return pieces;
    }
    
    findShortestWay(pieces: MazePiece[], paths: MazePaths[], playerRow: number, playerColumn: number, targetRow: number, targetColumn: number) : number[][] {
        //Assume dimension 9 x 9
        let minSize: number = 0;
        let maxSize: number = 9;
        let matrix: number[][] = [[]];

        let _commonArrayFunctions: CommonArrayFunctions = new CommonArrayFunctions();

        for(let i = 0; i < maxSize; i++) {
            let numbers: number[] = _commonArrayFunctions.fillNumberArray(maxSize, 0, false);  
            matrix[i] = numbers;
        }

        for(let i = 0; i < paths.length; i++) {
            let row: number = paths[i].row;
            let column: number = paths[i].column;

            if(row >= minSize && row < maxSize && column >= 0 && column < maxSize) {
                matrix[row][column] = 1;
            }            
        }

        let start: number[] = [playerRow, playerColumn];
        let destination: number[] = [targetRow, targetColumn];

        matrix = this.removeDeadEndsFromMatrixSimpleMethod(matrix, start, destination);
        matrix = this.removeDeadEndsFromMatrixComplexMethod(pieces, matrix, start, destination);

        //Get path.
        let isNotAtDestination: boolean = true;
        let allPaths: number[][] = [];
        allPaths.push(start);

        while(isNotAtDestination) {  
            let lastPosition: number = allPaths.length - 1;
            let lastRow: number = allPaths[lastPosition][0];
            let lastColumn: number = allPaths[lastPosition][1];

            let isDestination: boolean = (lastRow == destination[0] && lastColumn == destination[1]) ? true : false;

            if(isDestination) {
                break;
            }

            //Mark last point as 'visited'
            matrix[lastRow][lastColumn] = 0;

            let entryFound: boolean = false;

            //Get priorities of direction.
            let priorities: number[] = this.getPrioritiesOfDirection(lastRow, lastColumn, destination); 

            for(let i = 0; i < priorities.length; i++) {
                if(priorities[i] == 0 && !entryFound) {
                    //North.
                    if (lastRow - 1 >= 0) {
                        if (matrix[lastRow - 1][lastColumn] == 1) {
                            entryFound = true;
                            let point: number[] = [lastRow - 1, lastColumn];
                            allPaths.push(point);
                        }
                    }
                }

                if(priorities[i] == 1 && !entryFound) {
                    //East
                    if (lastColumn + 1 < maxSize) {
                        if (matrix[lastRow][lastColumn + 1] == 1) {
                            entryFound = true;
                            let point: number[] = [lastRow, lastColumn + 1];
                            allPaths.push(point);
                        }
                    }
                }

                if(priorities[i] == 2 && !entryFound) {
                    //South.
                    if (lastRow + 1 < maxSize) {
                        if (matrix[lastRow + 1][lastColumn] == 1) {
                            entryFound = true;
                            let point: number[] = [lastRow + 1, lastColumn];
                            allPaths.push(point);
                        }
                    }
                }

                if(priorities[i] == 3 && !entryFound) {
                    //West
                    if (lastColumn - 1 >= 0) {
                        if (matrix[lastRow][lastColumn - 1] == 1) {
                            entryFound = true;
                            let point: number[] = [lastRow, lastColumn - 1];
                            allPaths.push(point);
                        }
                    }
                }
            }

            isNotAtDestination = entryFound;
        }
        
        allPaths = this.checkOtherPlayersAtPath(pieces, allPaths);

        return allPaths;
    }

    private getPrioritiesOfDirection(row: number, column: number, destination: number[]) : number[] {
        let arr: number[] = new Array(4);       

        if(row <= destination[0]) {
            arr[0] = 0; //North
            arr[2] = 2; //South
        } else {
            arr[0] = 2; //South
            arr[2] = 0; //North
        }

        if(column >= destination[1]) {
            arr[1] = 1; //East
            arr[3] = 3; //West
        } else {
            arr[1] = 3; //West
            arr[3] = 1; //East
        }

         //Expirimental.
         let rowDifference: number = Math.abs(row - destination[0]);
         let columnDifference: number = Math.abs(column - destination[1]);

        if(columnDifference < rowDifference) {
            let _commonArrayFunctions: CommonArrayFunctions = new CommonArrayFunctions();
            arr = _commonArrayFunctions.swap(arr, 0, 1);
            arr = _commonArrayFunctions.swap(arr, 2, 3);
        }        

        return arr;
    }

    private checkOtherPlayersAtPath(pieces: MazePiece[], paths: number[][]) : number[][] {
        let checkedPaths: number[][] = [];

        for(let i = 0; i < paths.length; i++) {
            let foundIndex: number = pieces.findIndex(item => item.row == paths[i][0] && item.column == paths[i][1]);

            if(foundIndex > -1) {
                if(pieces[foundIndex].player == -1) {
                    checkedPaths.push(paths[i]);
                }
            }
        }

        return checkedPaths;
    }

    private removeDeadEndsFromMatrixSimpleMethod(matrix: number[][], start: number[], destination: number[]) : number[][] {
        let hasDeadEnds: boolean = true;

        while(hasDeadEnds) {
            let deadEndsCounted: number = 0;

            for(let i = 0; i < matrix.length; i++) {
                for(let j = 0; j < matrix[i].length; j++) {
                    let isStart: boolean = (i == start[0] && j == start[1]) ? true : false;
                    let isDestination: boolean = (i == destination[0] && j == destination[1]) ? true : false;

                    if(!isStart && !isDestination && matrix[i][j] == 1) {
                        let entryPoints: number = 0;

                        //above.
                        if(i - 1 >= 0) {
                            if(matrix[i - 1][j] == 1) {
                                entryPoints++;
                            }
                        }

                        //right
                        if(j + 1 < matrix[i].length) {
                            if(matrix[i][j + 1] == 1) {
                                entryPoints++;
                            }
                        }

                        //below
                        if(i + 1 < matrix.length) {
                            if(matrix[i + 1][j] == 1) {
                                entryPoints++;
                            }
                        }

                        //left
                        if(j - 1 >= 0) {
                            if(matrix[i][j - 1] == 1) {
                                entryPoints++;
                            }
                        }

                        if(entryPoints <= 1) {
                            matrix[i][j] = 0;
                            deadEndsCounted++;
                        }
                    }
                }
            }

            hasDeadEnds = (deadEndsCounted > 0) ? true : false;
        }

        return matrix;
    }

    private removeDeadEndsFromMatrixComplexMethod(pieces: MazePiece[], matrix: number[][], start: number[], destination: number[]) : number[][] {
        let hasDeadEnds: boolean = true;

        let innerComparisonPoints: number[][] =[
            [0, 2], //North -> South
            [1, 3], //East -> West
            [2, 0], //South -> North
            [3, 1]  //West -> East
        ];

        while(hasDeadEnds) {
            let deadEndsCounted: number = 0;

            for(let i = 0; i < matrix.length; i++) {
                for(let j = 0; j < matrix[i].length; j++) {
                    let isStart: boolean = (i == start[0] && j == start[1]) ? true : false;
                    let isDestination: boolean = (i == destination[0] && j == destination[1]) ? true : false;

                    if(!isStart && !isDestination && matrix[i][j] == 1) {
                        //Compare with entry points in maze.
                        let pieceIndex: number = pieces.findIndex(item => item.row == i && item.column == j);

                        if(pieceIndex > -1) {
                            let currentPieceNumber: number = pieces[pieceIndex].pieceNumber;
                            let currentOrientation: number = pieces[pieceIndex].orientation;
                            let currentEntryPoints: number[] | undefined = this.getEntries(currentPieceNumber, currentOrientation);

                            if(currentEntryPoints != undefined) {
                                let entryPoints: number = 0;

                                //Above. North connected with South?
                                if(i - 1 >= 0 && currentEntryPoints[0] == 1) {
                                    if(matrix[i - 1][j] == 1) {
                                        let adjacentPiece: number = pieces.findIndex(item => item.row == (i - 1) && item.column == j);
                                        
                                        if(adjacentPiece > -1) {
                                            let nextPieceNumber: number = pieces[adjacentPiece].pieceNumber;
                                            let nextOrientation: number = pieces[adjacentPiece].orientation;
                                            
                                            let nextEntryPoints: number[] | undefined = this.getEntries(nextPieceNumber, nextOrientation);

                                            if(nextEntryPoints != undefined) {
                                                let comparisonPoint1: number = innerComparisonPoints[0][0];
                                                let comparisonPoint2: number = innerComparisonPoints[0][1];

                                                if(currentEntryPoints[comparisonPoint1] == 1 && nextEntryPoints[comparisonPoint2] == 1) {
                                                    entryPoints++;
                                                }
                                            }
                                        }
                                    }
                                }

                                //Right. East connected with West?
                                if(j + 1 < matrix[i].length && currentEntryPoints[1] == 1) {
                                    if(matrix[i][j + 1] == 1) {
                                        let adjacentPiece: number = pieces.findIndex(item => item.row == i && item.column == (j + 1));
                                        
                                        if(adjacentPiece > -1) {
                                            let nextPieceNumber: number = pieces[adjacentPiece].pieceNumber;
                                            let nextOrientation: number = pieces[adjacentPiece].orientation;
                                            
                                            let nextEntryPoints: number[] | undefined = this.getEntries(nextPieceNumber, nextOrientation);

                                            if(nextEntryPoints != undefined) {
                                                let comparisonPoint1: number = innerComparisonPoints[1][0];
                                                let comparisonPoint2: number = innerComparisonPoints[1][1];

                                                if(currentEntryPoints[comparisonPoint1] == 1 && nextEntryPoints[comparisonPoint2] == 1) {
                                                    entryPoints++;
                                                }
                                            }
                                        }
                                    }
                                }

                                 //Below. South connected with North?
                                if(i + 1 < matrix.length && currentEntryPoints[2] == 1) {
                                    if(matrix[i + 1][j] == 1) {
                                        let adjacentPiece: number = pieces.findIndex(item => item.row == (i + 1) && item.column == j);

                                        if(adjacentPiece > -1) {
                                            let nextPieceNumber: number = pieces[adjacentPiece].pieceNumber;
                                            let nextOrientation: number = pieces[adjacentPiece].orientation;
                                            
                                            let nextEntryPoints: number[] | undefined = this.getEntries(nextPieceNumber, nextOrientation);

                                            if(nextEntryPoints != undefined) {
                                                let comparisonPoint1: number = innerComparisonPoints[2][0];
                                                let comparisonPoint2: number = innerComparisonPoints[2][1];

                                                if(currentEntryPoints[comparisonPoint1] == 1 && nextEntryPoints[comparisonPoint2] == 1) {
                                                    entryPoints++;
                                                }
                                            }
                                        }
                                    }
                                }

                                 //Left. West Connected with east.
                                if(j - 1 >= 0 && currentEntryPoints[3] == 1) {
                                    if(matrix[i][j - 1] == 1) {
                                        let adjacentPiece: number = pieces.findIndex(item => item.row == i && item.column == (j - 1));

                                        if(adjacentPiece > -1) {
                                            let nextPieceNumber: number = pieces[adjacentPiece].pieceNumber;
                                            let nextOrientation: number = pieces[adjacentPiece].orientation;
                                            
                                            let nextEntryPoints: number[] | undefined = this.getEntries(nextPieceNumber, nextOrientation);

                                            if(nextEntryPoints != undefined) {
                                                let comparisonPoint1: number = innerComparisonPoints[3][0];
                                                let comparisonPoint2: number = innerComparisonPoints[3][1];

                                                if(currentEntryPoints[comparisonPoint1] == 1 && nextEntryPoints[comparisonPoint2] == 1) {
                                                    entryPoints++;
                                                }
                                            }
                                        }
                                    }
                                }

                                if(entryPoints <= 1) {
                                    matrix[i][j] = 0;
                                    deadEndsCounted++;
                                }
                            }
                        }
                    }
                }
            }

            hasDeadEnds = (deadEndsCounted > 0) ? true : false;
        }

        return matrix;
    }

    private getPlayerPosition(player: number, pieces: MazePiece[]) : number {
        let index: number = pieces.findIndex(item => item.player == player);
        return index;
    }

    private getPaths(index: number, pieces: MazePiece[]) : void {

        let currentPieceNumber: number = pieces[index].pieceNumber;
        let currentOrientation: number = pieces[index].orientation;

        let currentRow: number = pieces[index].row;
        let currentColumn: number = pieces[index].column;

        let currentEntryPoints: number[] | undefined = this.getEntries(currentPieceNumber, currentOrientation);

        if(currentEntryPoints != undefined) {
            //North.
            if (currentEntryPoints[0] == 1) {
                let indexFound = this.getIndexOfPiece(currentRow - 1, currentColumn, pieces);
                let zeroOccurrences: number = this._indexes.indexOf(indexFound);

                if (indexFound > -1 && zeroOccurrences == -1) {
                    let nextPieceNumber: number = pieces[indexFound].pieceNumber;
                    let nextOrientation: number = pieces[indexFound].orientation;

                    let nextRow: number = pieces[indexFound].row;
                    let nextColumn: number = pieces[indexFound].column;

                    let nextEntryPoints: number[] | undefined = this.getEntries(nextPieceNumber, nextOrientation);

                    if (nextEntryPoints != undefined) {
                        if (nextEntryPoints[2] == 1) {
                            //South is open?
                            this.addToPaths(nextRow, nextColumn);
                            this._indexes.push(indexFound);
                        }
                    }
                }
            }

            //East
            if (currentEntryPoints[1] == 1) {
                let indexFound = this.getIndexOfPiece(currentRow, currentColumn + 1, pieces);
                let zeroOccurrences: number = this._indexes.indexOf(indexFound);

                if (indexFound > -1 && zeroOccurrences == -1) {
                    let nextPieceNumber: number = pieces[indexFound].pieceNumber;
                    let nextOrientation: number = pieces[indexFound].orientation;

                    let nextRow: number = pieces[indexFound].row;
                    let nextColumn: number = pieces[indexFound].column;

                    let nextEntryPoints: number[] | undefined = this.getEntries(nextPieceNumber, nextOrientation);

                    if (nextEntryPoints != undefined) {
                        if (nextEntryPoints[3] == 1) {
                            //West is open?
                            //this._paths.push( new MazePaths( nextRow, nextColumn ) );
                            this.addToPaths(nextRow, nextColumn);
                            this._indexes.push(indexFound);
                        }
                    }
                }
            }

            //South
            if (currentEntryPoints[2] == 1) {
                let indexFound = this.getIndexOfPiece(currentRow + 1, currentColumn, pieces);
                let zeroOccurrences: number = this._indexes.indexOf(indexFound);

                if (indexFound > -1 && zeroOccurrences == -1) {
                    let nextPieceNumber: number = pieces[indexFound].pieceNumber;
                    let nextOrientation: number = pieces[indexFound].orientation;

                    let nextRow: number = pieces[indexFound].row;
                    let nextColumn: number = pieces[indexFound].column;

                    let nextEntryPoints: number[] | undefined = this.getEntries(nextPieceNumber, nextOrientation);

                    if (nextEntryPoints != undefined) {
                        if (nextEntryPoints[0] == 1) {
                            //North is open?
                            //this._paths.push( new MazePaths( nextRow, nextColumn ) );
                            this.addToPaths(nextRow, nextColumn);
                            this._indexes.push(indexFound);
                        }
                    }
                }
            }

            //West
            if (currentEntryPoints[3] == 1) {
                let indexFound = this.getIndexOfPiece(currentRow, currentColumn - 1, pieces);
                let zeroOccurrences: number = this._indexes.indexOf(indexFound);

                if (indexFound > -1 && zeroOccurrences == -1) {
                    let nextPieceNumber: number = pieces[indexFound].pieceNumber;
                    let nextOrientation: number = pieces[indexFound].orientation;

                    let nextRow: number = pieces[indexFound].row;
                    let nextColumn: number = pieces[indexFound].column;

                    let nextEntryPoints: number[] | undefined = this.getEntries(nextPieceNumber, nextOrientation);

                    if (nextEntryPoints != undefined) {
                        if (nextEntryPoints[1] == 1) {
                            //East is open?
                            this.addToPaths(nextRow, nextColumn);
                            this._indexes.push(indexFound);
                        }
                    }
                }
            }
        }
    }

    private getIndexOfPiece(row: number, column: number, pieces: MazePiece[]) : number {
        let index: number = pieces.findIndex(item => item.row == row && item.column == column)
        return index;
    }

    private addToPaths(row: number, column: number) : void {
        let index: number = this._paths.findIndex(item => item.row == row && item.column == column);

        if(index == -1) {
            this._paths.push( new MazePaths( row, column ) );
        }        
    }

}