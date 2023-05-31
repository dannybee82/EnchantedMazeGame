import { MazePiece } from "../models/MazePiece";
import { MazePaths } from "../models/MazePaths";
import { PieceImages } from "./PieceImages";
import { Matrix } from "./Matrix";

export class SearchMazePath extends Matrix {

    private _paths: MazePaths[] = [];
    private _indexes: number[] = [];

    private _pieceImages: PieceImages = new PieceImages();

    search(player: number, pieces: MazePiece[]): MazePaths[] {
        this.clearPaths();

        let playerPosition: number = this.findIndexOfPlayer(pieces, player);

        if (playerPosition > -1) {
            this._paths.push(new MazePaths(pieces[playerPosition].row, pieces[playerPosition].column));

            this.getPaths(playerPosition, pieces);
            let isChanged: boolean = true;
            let indexesLength: number = this._indexes.length;

            while (isChanged) {
                for (let i = 0; i < this._indexes.length; i++) {
                    this.getPaths(this._indexes[i], pieces);
                }

                isChanged = (this._indexes.length != indexesLength) ? true : false;

                if (isChanged) {
                    indexesLength = this._indexes.length;
                }
            }
        }

        return this._paths;
    }

    clearPaths(): void {
        this._paths = [];
        this._indexes = [];
    }

    showPlayerPaths(pieces: MazePiece[], paths: MazePaths[], showPaths: boolean): MazePiece[] {
        for (let i = 0; i < paths.length; i++) {
            let index: number = pieces.findIndex(item => item.row == paths[i].row && item.column == paths[i].column);

            if (index > -1) {
                let pieceNumber: number = pieces[index].pieceNumber;

                if (pieces[index].isFixed) {
                    pieces[index].pieceImage = (showPaths) ? this._pieceImages.getPiecesBrownPaths()[pieceNumber] : this._pieceImages.getPiecesBrown()[pieceNumber]
                } else {
                    pieces[index].pieceImage = (showPaths) ? this._pieceImages.getPiecesRedPaths()[pieceNumber] : this._pieceImages.getPiecesRed()[pieceNumber];
                }
            }
        }

        return pieces;
    }

