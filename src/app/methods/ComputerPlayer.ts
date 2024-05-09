import { Controls } from "./Controls";
import { MazePiece } from "../models/maze-piece.interface";
import { MazePaths } from "../models/maze-paths.interface";
import { ComputerInsert } from "../models/computer-insert.interface";
import { ComputerMove } from "../models/computer-move.interface";

export class ComputerPlayer extends Controls {

    computerInsertCalculation(pieces: MazePiece[], currentPiece: MazePiece, computerPlayer: number, fixedRowAndColumnIndexes: number[]) : ComputerInsert {
        //Data to return.
        let isInsertAxisY: boolean = false;
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
            let rowOrColum: number = this.randomNumbers.generateRandomNumber(0, 2);
            let randomTopOrLeft: number = this.randomNumbers.generateRandomNumber(0, 2);
            let randomInsert: number = (rowOrColum == 0) ? this.generateNumberWithSkip(treasurePiece.row, fixedRowAndColumnIndexes) : this.generateNumberWithSkip(treasurePiece.column, fixedRowAndColumnIndexes);
           
            isInsertAxisY = (rowOrColum == 0) ? false : true;
            target = fixedRowAndColumnIndexes[randomInsert];
            orientation = this.randomNumbers.generateRandomNumber(0, 4);
            isTopOrLeft = (randomTopOrLeft == 0) ? true : false;
        }

