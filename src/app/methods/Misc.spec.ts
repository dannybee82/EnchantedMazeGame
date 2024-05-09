import { Misc } from "./Misc";
import { MazePiece } from "../models/maze-piece.interface";
import { PieceImages } from "./PieceImages";

describe('class Misc', () => {

    let testClass: Misc = new Misc();

    let _images: PieceImages = new PieceImages();

    let playerNumber: number = 0;
    let treasureIndex: number = 0;

    function generateMaze() : MazePiece[] {
        let maze: MazePiece[] = [
            //Player: 0 here.
            { row: 0, column: 0, pieceImage: _images.getPiecesRed()[3], pieceNumber: 3, orientation: 1, isFixed:  false, player:  playerNumber, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 
            { row: 0, column: 1, pieceImage: _images.getPiecesRed()[0], pieceNumber: 0, orientation: 1, isFixed:  false, player: -1, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 
            { row: 0, column: 2, pieceImage: _images.getPiecesRed()[3], pieceNumber: 3, orientation: 2, isFixed:  false, player: -1, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 
        
            { row: 1, column: 0, pieceImage: _images.getPiecesRed()[2], pieceNumber: 2, orientation: 0, isFixed:  false, player: -1, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 
            { row: 1, column: 1, pieceImage: _images.getPiecesRed()[0], pieceNumber: 0, orientation: 1, isFixed:  false, player: -1, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 
            { row: 1, column: 2, pieceImage: _images.getPiecesRed()[2], pieceNumber: 2, orientation: 2, isFixed:  false, player: -1, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 
        
            { row: 2, column: 0, pieceImage: _images.getPiecesRed()[3], pieceNumber: 3, orientation: 0, isFixed:  false, player: -1, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 
            { row: 2, column: 1, pieceImage: _images.getPiecesRed()[0], pieceNumber: 0, orientation: 1, isFixed:  false, player: -1, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 
            { row: 2, column: 2, pieceImage: _images.getPiecesRed()[3], pieceNumber: 3, orientation: 3, isFixed:  false, player: -1, hasTreasure:  true, treasureForPlayer: 0, treasureImage: 'Treasure Here' }, 
        ];
        
        return maze;
    }

    it('test method: findIndexOfPiece()', () => {
        let pieces: MazePiece[] =  generateMaze();

        expect(testClass.findIndexOfPiece(pieces, 0, 1)).toBe(1);
        expect(testClass.findIndexOfPiece(pieces, 1, 2)).toBe(5);
        expect(testClass.findIndexOfPiece(pieces, 2, 0)).toBe(6);
        expect(testClass.findIndexOfPiece(pieces, 3, 0)).toBe(-1);
    });

    it('test method: findIndexOfPlayer()', () => {
        let pieces: MazePiece[] =  generateMaze();
        pieces[2].player = 1; //Add player.
        pieces[4].player = 2;  //Add player.
        pieces[5].player = 3;  //Add player.

        expect(testClass.findIndexOfPlayer(pieces, 0)).toBe(0);
        expect(testClass.findIndexOfPlayer(pieces, 1)).toBe(2);
        expect(testClass.findIndexOfPlayer(pieces, 2)).toBe(4);
        expect(testClass.findIndexOfPlayer(pieces, 3)).toBe(5);
        expect(testClass.findIndexOfPlayer(pieces, 4)).toBe(-1); //player with index: 4 doesn't exist.
    });

    it('test method: findIndexOfTreasure()', () => {
        let pieces: MazePiece[] =  generateMaze();

        expect(testClass.findIndexOfTreasure(pieces, 0)).toBe(8);
        expect(testClass.findIndexOfPlayer(pieces, 1)).toBe(-1); //No treasure for player with index 1 in the maze.
    });

    it('test method: setSizeAxisXandY()', () => {
        testClass.setSizeAxisXandY(2, 2);
        expect(testClass.defaultSizeAxisX).toBe(3);
        expect(testClass.defaultSizeAxisY).toBe(3);

        testClass.setSizeAxisXandY(7, 7);
        expect(testClass.defaultSizeAxisX).toBe(7);
        expect(testClass.defaultSizeAxisY).toBe(7);
    });

});