    findShortestWay(pieces: MazePiece[], paths: MazePaths[], playerRow: number, playerColumn: number, destinationRow: number, destinationColumn: number): number[][] {
        let sizeAxisX: number = this.defaultSizeAxisX;
        let sizeAxisY: number = this.defaultSizeAxisY;
        let matrix: number[][] = this.createAndFillMatrix(paths, sizeAxisX, sizeAxisY);

        let start: number[] = [playerRow, playerColumn];
        let destination: number[] = [destinationRow, destinationColumn];

        matrix = this.removeDeadEndsFromMatrixSimpleMethod(matrix, start, destination);
        matrix = this.removeDeadEndsFromMatrixComplexMethod(pieces, matrix, start, destination);

        //Get path.
        let isNotAtDestination: boolean = true;
        let allPaths: number[][] = [];
        allPaths.push(start);

        isNotAtDestination = this.checkStartAndDestinationNotAdjacent(start, destination);

        if (!isNotAtDestination) {
            allPaths.push(destination);
        }

        while (isNotAtDestination) {
            let lastPosition: number = allPaths.length - 1;
            let lastRow: number = allPaths[lastPosition][0];
            let lastColumn: number = allPaths[lastPosition][1];

            let isDestination: boolean = (lastRow == destination[0] && lastColumn == destination[1]) ? true : false;

            if (isDestination) {
                break;
            }

            //Mark last point as 'visited'
            matrix[lastRow][lastColumn] = 0;

            let entryFound: boolean = false;

            //Get priorities of direction.
            let priorities: number[] = this.getPrioritiesOfDirection(lastRow, lastColumn, destination);

            for (let i = 0; i < priorities.length; i++) {
                if (priorities[i] == 0 && !entryFound) {
                    //North.
                    if (lastRow - 1 >= 0) {
                        if (matrix[lastRow - 1][lastColumn] == 1) {
                            entryFound = true;
                            let point: number[] = [lastRow - 1, lastColumn];
                            allPaths.push(point);
                        }
                    }
                }

                if (priorities[i] == 1 && !entryFound) {
                    //East
                    if (lastColumn + 1 < sizeAxisX) {
                        if (matrix[lastRow][lastColumn + 1] == 1) {
                            entryFound = true;
                            let point: number[] = [lastRow, lastColumn + 1];
                            allPaths.push(point);
                        }
                    }
                }

                if (priorities[i] == 2 && !entryFound) {
                    //South.
                    if (lastRow + 1 < sizeAxisY) {
                        if (matrix[lastRow + 1][lastColumn] == 1) {
                            entryFound = true;
                            let point: number[] = [lastRow + 1, lastColumn];
                            allPaths.push(point);
                        }
                    }
                }

                if (priorities[i] == 3 && !entryFound) {
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

    private getPrioritiesOfDirection(row: number, column: number, destination: number[]): number[] {
        let arr: number[] = new Array(4);

        let rowDistance: number = row - destination[0];
        let columnDistance: number = column - destination[1];

        if (rowDistance > 0) {
            arr[0] = 0; //North
            arr[2] = 2; //South
        } else if(rowDistance < 0) {
            arr[0] = 2; //South
            arr[2] = 0; //North
        }

        if (columnDistance < 0) {
            arr[1] = 1; //East
            arr[3] = 3; //West
        } else if(columnDistance > 0) {
            arr[1] = 3; //West
            arr[3] = 1; //East
        }

        if(rowDistance == 0 && columnDistance != 0) {
            arr[0] = (columnDistance < 0) ? 1 : 3;
            arr[1] = (columnDistance > 0) ? 1 : 3;
            arr[2] = 0;
            arr[3] = 2;
        } else if(rowDistance != 0 && columnDistance == 0) {
            arr[0] = (rowDistance > 0) ? 0 : 2;
            arr[1] = (rowDistance < 0) ? 0 : 2;
            arr[2] = 1;
            arr[3] = 3;
        } else if(rowDistance == 0 && columnDistance == 0) {
            //Default.
            arr = this.commonArrayFunctions.fillNumberArray(4, 0, true);
        }

        return arr;
    }

    private checkOtherPlayersAtPath(pieces: MazePiece[], paths: number[][]): number[][] {
        let checkedPaths: number[][] = [];
        checkedPaths.push(paths[0]);

        for (let i = 1; i < paths.length; i++) {
            let foundIndex: number = this.findIndexOfPiece(pieces, paths[i][0], paths[i][1]);

            if (foundIndex > -1) {
                if (pieces[foundIndex].player == -1) {
                    checkedPaths.push(paths[i]);
                }
            }
        }

        return checkedPaths;
    }

    private getPaths(index: number, pieces: MazePiece[]): void {
        let currentPieceNumber: number = pieces[index].pieceNumber;
        let currentOrientation: number = pieces[index].orientation;

        let currentRow: number = pieces[index].row;
        let currentColumn: number = pieces[index].column;

        let currentEntryPoints: number[] | undefined = this.getEntries(currentPieceNumber, currentOrientation);

        if (currentEntryPoints != undefined) {
            //North.
            if (currentEntryPoints[0] == 1) {
                let indexFound = this.findIndexOfPiece(pieces, currentRow - 1, currentColumn);
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
                let indexFound = this.findIndexOfPiece(pieces, currentRow, currentColumn + 1);
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
                let indexFound = this.findIndexOfPiece(pieces, currentRow + 1, currentColumn);
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
                let indexFound = this.findIndexOfPiece(pieces, currentRow, currentColumn - 1);
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

    private addToPaths(row: number, column: number): void {
        let index: number = this._paths.findIndex(item => item.row == row && item.column == column);

        if (index == -1) {
            this._paths.push(new MazePaths(row, column));
        }
    }

    private checkStartAndDestinationNotAdjacent(start: number[], destination: number[]) {
        if ((start[0] - 1) == destination[0] && start[1] == destination[1]) {
            //Above?
            return false;
        }

        if (start[0] == destination[0] && (start[1] + 1) == destination[1]) {
            //Right
            return false;
        }

        if ((start[0] + 1) == destination[0] && start[1] == destination[1]) {
            //below?
            return false;
        }

        if (start[0] == destination[0] && (start[1] - 1) == destination[1]) {
            //Left
            return false;
        }

        return true;
    }

}