        if(isComputerAtBoard && !isTreasureAtCurrentPath && treasureAtPiece) {
            //Search best insert -> when treasure is at insert piece.
            let bestInserts: MazePaths[] = [];

            //Traverse row + columns [Y-Axis and X-Axis].
            for(let i = 0; i < 2; i++) {
                let isAxisY: boolean = (i == 0) ? true : false;

                 //Test orientations. TODO: improvement here -> entry points [!!!]
                 for(let j = 0; j < 4; j++) {

                    //test top-left or bottom-right
                    for(let k = 0; k < 2; k++) {
                        let isTopOrLeft: boolean = (k == 0) ? true : false;

                        //Test indexes of rows and columns.
                        for(let m = 0; m < fixedRowAndColumnIndexes.length; m++) {
                            let dummyPieces: MazePiece[] = structuredClone(pieces);
                            let dummyInsertPiece: MazePiece = currentPiece;
                            dummyInsertPiece.orientation = j;

                            //Test.
                            dummyPieces = this.insert(dummyPieces, dummyInsertPiece, isAxisY, isTopOrLeft, fixedRowAndColumnIndexes[m], true);
                            dummyInsertPiece = this.getDummyCurrentPiece(); //Any use?
                            let indexOfTreasure = dummyPieces.findIndex(item => item.treasureForPlayer == computerPlayer);

                            //Additional check -> is treasure still in the maze?
                            if(indexOfTreasure > -1) {
                                let possiblePaths: MazePaths[] = this.search(computerPlayer, dummyPieces);

                                let treasurePiece: MazePiece = dummyPieces[indexOfTreasure];
                                
                                let differences: number[] = this.calculateDistances(possiblePaths, treasurePiece.row, treasurePiece.column);
                                let lowestNumber: number = (differences.length > 0) ? Math.min(...differences) : 999;

                                if (lowestNumber < 999) {
                                    let lowestNumberIndexes: number[] = this.getLowestNumberIndexes(differences, lowestNumber);

                                    for (let n = 0; n < lowestNumberIndexes.length; n++) {
                                        let index: number = lowestNumberIndexes[n];
                                        let goodPath: MazePaths = possiblePaths[index];
                                        goodPath.total = lowestNumber;

                                        let foundIndex: number = bestInserts.findIndex(item => item.row == goodPath.row && item.column == goodPath.column && item.total == goodPath.total);

                                        if (foundIndex == -1) {
                                            goodPath.total = lowestNumber;
                                            goodPath.isInsertAxisY = isAxisY;
                                            goodPath.insertAt = fixedRowAndColumnIndexes[m];
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

                isInsertAxisY = bestChoise.isInsertAxisY ?? false;
                target = bestChoise.insertAt ?? fixedRowAndColumnIndexes[0];
                orientation = bestChoise.orientations ?? 0;
                isTopOrLeft = bestChoise.isTopOrLeft ?? false;
            } else {
                isInsertAxisY = false;
                target = 1;
                orientation = 0;
                isTopOrLeft = false;
            } 
        }

        if( (isComputerAtBoard && !isTreasureAtCurrentPath && !treasureAtPiece) || (!isComputerAtBoard && !isTreasureAtCurrentPath && !treasureAtPiece) ) {
            let bestInserts: MazePaths[] = [];

            //Traverse row + columns.
            for(let i = 0; i < 2; i++) {
                let isAxisY: boolean = (i == 0) ? true : false;
                
                //Test orientations.
                for(let j = 0; j < 4; j++) {

                    //test top-left or bottom-right
                    for(let k = 0; k < 2; k++) {
                        let isTopOrLeft: boolean = (k == 0) ? true : false;

                        //Test indexes of rows and columns.
                        for(let m = 0; m < fixedRowAndColumnIndexes.length; m++) {
                            let dummyPieces: MazePiece[] = structuredClone(pieces);
                            let dummyInsertPiece: MazePiece = currentPiece;
                            dummyInsertPiece.orientation = j;

                            //Test.
                            dummyPieces = this.insert(dummyPieces, dummyInsertPiece, isAxisY, isTopOrLeft, fixedRowAndColumnIndexes[m], true);
                            dummyInsertPiece = this.getDummyCurrentPiece(); //Any use?

                            //Bug-fix : after insert the place of treasure can be changed - even pushed out the maze again!                            
                            let indexOfTreasure = dummyPieces.findIndex(item => item.treasureForPlayer == computerPlayer);

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
                                            goodPath.isInsertAxisY = isAxisY;
                                            goodPath.insertAt = fixedRowAndColumnIndexes[m];
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
                
                isInsertAxisY = bestChoise.isInsertAxisY ?? false;
                target = bestChoise.insertAt ?? fixedRowAndColumnIndexes[0];
                orientation = bestChoise.orientations ?? 0;
                isTopOrLeft = bestChoise.isTopOrLeft ?? false;
            } else {
                isInsertAxisY = false;
                target = 1;
                orientation = 0;
                isTopOrLeft = false;
            }            
        }

        const computerInsert: ComputerInsert = {
            insertAxisY: isInsertAxisY,
            rowOrColumnIndex: target,
            orientation: orientation,
            isTopOrLeft: isTopOrLeft
        };
        return computerInsert;
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

        const computerMove: ComputerMove = {
            canMove: canMove,
            row: row,
            column: column
        }
        return computerMove;
    }
     
    private calculateDistances(possiblePaths: MazePaths[], treasureRow: number, treasureColumn: number) : number[] {
        let arr: number[] = [];

        if(possiblePaths.length > 0) {
            for(let i = 0; i < possiblePaths.length; i++) {
                let calculated: number = Math.abs(possiblePaths[i].row - treasureRow) + Math.abs(possiblePaths[i].column - treasureColumn);
                arr.push(calculated);
            }
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
                if(pieces[foundIndex].player == -1 || pieces[foundIndex].player == player) {
                    filtered.push(currentPath);
                }
            }
        }

        return filtered;
    }

    private generateNumberWithSkip(skipNumber: number, fixedRowAndColumnIndexes: number[]) : number {
        let randomInsert: number = this.randomNumbers.generateRandomNumber(0, fixedRowAndColumnIndexes.length);

        while (fixedRowAndColumnIndexes[randomInsert] == skipNumber) {
            randomInsert = this.randomNumbers.generateRandomNumber(0, fixedRowAndColumnIndexes.length);
        }

        return randomInsert;
    }

}