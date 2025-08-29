import { ComputerPlayer } from "./ComputerPlayer";
import { MazePiece } from "../models/maze-piece.interface";
import { PieceImages } from "./PieceImages";
import { ComputerInsert } from "../models/computer-insert.interface";
import { ComputerMove } from "../models/computer-move.interface";
import { MazePaths } from "../models/maze-paths.interface";

describe('Class ComputerPlayer', () => {

    let testClass: ComputerPlayer = new ComputerPlayer();

    let _images: PieceImages = new PieceImages();

    //Create a simple test maze. 3 x 3 with treasure in middle.
    //[!] Important: give the pieces a row and index number [!]
    let testMaze001: MazePiece[] = [
        //Player: 0 here.
        { row: 0, column: 0, pieceImage:  _images.getPiecesRed()[3], pieceNumber: 3, orientation: 1, isFixed:  false, player: 0, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 
        { row: 0, column: 1, pieceImage:  _images.getPiecesRed()[0], pieceNumber: 0, orientation: 1, isFixed:  false, player: -1, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 
        { row: 0, column: 2, pieceImage:  _images.getPiecesRed()[3], pieceNumber: 3, orientation: 2, isFixed:  false, player: -1, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 

        { row: 1, column: 0, pieceImage:  _images.getPiecesRed()[2], pieceNumber: 2, orientation: 0, isFixed:  false, player: -1, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 
        { row: 1, column: 1, pieceImage:  _images.getPiecesRed()[0], pieceNumber: 0, orientation: 1, isFixed:  false, player: -1, hasTreasure:  true, treasureForPlayer: 0, treasureImage: 'Treasure Here' }, 
        { row: 1, column: 2, pieceImage:  _images.getPiecesRed()[2], pieceNumber: 2, orientation: 2, isFixed:  false, player: -1, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 

        { row: 2, column: 0, pieceImage:  _images.getPiecesRed()[3], pieceNumber: 3, orientation: 0, isFixed:  false, player: -1, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 
        { row: 2, column: 1, pieceImage:  _images.getPiecesRed()[0], pieceNumber: 0, orientation: 1, isFixed:  false, player: -1, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 
        { row: 2, column: 2, pieceImage:  _images.getPiecesRed()[3], pieceNumber: 3, orientation: 3, isFixed:  false, player: -1, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 
    ];

    //Create a simple test maze. 3 x 3 -> the corners are normal positions. Straight pieces turned to the north.
    //[!] Important: give the pieces a row and index number [!]
    let testMaze002: MazePiece[] = [
        //Player: 0 here.
        { row: 0, column: 0, pieceImage:  _images.getPiecesRed()[3], pieceNumber: 3, orientation: 1, isFixed:  false, player: 0, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 
        { row: 0, column: 1, pieceImage:  _images.getPiecesRed()[0], pieceNumber: 0, orientation: 0, isFixed:  false, player: -1, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 
        { row: 0, column: 2, pieceImage:  _images.getPiecesRed()[3], pieceNumber: 3, orientation: 2, isFixed:  false, player: -1, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 
        
        //No treasure in middle.
        { row: 1, column: 0, pieceImage:  _images.getPiecesRed()[2], pieceNumber: 2, orientation: 0, isFixed:  false, player: -1, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 
        { row: 1, column: 1, pieceImage:  _images.getPiecesRed()[0], pieceNumber: 0, orientation: 0, isFixed:  false, player: -1, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 
        { row: 1, column: 2, pieceImage:  _images.getPiecesRed()[2], pieceNumber: 2, orientation: 2, isFixed:  false, player: -1, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' },

        { row: 2, column: 0, pieceImage:  _images.getPiecesRed()[3], pieceNumber: 3, orientation: 0, isFixed:  false, player: -1, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 
        { row: 2, column: 1, pieceImage:  _images.getPiecesRed()[0], pieceNumber: 0, orientation: 0, isFixed:  false, player: -1, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 
        { row: 2, column: 2, pieceImage:  _images.getPiecesRed()[3], pieceNumber: 3, orientation: 3, isFixed:  false, player: -1, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 
    ];

    //Create a simple test maze. 3 x 3 -> the corners are normal positions. Path to treasure is blocked. Treasure at bottom-right corner.
    //[!] Important: give the pieces a row and index number [!]
    let testMaze003: MazePiece[] = [
        //Player: 0 here. Alternative path here is blocked in middle.

        { row: 0, column: 0, pieceImage:  _images.getPiecesRed()[0], pieceNumber: 0, orientation: 0, isFixed:  false, player: 0, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 
        { row: 0, column: 1, pieceImage:  _images.getPiecesRed()[0], pieceNumber: 0, orientation: 0, isFixed:  false, player: -1, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 
        { row: 0, column: 2, pieceImage:  _images.getPiecesRed()[0], pieceNumber: 0, orientation: 0, isFixed:  false, player: -1, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 

        //Alternative path here is blocked for last piece.
        { row: 1, column: 0, pieceImage:  _images.getPiecesRed()[0], pieceNumber: 0, orientation: 0, isFixed:  false, player: -1, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 
        { row: 1, column: 1, pieceImage:  _images.getPiecesRed()[0], pieceNumber: 0, orientation: 0, isFixed:  false, player: -1, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 
        { row: 1, column: 2, pieceImage:  _images.getPiecesRed()[0], pieceNumber: 0, orientation: 0, isFixed:  false, player: -1, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 
       
        //Last piece: straight piece, to east.
        { row: 2, column: 0, pieceImage:  _images.getPiecesRed()[3], pieceNumber: 3, orientation: 0, isFixed:  false, player: -1, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 
        { row: 2, column: 1, pieceImage:  _images.getPiecesRed()[0], pieceNumber: 0, orientation: 0, isFixed:  false, player: -1, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 
        { row: 2, column: 2, pieceImage:  _images.getPiecesRed()[0], pieceNumber: 0, orientation: 1, isFixed:  false, player: -1, hasTreasure:  true, treasureForPlayer: 0, treasureImage: 'Treasure Here' }, 
    ];

    //Create a simple test maze. 3 x 3 -> the corners are normal positions. Path to treasure is blocked. Treasure at bottom-right corner.
    //[!] Important: give the pieces a row and index number [!]
    let testMaze004: MazePiece[] = [
        //Player not at board.
        { row: 0, column: 0, pieceImage:  _images.getPiecesRed()[3], pieceNumber: 3, orientation: 1, isFixed:  false, player: -1, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 
        { row: 0, column: 1, pieceImage:  _images.getPiecesRed()[0], pieceNumber: 0, orientation: 0, isFixed:  false, player: -1, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 
        { row: 0, column: 2, pieceImage:  _images.getPiecesRed()[3], pieceNumber: 3, orientation: 2, isFixed:  false, player: -1, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 
        
        //Last piece: Alternative path here is blocked.
        { row: 1, column: 0, pieceImage:  _images.getPiecesRed()[2], pieceNumber: 2, orientation: 0, isFixed:  false, player: -1, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 
        { row: 1, column: 1, pieceImage:  _images.getPiecesRed()[0], pieceNumber: 0, orientation: 0, isFixed:  false, player: -1, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 
        { row: 1, column: 2, pieceImage:  _images.getPiecesRed()[0], pieceNumber: 0, orientation: 1, isFixed:  false, player: -1, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 
        
        //treasure at last (straight) piece.
        { row: 2, column: 0, pieceImage:  _images.getPiecesRed()[3], pieceNumber: 3, orientation: 0, isFixed:  false, player: -1, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 
        { row: 2, column: 1, pieceImage:  _images.getPiecesRed()[0], pieceNumber: 0, orientation: 0, isFixed:  false, player: -1, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 
        { row: 2, column: 2, pieceImage:  _images.getPiecesRed()[0], pieceNumber: 0, orientation: 1, isFixed:  false, player: -1, hasTreasure:  true, treasureForPlayer: 0, treasureImage: 'Treasure Here' }, 
    ];

    //Create a simple test maze. 4 rows x 3 columns. For closest test.
    let testMaze005: MazePiece[] = [
        //Player: 0 here.
        { row: 0, column: 0, pieceImage:  _images.getPiecesRed()[3], pieceNumber: 3, orientation: 1, isFixed:  false, player: 0, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 
        { row: 0, column: 1, pieceImage:  _images.getPiecesRed()[0], pieceNumber: 0, orientation: 1, isFixed:  false, player: -1, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 
        { row: 0, column: 2, pieceImage:  _images.getPiecesRed()[3], pieceNumber: 3, orientation: 2, isFixed:  false, player: -1, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 

        { row: 1, column: 0, pieceImage:  _images.getPiecesRed()[2], pieceNumber: 2, orientation: 0, isFixed:  false, player: -1, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 
        { row: 1, column: 1, pieceImage:  _images.getPiecesRed()[0], pieceNumber: 0, orientation: 1, isFixed:  false, player: -1, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 
        { row: 1, column: 2, pieceImage:  _images.getPiecesRed()[2], pieceNumber: 2, orientation: 2, isFixed:  false, player: -1, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 

         //Last piece: closest point
        { row: 2, column: 0, pieceImage:  _images.getPiecesRed()[2], pieceNumber: 2, orientation: 0, isFixed:  false, player: -1, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 
        { row: 2, column: 1, pieceImage:  _images.getPiecesRed()[0], pieceNumber: 0, orientation: 1, isFixed:  false, player: -1, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 
        { row: 2, column: 2, pieceImage:  _images.getPiecesRed()[0], pieceNumber: 0, orientation: 1, isFixed:  false, player: -1, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 

        //Last piece: treasure.
        { row: 3, column: 0, pieceImage:  _images.getPiecesRed()[3], pieceNumber: 3, orientation: 0, isFixed:  false, player: -1, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 
        { row: 3, column: 1, pieceImage:  _images.getPiecesRed()[0], pieceNumber: 0, orientation: 0, isFixed:  false, player: -1, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 
        { row: 3, column: 2, pieceImage:  _images.getPiecesRed()[0], pieceNumber: 0, orientation: 1, isFixed:  false, player: -1, hasTreasure:  true, treasureForPlayer: 0, treasureImage: 'Treasure Here' }, 
    ];

    let testFixedRowAndColumnIndexes: number[] = [0, 1, 2];

    let insertPiece: MazePiece = { row: -1, column: -1, pieceImage:  _images.getPiecesRed()[1], pieceNumber: 1, orientation: 0, isFixed:  false, player: -1, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' };

    let insertPieceWithTreasure: MazePiece = { row: -1, column: -1, pieceImage:  _images.getPiecesRed()[1], pieceNumber: 1, orientation: 0, isFixed:  false, player: -1, hasTreasure:  true, treasureForPlayer: 0, treasureImage: 'Treasure Inserted Here' };

    let insertPieceStraight: MazePiece = { row: -1, column: -1, pieceImage:  _images.getPiecesRed()[0], pieceNumber: 0, orientation: 0, isFixed:  false, player: -1, hasTreasure:  false, treasureForPlayer: -1, treasureImage: 'Piece inserted here' };

    //player at straight piece.
    let insertPieceWithPlayer: MazePiece = { row: -1, column: -1, pieceImage:  _images.getPiecesRed()[0], pieceNumber: 0, orientation: 0, isFixed:  false, player: 0, hasTreasure:  false, treasureForPlayer: -1, treasureImage: 'Piece inserted here' }; 

    let targetPlayer: number = 0;

    //For private methods:
    let treasureRow: number = 2;
    let treasureColumn: number = 2;

    //For private methods: test for maze: 5 x 5.
    let testPaths: MazePaths[] = [
        { row: 0, column: 0},
        { row: 0, column: 1},
        { row: 0, column: 2},
        { row: 0, column: 3},
        { row: 0, column: 4},
        { row: 1, column: 0},
        { row: 1, column: 1},
        { row: 1, column: 2},
        { row: 1, column: 3},
        { row: 1, column: 4},
        { row: 2, column: 0},
        { row: 2, column: 1},
        { row: 2, column: 2},
        { row: 2, column: 3},
        { row: 2, column: 4},
        { row: 3, column: 0},
        { row: 3, column: 1},
        { row: 3, column: 2},
        { row: 3, column: 3},
        { row: 3, column: 4},
        { row: 4, column: 0},
        { row: 4, column: 1},
        { row: 4, column: 2},
        { row: 4, column: 3},
        { row: 4, column: 4}
    ];

    it('test method computerInsertCalculation() testMaze001 - treasure in middle', () => {
        //Test 10 inserts -> but treasure should stay at the middle. -> row and column at index: 1 should not be affected.
        for(let i = 0; i < 30; i++) {
            let insert: ComputerInsert = testClass.computerInsertCalculation(testMaze001, insertPiece, targetPlayer, testFixedRowAndColumnIndexes);
            expect(insert.rowOrColumnIndex).not.toBe(1);
        }
    });

    it('test method computerInsertCalculation() testMaze002 - treasure at insertPiece', () => {
        //Test 10 inserts -> the best insert should be: row or column at index: 1.
        for(let i = 0; i < 10; i++) {
            let insert: ComputerInsert = testClass.computerInsertCalculation(testMaze002, insertPieceWithTreasure, targetPlayer, testFixedRowAndColumnIndexes);
            expect(insert.rowOrColumnIndex).toBe(1);
        }
    });

    it('test method: computerInsertCalculation() testMaze003 - player at board, no direct route to treasure, treasure at bottom right corner', () => {
        //Test 10 inserts - should insert at: Y-Axis (insert.isColumns), at the bottom (insert.isTopOrLeft), insert piece to east (insert.orientation)
        //and: inserted at index: 1 (insert.rowOrColumnIndex)
        for(let i = 0; i < 10; i++) {
            let insert: ComputerInsert = testClass.computerInsertCalculation(testMaze003, insertPieceStraight, targetPlayer, testFixedRowAndColumnIndexes);

            expect(insert.insertAxisY).toBeTruthy();
            expect(insert.isTopOrLeft).toBeFalsy();
            expect(insert.orientation).toBe(1);
            expect(insert.rowOrColumnIndex).toBe(1);
        }
    });

    it('test method: computerInsertCalculation() testMaze004 - player NOT at board, no direct route to treasure, treasure at bottom right corner', () => {
        //Test 10 inserts - should insert at: Y-Axis (insert.isColumns), at the bottom (insert.isTopOrLeft), insert piece to east (insert.orientation)
        //and: inserted at index: 1 (insert.rowOrColumnIndex)
        for(let i = 0; i < 10; i++) {
            let insert: ComputerInsert = testClass.computerInsertCalculation(testMaze004, insertPieceWithPlayer, targetPlayer, testFixedRowAndColumnIndexes);

            expect(insert.insertAxisY).toBeTruthy();
            expect(insert.isTopOrLeft).toBeFalsy();
            expect(insert.orientation).toBe(1);
            expect(insert.rowOrColumnIndex).toBe(1);
        }
    });

    it('test method: computerMoveCalculation() - computer NOT at board (pushed itself from the board)', () => {
        let cpuMove: ComputerMove = testClass.computerMoveCalculation(testMaze004, insertPieceWithPlayer, targetPlayer);

        expect(cpuMove.canMove).toBeFalsy();
        expect(cpuMove.row).toBe(-1);
        expect(cpuMove.column).toBe(-1);
    });

    it('test method: computerMoveCalculation() - treasure NOT at board (pushed treasure from the board)', () => {
        let cpuMove: ComputerMove = testClass.computerMoveCalculation(testMaze001, insertPieceWithTreasure, targetPlayer);

        expect(cpuMove.canMove).toBeFalsy();
        expect(cpuMove.row).toBe(-1);
        expect(cpuMove.column).toBe(-1);
    });

    it('test method: computerMoveCalculation() - computer at board, direct path to treasure', () => {
        let cpuMove: ComputerMove = testClass.computerMoveCalculation(testMaze001, insertPiece, targetPlayer);

        expect(cpuMove.canMove).toBeTruthy();
        expect(cpuMove.row).toBe(1);
        expect(cpuMove.column).toBe(1);
    });

    it('test method: computerMoveCalculation() - test closest path', () => {
        let cpuMove: ComputerMove = testClass.computerMoveCalculation(testMaze005, insertPiece, targetPlayer);

        expect(cpuMove.canMove).toBeTruthy();
        expect(cpuMove.row).toBe(2);
        expect(cpuMove.column).toBe(2);
    });

    it('test private method: calculateDistances()', () => {
        let expectations: number[] = [4, 3, 2, 3, 4, 3, 2, 1, 2, 3, 2, 1, 0, 1, 2, 3, 2, 1, 2, 3, 4, 3, 2, 3, 4];

        //@ts-ignore
        let distances: number[] = testClass.calculateDistances(testPaths, treasureRow, treasureColumn);

        for(let i = 0; i < distances.length; i++) {
            expect(distances[i]).toBe(expectations[i]);
        }
    });

    it('test private method: searchBestInsert()', () => {
        let allPaths: MazePaths[] = [
            { row: 1, column: 1, total: 8},
            { row: 2, column: 2, total: 2}, //This is the best insert.
            { row: 3, column: 3, total: 5},
            { row: 4, column: 4, total: 4},
            { row: 5, column: 5, total: 3}
        ];

        //@ts-ignore
        let bestPath: MazePaths = testClass.searchBestInsert(allPaths);

        expect(bestPath.row).toBe(2);
        expect(bestPath.column).toBe(2);
    });

    it('test private method: getLowestNumberIndexes()', () => {
        //@ts-ignore
        let distances: number[] = testClass.calculateDistances(testPaths, treasureRow, treasureColumn);
        
        //Result: best at index 12
        //let expectations: number[] = [4, 3, 2, 3, 4, 3, 2, 1, 2, 3, 2, 1, 0, 1, 2, 3, 2, 1, 2, 3, 4, 3, 2, 3, 4];

        //@ts-ignore
        let lowestNumbers: number[] = testClass.getLowestNumberIndexes(distances, 0);

        expect(lowestNumbers[0]).toBe(12);
    });

    it('test private method: filterPaths()', () => {
        let morePlayersInMaze: MazePiece[] = structuredClone(testMaze001);
        morePlayersInMaze[3].player = 1;
        morePlayersInMaze[5].player = 2;
        morePlayersInMaze[7].player = 3;

        //'Zig-zag' through maze.
        let paths: MazePaths[] = [
            { row: 0, column: 0},
            { row: 0, column: 1},
            { row: 0, column: 2},
            { row: 1, column: 2},
            { row: 1, column: 1},
            { row: 1, column: 0},
            { row: 2, column: 0},
            { row: 2, column: 1},
            { row: 2, column: 2}
        ];

        //@ts-ignore
        let filteredPaths: MazePaths[] = testClass.filterPaths(morePlayersInMaze, paths, targetPlayer);

        expect(filteredPaths.length).toBe(6);
    });

    it('test private method: generateNumberWithSkip()', () => {
        let someNumbers: number[] = [1, 4, 5, 8, 10, 13, 15, 17];

        //@ts-ignore
        let generatedNumber: number = testClass.generateNumberWithSkip(13, someNumbers);

        expect(generatedNumber).not.toBe(13);
    });

});