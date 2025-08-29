import { Controls } from "./Controls";
import { MazePiece } from "../models/maze-piece.interface";
import { PieceImages } from "./PieceImages";
import { MazePaths } from "../models/maze-paths.interface";

describe('Class Controls', () => {   

    let testClass: Controls = new Controls();

    let _images: PieceImages = new PieceImages();

    //Create a simple test maze. 3 x 3 with treasure at bottom right corner
    //[!] Important: give the pieces a row and index number [!]
    let testMaze001: MazePiece[] = [];

    let insertPiece: MazePiece = { row: -1, column: -1, pieceImage:  _images.getPiecesRed()[1], pieceNumber: 1, orientation: 0, isFixed:  false, player: -1, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' };

    let playerNumber: number = 0;
    //let treasureIndex: number = 0;

    beforeEach(() => {
        testMaze001 = generateMaze();
    });

    function generateMaze() : MazePiece[] {
        let maze: MazePiece[] = [
            //Player: 0 here.
            { row: 0, column: 0, pieceImage:  _images.getPiecesRed()[3], pieceNumber: 3, orientation: 1, isFixed:  false, player:  playerNumber, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 
            { row: 0, column: 1, pieceImage:  _images.getPiecesRed()[0], pieceNumber: 0, orientation: 1, isFixed:  false, player: -1, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 
            { row: 0, column: 2, pieceImage:  _images.getPiecesRed()[3], pieceNumber: 3, orientation: 2, isFixed:  false, player: -1, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 
        
            { row: 1, column: 0, pieceImage:  _images.getPiecesRed()[2], pieceNumber: 2, orientation: 0, isFixed:  false, player: -1, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 
            { row: 1, column: 1, pieceImage:  _images.getPiecesRed()[0], pieceNumber: 0, orientation: 1, isFixed:  false, player: -1, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 
            { row: 1, column: 2, pieceImage:  _images.getPiecesRed()[2], pieceNumber: 2, orientation: 2, isFixed:  false, player: -1, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 

            { row: 2, column: 0, pieceImage:  _images.getPiecesRed()[3], pieceNumber: 3, orientation: 0, isFixed:  false, player: -1, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 
            { row: 2, column: 1, pieceImage:  _images.getPiecesRed()[0], pieceNumber: 0, orientation: 1, isFixed:  false, player: -1, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 
            { row: 2, column: 2, pieceImage:  _images.getPiecesRed()[3], pieceNumber: 3, orientation: 3, isFixed:  false, player: -1, hasTreasure:  true, treasureForPlayer: 0, treasureImage: 'Treasure Here' }, 
        ];
        
        return maze;
    }

    it('test method insert() - push player to middle and then to bottom right corner', () => {
        let axis: boolean[] = [true, false, false, true];
        let topOrLeft: boolean[] = [true, true, true, true];
        let targetColumn: number[] = [0, 1, 1, 2];
        let expectedPlayerRow: number[] = [1, 1, 1, 2];
        let expectedPlayerColumn: number[] = [0, 1, 2, 2];

        let testInsertPiece: MazePiece = insertPiece;

        for(let i = 0; i < axis.length; i++) {
            testMaze001 = testClass.insert(testMaze001, testInsertPiece, axis[i], topOrLeft[i], targetColumn[i], false);
            testInsertPiece = testClass.getChangedCurrentPiece();
            let playerPositionIndex: number = testMaze001.findIndex(item => item.player == playerNumber);
            
            expect(playerPositionIndex).toBeGreaterThan(-1);
            expect(testMaze001[playerPositionIndex].row).toBe(expectedPlayerRow[i]);
            expect(testMaze001[playerPositionIndex].column).toBe(expectedPlayerColumn[i]);
        }
    });

    it('test method insert() - push treasure to middle and then to upper left corner', () => {
        let axis: boolean[] = [false, true, false, true];
        let topOrLeft: boolean[] = [false, false, false, false];
        let targetColumn: number[] = [2, 1, 1, 0];
        let expectedPlayerRow: number[] = [2, 1, 1, 0];
        let expectedPlayerColumn: number[] = [1, 1, 0, 0];

        let testInsertPiece: MazePiece = insertPiece;

        for(let i = 0; i < axis.length; i++) {
            testMaze001 = testClass.insert(testMaze001, testInsertPiece, axis[i], topOrLeft[i], targetColumn[i], false);
            testInsertPiece = testClass.getChangedCurrentPiece();
            let treasurePositionIndex: number = testMaze001.findIndex(item => item.hasTreasure);
            
            expect(treasurePositionIndex).toBeGreaterThan(-1);
            expect(testMaze001[treasurePositionIndex].row).toBe(expectedPlayerRow[i]);
            expect(testMaze001[treasurePositionIndex].column).toBe(expectedPlayerColumn[i]);
        }
    });

    //TODO: Push player and treasure out of the maze.
    it('test method insert() - push player outside the maze', () => {
        let testInsertPiece: MazePiece = insertPiece;

        testMaze001 = testClass.insert(testMaze001, testInsertPiece, false, false, 0, false);
        testInsertPiece = testClass.getChangedCurrentPiece();

        expect(testInsertPiece.player).toBe(playerNumber);
    });

    it('test method insert() - push treasure outside the maze', () => {
        let testInsertPiece: MazePiece = insertPiece;

        testMaze001 = testClass.insert(testMaze001, testInsertPiece, false, true, 2, false);
        testInsertPiece = testClass.getChangedCurrentPiece();

        expect(testInsertPiece.hasTreasure).toBeTruthy();
        expect(testInsertPiece.treasureForPlayer).toBe(playerNumber);
        //expect(testInsertPiece.treasureIndex).toBe(treasureIndex);
        expect(testInsertPiece.treasureImage).toContain('Treasure Here');
    });


    it('test method canMove() - add another player in middle of maze', () => {
        //Add second player. index = 4 = row: 1, column: 1
        testMaze001[4].player =1;

        let paths: MazePaths[] = [
            { row: 1, column: 1 }, //position of other player.
            { row: 2, column: 2 } //position of treasure.
        ];

        expect(testClass.canMove(testMaze001, paths, 0, playerNumber)).toBeFalsy();
        expect(testClass.canMove(testMaze001, paths, 1, playerNumber)).toBeTruthy();
    });

    it('test method: isNotSamePiece()', () => {
        //Location of player.
        expect(testClass.isNotSamePiece(testMaze001, 0, 0)).toBeTruthy();
        //Location of treasure.
        expect(testClass.isNotSamePiece(testMaze001, 0, 8)).toBeFalsy();
    });

    it('test method: hasTreasure()', () => {
        //Middle of maze.
        expect(testClass.hasTreasure(testMaze001, 4, playerNumber)).toBeFalsy();
        //Location of treasure.
        expect(testClass.hasTreasure(testMaze001, 8, playerNumber)).toBeTruthy();
    });

    it('test method: move()', () => {
        //Move to middle of maze.
        testMaze001 = testClass.move(testMaze001, 4, 0, playerNumber);

        expect(testMaze001[0].player).toBe(-1);
        expect(testMaze001[4].player).toBe(playerNumber);

        //Move to treasure.
        testMaze001 = testClass.move(testMaze001, 8, 4, playerNumber);
        expect(testMaze001[4].player).toBe(-1);
        expect(testMaze001[8].player).toBe(playerNumber);
    });

})