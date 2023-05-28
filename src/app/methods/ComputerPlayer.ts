import { Controls } from "./Controls";
import { MazePiece } from "../models/MazePiece";
import { MazePaths } from "../models/MazePaths";
import { RandomNumbers } from "../shared_methods/RandomNumbers";
import { ComputerInsert } from "../models/ComputerInsert";
import { ComputerMove } from "../models/ComputerMove";

export class ComputerPlayer extends Controls {
    
    private _randomNumbers: RandomNumbers = new RandomNumbers();

    private _fixedRowAndColumnIndexes: number[] = [1, 3, 5, 7];

    computerInsertCalculation(pieces: MazePiece[], currentPiece: MazePiece, computerPlayer: number) : ComputerInsert {
        //Data to return.
        let isColumn: boolean = false;
        let target: number = -1;
        let orientation: number = -1;
        let isTopOrLeft: boolean = false;

        //Get current paths.
        let currentPaths: MazePaths[] = this.search(computerPlayer, pieces);

        //Some checks.
        let isComputerAtBoard: boolean = (currentPiece.player == computerPlayer) ? false : true;
        let treasureAtPiece: boolean = (currentPiece.hasTreasure && currentPiece.treasureForPlayer == computerPlayer) ? true : false;
        let isTreasureAtCurrentPath: boolean = false;

        if(currentPaths.length > 0 && !treasureAtPiece) {
            let indexOfTreasure = pieces.findIndex(item => item.treasureForPlayer == computerPlayer);
            let treasurePiece: MazePiece = pieces[indexOfTreasure];

            let treasureFoundIndex: number = currentPaths.findIndex(item => item.row == treasurePiece.row && item.column == treasurePiece.column);  
            isTreasureAtCurrentPath = (treasureFoundIndex > -1) ? true : false;
        }
        
        if(isComputerAtBoard && isTreasureAtCurrentPath && !treasureAtPiece) {
            //Treasure is at path.
            let indexOfTreasure = pieces.findIndex(item => item.treasureForPlayer == computerPlayer);
            let treasurePiece: MazePiece = pieces[indexOfTreasure];

            //Generate random insert.
            let rowOrColum: number = this._randomNumbers.generateRandomNumber(0, 2);
            let randomTopOrLeft: number = this._randomNumbers.generateRandomNumber(0, 2);
            let randomInsert: number = (rowOrColum == 0) ? this.generateNumberWithSkip(treasurePiece.row) : this.generateNumberWithSkip(treasurePiece.column);
           
            isColumn = (rowOrColum == 0) ? false : true;
            target = this._fixedRowAndColumnIndexes[randomInsert];
            orientation = this._randomNumbers.generateRandomNumber(0, 4);
            isTopOrLeft = (randomTopOrLeft == 0) ? true : false;
        }

        if(isComputerAtBoard && !isTreasureAtCurrentPath && treasureAtPiece) {
            //Search best insert -> when treasure is at insert piece.
            let bestInserts: MazePaths[] = [];

            let allDummies: MazePiece[] = structuredClone(pieces);

            //Traverse row + columns.
            for(let i = 0; i < 2; i++) {
                let testRows: boolean = (i == 0) ? true : false;

                 //Test orientations.
                 for(let j = 0; j < 4; j++) {

                    //test top-left or bottom-right
                    for(let k = 0; k < 2; k++) {
                        let isTopOrLeft: boolean = (k == 0) ? true : false;

                        //Test indexes of rows and columns.
                        for(let m = 0; m < this._fixedRowAndColumnIndexes.length; m++) {
                            let dummyPieces: MazePiece[] = allDummies;
                            let dummyInsertPiece: MazePiece = currentPiece;
                            dummyInsertPiece.orientation = j;

                            //Test.
                            dummyPieces = this.insert(dummyPieces, dummyInsertPiece, testRows, isTopOrLeft, this._fixedRowAndColumnIndexes[m], true);
                            dummyInsertPiece = this.getDummyCurrentPiece(); //Any use?

                            let indexOfTreasure = dummyPieces.findIndex(item => item.treasureForPlayer == computerPlayer);

                            //Additional check -> is treasure still in the maze?
                            if(indexOfTreasure > -1) {
                                let treasurePiece: MazePiece = dummyPieces[indexOfTreasure];

                                let possiblePaths: MazePaths[] = this.search(computerPlayer, dummyPieces);
                                let differences: number[] = this.calculateDistances(possiblePaths, treasurePiece.row, treasurePiece.column);
                                let lowestNumber: number = (differences.length > 0) ? Math.min(...differences) : 999;

                                if(lowestNumber < 999) {
                                    let lowestNumberIndexes: number[] = this.getLowestNumberIndexes(differences, lowestNumber);

                                    for(let n = 0; n < lowestNumberIndexes.length; n++) {
                                        let index: number = lowestNumberIndexes[n];
                                        let goodPath: MazePaths = possiblePaths[index];
                                        goodPath.total = lowestNumber;

                                        let foundIndex: number = bestInserts.findIndex(item => item.row == goodPath.row && item.column == goodPath.column && item.total == goodPath.total);

                                        if(foundIndex == -1) {
                                            goodPath.total = lowestNumber;
                                            goodPath.isRow = testRows;
                                            goodPath.insertAt = this._fixedRowAndColumnIndexes[m];
                                            goodPath.orientations = j;
                                            goodPath.isTopOrLeft = isTopOrLeft;
                                            bestInserts.push(goodPath);
                                        }                                    
                                    }
                                }
                            }
                        }
                    }
                 }
            }

            if(bestInserts.length > 0) {
                let bestChoise: MazePaths = this.searchBestInsert(bestInserts);

                isColumn = !bestChoise.isRow ?? false;
                target = bestChoise.insertAt ?? this._fixedRowAndColumnIndexes[0];
                orientation = bestChoise.orientations ?? 0;
                isTopOrLeft = bestChoise.isTopOrLeft ?? false;
            } else {
                isColumn = false;
                target = 1;
                orientation = 0;
                isTopOrLeft = false;
            } 
        }

        if( (isComputerAtBoard && !isTreasureAtCurrentPath && !treasureAtPiece) || (!isComputerAtBoard && !isTreasureAtCurrentPath && !treasureAtPiece) ) {
           let bestInserts: MazePaths[] = [];

            let allDummies: MazePiece[] = structuredClone(pieces);

            //Traverse row + columns.
            for(let i = 0; i < 2; i++) {
                let testRows: boolean = (i == 0) ? true : false;
                
                //Test orientations.
                for(let j = 0; j < 4; j++) {

                    //test top-left or bottom-right
                    for(let k = 0; k < 2; k++) {
                        let isTopOrLeft: boolean = (k == 0) ? true : false;

                        //Test indexes of rows and columns.
                        for(let m = 0; m < this._fixedRowAndColumnIndexes.length; m++) {
                            let dummyPieces: MazePiece[] = allDummies;
                            let dummyInsertPiece: MazePiece = currentPiece;
                            dummyInsertPiece.orientation = j;

                            //Test.
                            dummyPieces = this.insert(dummyPieces, dummyInsertPiece, testRows, isTopOrLeft, this._fixedRowAndColumnIndexes[m], true);
                            dummyInsertPiece = this.getDummyCurrentPiece(); //Any use?

                            //Bug-fix : after insert the place of treasure can be changed - even pushed out the maze again!                            
                            let indexOfTreasure = pieces.findIndex(item => item.treasureForPlayer == computerPlayer);

                            if(indexOfTreasure > -1) {
                                let treasurePiece: MazePiece = pieces[indexOfTreasure];
                                let treasureRow: number = treasurePiece.row;
                                let treasureColumn: number = treasurePiece.column;

                                let possiblePaths: MazePaths[] = this.search(computerPlayer, dummyPieces);
                                let differences: number[] = this.calculateDistances(possiblePaths, treasureRow, treasureColumn);
                                let lowestNumber: number = (differences.length > 0) ? Math.min(...differences) : 999;

                                if(lowestNumber < 999) {
                                    let lowestNumberIndexes: number[] = this.getLowestNumberIndexes(differences, lowestNumber);

                                    for(let n = 0; n < lowestNumberIndexes.length; n++) {
                                        let index: number = lowestNumberIndexes[n];
                                        let goodPath: MazePaths = possiblePaths[index];
                                        goodPath.total = lowestNumber;

                                        let foundIndex: number = bestInserts.findIndex(item => item.row == goodPath.row && item.column == goodPath.column && item.total == goodPath.total);

                                        if(foundIndex == -1) {
                                            goodPath.total = lowestNumber;
                                            goodPath.isRow = testRows;
                                            goodPath.insertAt = this._fixedRowAndColumnIndexes[m];
                                            goodPath.orientations = j;
                                            goodPath.isTopOrLeft = isTopOrLeft;
                                            bestInserts.push(goodPath);
                                        }                                    
                                    }
                                }
                            }
                        }
                    }
                }
            }

            if(bestInserts.length > 0) {
                let bestChoise: MazePaths = this.searchBestInsert(bestInserts);

                isColumn = !bestChoise.isRow ?? false;
                target = bestChoise.insertAt ?? this._fixedRowAndColumnIndexes[0];
                orientation = bestChoise.orientations ?? 0;
                isTopOrLeft = bestChoise.isTopOrLeft ?? false;
            } else {
                isColumn = false;
                target = 1;
                orientation = 0;
                isTopOrLeft = false;
            }            
        }

        return new ComputerInsert(isColumn, target, orientation, isTopOrLeft);
    }

