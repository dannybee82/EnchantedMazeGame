import { MazePaths } from "../models/MazePaths";
import { MazePiece } from "../models/MazePiece";
import { PiecesEntryPoints } from "./PiecesEntryPoints";

export class Matrix extends PiecesEntryPoints {

    createAndFillMatrix(paths: MazePaths[], sizeX: number, sizeY: number) : number[][] {
        let matrix: number[][] = [];

        for(let i = 0; i < sizeY; i++) {
            let numbers: number[] = this.commonArrayFunctions.fillNumberArray(sizeX, 0, false);  
            matrix[i] = numbers;
        }

        for(let i = 0; i < paths.length; i++) {
            let row: number = paths[i].row;
            let column: number = paths[i].column;

            if(row < sizeY && column < sizeX) {
                matrix[row][column] = 1;
            }            
        }

        return matrix;
    }

    removeDeadEndsFromMatrixSimpleMethod(matrix: number[][], start: number[], destination: number[]) : number[][] {
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

    removeDeadEndsFromMatrixComplexMethod(pieces: MazePiece[], matrix: number[][], start: number[], destination: number[]) : number[][] {
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

}