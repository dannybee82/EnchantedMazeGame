import { Matrix } from "./Matrix";
import { MazePaths } from "../models/maze-paths.interface";
import { MazePiece } from "../models/maze-piece.interface";
import { PieceImages } from "./PieceImages";

describe('Class Matrix', () => {  

    let testClass: Matrix = new Matrix();

    let testPaths: MazePaths[] = [
        { row:0, column: 0},
        { row:0, column: 1},
        { row:0, column: 2},
        { row:0, column: 3},
        { row:0, column: 4},
        { row:1, column: 4},
        { row:2, column: 4},
        { row:3, column: 4},
        { row:4, column: 4}
    ];

    let _images: PieceImages = new PieceImages();

    let playerNumber: number = 0;
    let treasureIndex: number = 0;

    function getMaze5x5() : MazePiece[] {
        let maze: MazePiece[] = [
            //Player: 0 here.
            { row: 0, column: 0, pieceImage: _images.getPiecesRed()[3], pieceNumber: 3, orientation: 1, isFixed:  false, player:  playerNumber, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 
            { row: 0, column: 1, pieceImage: _images.getPiecesRed()[0], pieceNumber: 0, orientation: 1, isFixed:  false, player: -1, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 
            { row: 0, column: 2, pieceImage: _images.getPiecesRed()[0], pieceNumber: 0, orientation: 1, isFixed:  false, player: -1, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 
            { row: 0, column: 3, pieceImage: _images.getPiecesRed()[0], pieceNumber: 0, orientation: 1, isFixed:  false, player: -1, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 
            { row: 0, column: 4, pieceImage: _images.getPiecesRed()[3], pieceNumber: 3, orientation: 2, isFixed:  false, player: -1, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 

            { row: 1, column: 0, pieceImage: _images.getPiecesRed()[2], pieceNumber: 2, orientation: 0, isFixed:  false, player: -1, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 
            { row: 1, column: 1, pieceImage: _images.getPiecesRed()[0], pieceNumber: 0, orientation: 1, isFixed:  false, player: -1, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 
            { row: 1, column: 2, pieceImage: _images.getPiecesRed()[0], pieceNumber: 0, orientation: 1, isFixed:  false, player: -1, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 
            { row: 1, column: 3, pieceImage: _images.getPiecesRed()[0], pieceNumber: 0, orientation: 1, isFixed:  false, player: -1, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 
            { row: 1, column: 4, pieceImage: _images.getPiecesRed()[2], pieceNumber: 2, orientation: 2, isFixed:  false, player: -1, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 

            { row: 2, column: 0, pieceImage: _images.getPiecesRed()[2], pieceNumber: 2, orientation: 0, isFixed:  false, player: -1, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 
            { row: 2, column: 1, pieceImage: _images.getPiecesRed()[0], pieceNumber: 0, orientation: 1, isFixed:  false, player: -1, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 
            { row: 2, column: 2, pieceImage: _images.getPiecesRed()[0], pieceNumber: 0, orientation: 1, isFixed:  false, player: -1, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 
            { row: 2, column: 3, pieceImage: _images.getPiecesRed()[0], pieceNumber: 0, orientation: 1, isFixed:  false, player: -1, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 
            { row: 2, column: 4, pieceImage: _images.getPiecesRed()[2], pieceNumber: 2, orientation: 2, isFixed:  false, player: -1, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 

            { row: 3, column: 0, pieceImage: _images.getPiecesRed()[2], pieceNumber: 2, orientation: 0, isFixed:  false, player: -1, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 
            { row: 3, column: 1, pieceImage: _images.getPiecesRed()[0], pieceNumber: 0, orientation: 1, isFixed:  false, player: -1, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 
            { row: 3, column: 2, pieceImage: _images.getPiecesRed()[0], pieceNumber: 0, orientation: 1, isFixed:  false, player: -1, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 
            { row: 3, column: 3, pieceImage: _images.getPiecesRed()[0], pieceNumber: 0, orientation: 1, isFixed:  false, player: -1, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 
            { row: 3, column: 4, pieceImage: _images.getPiecesRed()[2], pieceNumber: 2, orientation: 2, isFixed:  false, player: -1, hasTreasure:  false, treasureForPlayer: -1, treasureImage: '' }, 

            { row: 4,column: 0,pieceImage: _images.getPiecesRed()[3],pieceNumber: 3,orientation: 0,isFixed:  false,player: -1,hasTreasure:  false,treasureForPlayer: -1,treasureImage: '' },
            { row: 4,column: 1,pieceImage: _images.getPiecesRed()[0],pieceNumber: 0,orientation: 1,isFixed:  false,player: -1,hasTreasure:  false,treasureForPlayer: -1,treasureImage: '' },
            { row: 4,column: 2,pieceImage: _images.getPiecesRed()[0],pieceNumber: 0,orientation: 1,isFixed:  false,player: -1,hasTreasure:  false,treasureForPlayer: -1,treasureImage: '' },
            { row: 4,column: 3,pieceImage: _images.getPiecesRed()[0],pieceNumber: 0,orientation: 1,isFixed:  false,player: -1,hasTreasure:  false,treasureForPlayer: -1,treasureImage: '' },
            { row: 4,column: 4,pieceImage: _images.getPiecesRed()[3],pieceNumber: 3,orientation: 3,isFixed:  false,player: -1,hasTreasure:  true,treasureForPlayer: 0,treasureImage: 'Treasure Here' },
        ];

        return maze;
    }

    it('test method: createAndFillMatrix()', () => {
        let testMatrix: number[][] = testClass.createAndFillMatrix(testPaths, 5, 5);

        let expectations: number[][] = [[1, 1, 1, 1, 1],
                                        [0, 0, 0, 0, 1], 
                                        [0, 0, 0, 0, 1],
                                        [0, 0, 0, 0, 1],
                                        [0, 0, 0, 0, 1]];

        expect(testMatrix).toEqual(expectations);
    });

    it('test method: removeDeadEndsFromMatrixSimpleMethod()', () => {
        let start: number[] = [0, 0];
        let destination: number[] = [4, 4];

        let testMatrix: number[][] = [[1, 1, 1, 1, 1],
                                      [1, 0, 1, 0, 1], //Contains dead end at index: 0 and 2
                                      [1, 0, 1, 0, 1], //Contains dead end at index: 0 and 2
                                      [1, 0, 1, 0, 1], //Contains dead end at index: 0 and 2
                                      [1, 0, 1, 0, 1]]; //Contains dead end at index: 0 and 2


        let expectations: number[][] = [[1, 1, 1, 1, 1],
                                        [0, 0, 0, 0, 1],
                                        [0, 0, 0, 0, 1],
                                        [0, 0, 0, 0, 1],
                                        [0, 0, 0, 0, 1]];

        expect(testClass.removeDeadEndsFromMatrixSimpleMethod(testMatrix, start, destination)).toEqual(expectations);
    });

    it('test method: removeDeadEndsFromMatrixComplexMethod()', () => {
        //Adapt test maze. Close certain routes.
        let testMaze: MazePiece[] = getMaze5x5();
        testMaze[6].orientation = 0;
        testMaze[11].orientation = 0;
        testMaze[16].orientation = 0;
        testMaze[21].orientation = 0;
        testMaze[8].orientation = 0;
        testMaze[13].orientation = 0;
        testMaze[18].orientation = 0;
        testMaze[23].orientation = 0;

        let start: number[] = [0, 0];
        let destination: number[] = [4, 4];

        let testMatrix: number[][] = [[1, 1, 1, 1, 1],
                                      [1, 0, 1, 0, 1], //Contains dead end at index: 0 and 2
                                      [1, 0, 1, 0, 1], //Contains dead end at index: 0 and 2
                                      [1, 0, 1, 0, 1], //Contains dead end at index: 0 and 2
                                      [1, 0, 1, 0, 1]]; //Contains dead end at index: 0 and 2
        
        let expectations: number[][] = [[1, 1, 1, 1, 1],
                                        [0, 0, 0, 0, 1],
                                        [0, 0, 0, 0, 1],
                                        [0, 0, 0, 0, 1],
                                        [0, 0, 0, 0, 1]];
        
        expect(testClass.removeDeadEndsFromMatrixComplexMethod(testMaze, testMatrix, start, destination)).toEqual(expectations);
    });

});