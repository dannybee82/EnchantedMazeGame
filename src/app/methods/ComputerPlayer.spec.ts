import { ComputerPlayer } from "./ComputerPlayer";
import { MazePiece } from "../models/MazePiece";
import { PieceImages } from "./PieceImages";
import { ComputerInsert } from '../models/ComputerInsert';
import { ComputerMove } from "../models/ComputerMove";

describe('Class ComputerPlayer', () => {

    let testClass: ComputerPlayer = new ComputerPlayer();

    let _images: PieceImages = new PieceImages();

    //Create a simple test maze. 3 x 3 with treasure in middle.
    //[!] Important: give the pieces a row and index number [!]
    let testMaze001: MazePiece[] = [
        new MazePiece(0, 0, _images.getPiecesRed()[3], 3, 1, false,  0, false, -1, -1), //Player: 0 here.
        new MazePiece(0, 1, _images.getPiecesRed()[0], 0, 1, false, -1, false, -1, -1),
        new MazePiece(0, 2, _images.getPiecesRed()[3], 3, 2, false, -1, false, -1, -1),

        new MazePiece(1, 0, _images.getPiecesRed()[2], 2, 0, false, -1, false, -1, -1),
        new MazePiece(1, 1, _images.getPiecesRed()[0], 0, 1, false, -1, true,   0,  0, 'Treasure Here'),
        new MazePiece(1, 2, _images.getPiecesRed()[2], 2, 2, false, -1, false, -1, -1),

        new MazePiece(2, 0, _images.getPiecesRed()[3], 3, 0, false, -1, false, -1, -1),
        new MazePiece(2, 1, _images.getPiecesRed()[0], 0, 1, false, -1, false, -1, -1),
        new MazePiece(2, 2, _images.getPiecesRed()[3], 3, 3, false, -1, false, -1, -1)
    ];

    //Create a simple test maze. 3 x 3 -> the corners are normal positions. Straight pieces turned to the north.
    //[!] Important: give the pieces a row and index number [!]
    let testMaze002: MazePiece[] = [
        new MazePiece(0, 0, _images.getPiecesRed()[3], 3, 1, false,  0, false, -1, -1), //Player: 0 here.
        new MazePiece(0, 1, _images.getPiecesRed()[0], 0, 0, false, -1, false, -1, -1),
        new MazePiece(0, 2, _images.getPiecesRed()[3], 3, 2, false, -1, false, -1, -1),

        new MazePiece(1, 0, _images.getPiecesRed()[2], 2, 0, false, -1, false, -1, -1),
        new MazePiece(1, 1, _images.getPiecesRed()[0], 0, 0, false, -1, false, -1, -1), //No treasure.
        new MazePiece(1, 2, _images.getPiecesRed()[2], 2, 2, false, -1, false, -1, -1),

        new MazePiece(2, 0, _images.getPiecesRed()[3], 3, 0, false, -1, false, -1, -1),
        new MazePiece(2, 1, _images.getPiecesRed()[0], 0, 0, false, -1, false, -1, -1),
        new MazePiece(2, 2, _images.getPiecesRed()[3], 3, 3, false, -1, false, -1, -1)
    ];

    //Create a simple test maze. 3 x 3 -> the corners are normal positions. Path to treasure is blocked. Treasure at bottom-right corner.
    //[!] Important: give the pieces a row and index number [!]
    let testMaze003: MazePiece[] = [
        new MazePiece(0, 0, _images.getPiecesRed()[0], 0, 0, false,  0, false, -1, -1), //Player: 0 here.
        new MazePiece(0, 1, _images.getPiecesRed()[0], 0, 0, false, -1, false, -1, -1), //Alternative path here is blocked.
        new MazePiece(0, 2, _images.getPiecesRed()[0], 0, 0, false, -1, false, -1, -1),

        new MazePiece(1, 0, _images.getPiecesRed()[0], 0, 0, false, -1, false, -1, -1),
        new MazePiece(1, 1, _images.getPiecesRed()[0], 0, 0, false, -1, false, -1, -1),
        new MazePiece(1, 2, _images.getPiecesRed()[0], 0, 0, false, -1, false, -1, -1), //Alternative path here is blocked.

        new MazePiece(2, 0, _images.getPiecesRed()[3], 3, 0, false, -1, false, -1, -1),
        new MazePiece(2, 1, _images.getPiecesRed()[0], 0, 0, false, -1, false, -1, -1),
        new MazePiece(2, 2, _images.getPiecesRed()[0], 0, 1, false, -1, true,   0,  0, 'Treasure Here') //straight piece, to east.
    ];

    //Create a simple test maze. 3 x 3 -> the corners are normal positions. Path to treasure is blocked. Treasure at bottom-right corner.
    //[!] Important: give the pieces a row and index number [!]
    let testMaze004: MazePiece[] = [
        new MazePiece(0, 0, _images.getPiecesRed()[3], 3, 1, false, -1, false, -1, -1), //Player not at board.
        new MazePiece(0, 1, _images.getPiecesRed()[0], 0, 0, false, -1, false, -1, -1),
        new MazePiece(0, 2, _images.getPiecesRed()[3], 3, 2, false, -1, false, -1, -1),

        new MazePiece(1, 0, _images.getPiecesRed()[2], 2, 0, false, -1, false, -1, -1),
        new MazePiece(1, 1, _images.getPiecesRed()[0], 0, 0, false, -1, false, -1, -1),
        new MazePiece(1, 2, _images.getPiecesRed()[0], 0, 1, false, -1, false, -1, -1), //Alternative path here is blocked.

        new MazePiece(2, 0, _images.getPiecesRed()[3], 3, 0, false, -1, false, -1, -1),
        new MazePiece(2, 1, _images.getPiecesRed()[0], 0, 0, false, -1, false, -1, -1),
        new MazePiece(2, 2, _images.getPiecesRed()[0], 0, 1, false, -1, true,   0,  0, 'Treasure Here') //treasure at straight piece.
    ];

    //Create a simple test maze. 4 rows x 3 columns. For closest test.
    let testMaze005: MazePiece[] = [
        new MazePiece(0, 0, _images.getPiecesRed()[3], 3, 1, false,  0, false, -1, -1), //Player: 0 here.
        new MazePiece(0, 1, _images.getPiecesRed()[0], 0, 1, false, -1, false, -1, -1),
        new MazePiece(0, 2, _images.getPiecesRed()[3], 3, 2, false, -1, false, -1, -1),

        new MazePiece(1, 0, _images.getPiecesRed()[2], 2, 0, false, -1, false, -1, -1),
        new MazePiece(1, 1, _images.getPiecesRed()[0], 0, 1, false, -1, false, -1, -1),
        new MazePiece(1, 2, _images.getPiecesRed()[2], 2, 2, false, -1, false, -1, -1),

        new MazePiece(2, 0, _images.getPiecesRed()[2], 2, 0, false, -1, false, -1, -1),
        new MazePiece(2, 1, _images.getPiecesRed()[0], 0, 1, false, -1, false, -1, -1),
        new MazePiece(2, 2, _images.getPiecesRed()[0], 0, 1, false, -1, false, -1, -1), //closest point

        new MazePiece(3, 0, _images.getPiecesRed()[3], 3, 0, false, -1, false, -1, -1),
        new MazePiece(3, 1, _images.getPiecesRed()[0], 0, 0, false, -1, false, -1, -1),
        new MazePiece(3, 2, _images.getPiecesRed()[0], 0, 1, false, -1, true,   0,  0, 'Treasure Here')
    ];

    let testFixedRowAndColumnIndexes: number[] = [0, 1, 2];

    let insertPiece: MazePiece = new MazePiece(-1, -1, _images.getPiecesRed()[1], 1, 0, false, -1, false, -1, -1);

    let insertPieceWithTreasure: MazePiece = new MazePiece(-1, -1, _images.getPiecesRed()[1], 1, 0, false, -1, true, 0, 0, 'Treasure Inserted Here');

    let insertPieceStraight: MazePiece = new MazePiece(-1, -1, _images.getPiecesRed()[0], 0, 0, false, -1, false, -1, -1, 'Piece inserted here');

    let insertPieceWithPlayer: MazePiece = new MazePiece(-1, -1, _images.getPiecesRed()[0], 0, 0, false, 0, false, -1, -1, 'Piece inserted here'); //player at straight piece.

    let targetPlayer: number = 0;

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

            expect(insert.insertAxisY).toBeTrue();
            expect(insert.isTopOrLeft).toBeFalse();
            expect(insert.orientation).toBe(1);
            expect(insert.rowOrColumnIndex).toBe(1);
        }
    });

    it('test method: computerInsertCalculation() testMaze004 - player NOT at board, no direct route to treasure, treasure at bottom right corner', () => {
        //Test 10 inserts - should insert at: Y-Axis (insert.isColumns), at the bottom (insert.isTopOrLeft), insert piece to east (insert.orientation)
        //and: inserted at index: 1 (insert.rowOrColumnIndex)
        for(let i = 0; i < 10; i++) {
            let insert: ComputerInsert = testClass.computerInsertCalculation(testMaze004, insertPieceWithPlayer, targetPlayer, testFixedRowAndColumnIndexes);

            expect(insert.insertAxisY).toBeTrue();
            expect(insert.isTopOrLeft).toBeFalse();
            expect(insert.orientation).toBe(1);
            expect(insert.rowOrColumnIndex).toBe(1);
        }
    });

    it('test method: computerMoveCalculation() - computer NOT at board (pushed itself from the board)', () => {
        let cpuMove: ComputerMove = testClass.computerMoveCalculation(testMaze004, insertPieceWithPlayer, targetPlayer);

        expect(cpuMove.canMove).toBeFalse();
        expect(cpuMove.row).toBe(-1);
        expect(cpuMove.column).toBe(-1);
    });

    it('test method: computerMoveCalculation() - treasure NOT at board (pushed treasure from the board)', () => {
        let cpuMove: ComputerMove = testClass.computerMoveCalculation(testMaze001, insertPieceWithTreasure, targetPlayer);

        expect(cpuMove.canMove).toBeFalse();
        expect(cpuMove.row).toBe(-1);
        expect(cpuMove.column).toBe(-1);
    });

    it('test method: computerMoveCalculation() - computer at board, direct path to treasure', () => {
        let cpuMove: ComputerMove = testClass.computerMoveCalculation(testMaze001, insertPiece, targetPlayer);

        expect(cpuMove.canMove).toBeTrue();
        expect(cpuMove.row).toBe(1);
        expect(cpuMove.column).toBe(1);
    });

    it('test method: computerMoveCalculation() - test closest path', () => {
        let cpuMove: ComputerMove = testClass.computerMoveCalculation(testMaze005, insertPiece, targetPlayer);

        expect(cpuMove.canMove).toBeTrue();
        expect(cpuMove.row).toBe(2);
        expect(cpuMove.column).toBe(2);
    });

});