    computerMoveCalculation(pieces: MazePiece[], currentPiece: MazePiece, computerPlayer: number) : ComputerMove {
        let isComputerAtBoard: boolean = (currentPiece.player == computerPlayer) ? false : true;
        let treasureAtPiece: boolean = (currentPiece.hasTreasure && currentPiece.treasureForPlayer == computerPlayer) ? true : false;

        let canMove: boolean = true;
        let row: number = -1;
        let column: number = -1;

        if(!isComputerAtBoard || treasureAtPiece) {
            //Cant move.
            canMove = false;
        } else {
            let filteredPieces: MazePiece[] = structuredClone(pieces);

            let indexOfPlayer: number = filteredPieces.findIndex(item => item.player == computerPlayer);
            let pieceOfPlayer: MazePiece = filteredPieces[indexOfPlayer];
            
            let indexOfTreasure: number = filteredPieces.findIndex(item => item.treasureForPlayer == computerPlayer);
            let treasurePiece: MazePiece = filteredPieces[indexOfTreasure];    

            let currentPaths: MazePaths[] = this.search(computerPlayer, filteredPieces);
            currentPaths = this.filterPaths(pieces, currentPaths, computerPlayer);

            let distances: number[] = this.calculateDistances(currentPaths, treasurePiece.row, treasurePiece.column);

            let lowestDistance: number = Math.min(...distances);
            let indexLowestDistance: number = distances.indexOf(lowestDistance);

            if (currentPaths.length > 0 && indexLowestDistance > -1) {
                if (pieceOfPlayer.row !== currentPaths[indexLowestDistance].row || pieceOfPlayer.column !== currentPaths[indexLowestDistance].column) {
                    row = currentPaths[indexLowestDistance].row;
                    column = currentPaths[indexLowestDistance].column;
                } else {
                    canMove = false;
                }
            } else {
                canMove = false;
            }
        }

        return new ComputerMove(canMove, row, column);
    }
     
    private calculateDistances(possiblePaths: MazePaths[], treasureRow: number, treasureColumn: number) : number[] {
        let arr: number[] = [];

        for(let i = 0; i < possiblePaths.length; i++) {
            let calculated: number = Math.abs(possiblePaths[i].row - treasureRow) + Math.abs(possiblePaths[i].column - treasureColumn);
            arr.push(calculated);
        }

        return arr;
    }

    private searchBestInsert(bestInserts: MazePaths[]) : MazePaths {
        let totals: number[] = [];

        bestInserts.forEach(item => {
            totals.push( item.total ?? 999 );
        });

        let lowestNumber: number = Math.min(...totals);

        let bestChoice: MazePaths | undefined = bestInserts.find(item => item.total == lowestNumber);

        if(bestChoice !== undefined) {
            return bestChoice;
        }

        return bestInserts[0];
    }

    private getLowestNumberIndexes(differences: number[], searchFor: number) : number[] {
        let arr: number[] = [];

        for(let i = 0; i < differences.length; i++) {
            if(differences[i] == searchFor) {
                arr.push(i);
            }
        }

        return arr;
    }

    private filterPaths(pieces: MazePiece[], paths: MazePaths[], player: number) : MazePaths[] {
        let filtered: MazePaths[] = [];

        for(let i = 0; i < paths.length; i++) {
            let currentPath: MazePaths = paths[i];
            let currentRow: number = currentPath.row;
            let currentColumn: number = currentPath.column;

            let foundIndex: number = pieces.findIndex(item => item.row == currentRow && item.column == currentColumn);

            if(foundIndex > -1) {
                if(pieces[foundIndex].player == -1) {
                    filtered.push(currentPath);
                } else {
                    if(pieces[foundIndex].player == player) {
                        filtered.push(currentPath);
                    }
                }
            }
        }

        return filtered;
    }

    private generateNumberWithSkip(skipNumber: number) : number {
        let randomInsert: number = this._randomNumbers.generateRandomNumber(0, this._fixedRowAndColumnIndexes.length);

        while (this._fixedRowAndColumnIndexes[randomInsert] == skipNumber) {
            randomInsert = this._randomNumbers.generateRandomNumber(0, this._fixedRowAndColumnIndexes.length);
        }

        return randomInsert;
    }

}