import { Matrix } from "./Matrix";
import { MazePaths } from "../models/MazePaths";
import { MazePiece } from "../models/MazePiece";
import { PieceImages } from "./PieceImages";

describe('Class Matrix', () => {  

    let testClass: Matrix = new Matrix();

    let testPaths: MazePaths[] = [
        new MazePaths(0, 0),
        new MazePaths(0, 1),
        new MazePaths(0, 2),
        new MazePaths(0, 3),
        new MazePaths(0, 4),
        new MazePaths(1, 4),
        new MazePaths(2, 4),
        new MazePaths(3, 4),
        new MazePaths(4, 4)
    ];

    let _images: PieceImages = new PieceImages();

    let playerNumber: number = 0;
    let treasureIndex: number = 0;

    function getMaze5x5() : MazePiece[] {
        let maze: MazePiece[] = [
            new MazePiece(0, 0, _images.getPiecesRed()[3], 3, 1, false, playerNumber, false, -1, -1), //Player: 0 here.
            new MazePiece(0, 1, _images.getPiecesRed()[0], 0, 1, false, -1, false, -1, -1),
            new MazePiece(0, 2, _images.getPiecesRed()[0], 0, 1, false, -1, false, -1, -1),
            new MazePiece(0, 3, _images.getPiecesRed()[0], 0, 1, false, -1, false, -1, -1),
            new MazePiece(0, 4, _images.getPiecesRed()[3], 3, 2, false, -1, false, -1, -1),

            new MazePiece(1, 0, _images.getPiecesRed()[2], 2, 0, false, -1, false, -1, -1),
            new MazePiece(1, 1, _images.getPiecesRed()[0], 0, 1, false, -1, false, -1, -1),
            new MazePiece(1, 2, _images.getPiecesRed()[0], 0, 1, false, -1, false, -1, -1),
            new MazePiece(1, 3, _images.getPiecesRed()[0], 0, 1, false, -1, false, -1, -1),
            new MazePiece(1, 4, _images.getPiecesRed()[2], 2, 2, false, -1, false, -1, -1),

            new MazePiece(2, 0, _images.getPiecesRed()[2], 2, 0, false, -1, false, -1, -1),
            new MazePiece(2, 1, _images.getPiecesRed()[0], 0, 1, false, -1, false, -1, -1),
            new MazePiece(2, 2, _images.getPiecesRed()[0], 0, 1, false, -1, false, -1, -1),
            new MazePiece(2, 3, _images.getPiecesRed()[0], 0, 1, false, -1, false, -1, -1),
            new MazePiece(2, 4, _images.getPiecesRed()[2], 2, 2, false, -1, false, -1, -1),

            new MazePiece(3, 0, _images.getPiecesRed()[2], 2, 0, false, -1, false, -1, -1),
            new MazePiece(3, 1, _images.getPiecesRed()[0], 0, 1, false, -1, false, -1, -1),
            new MazePiece(3, 2, _images.getPiecesRed()[0], 0, 1, false, -1, false, -1, -1),
            new MazePiece(3, 3, _images.getPiecesRed()[0], 0, 1, false, -1, false, -1, -1),
            new MazePiece(3, 4, _images.getPiecesRed()[2], 2, 2, false, -1, false, -1, -1),

            new MazePiece(4, 0, _images.getPiecesRed()[3], 3, 0, false, -1, false, -1, -1),
            new MazePiece(4, 1, _images.getPiecesRed()[0], 0, 1, false, -1, false, -1, -1),
            new MazePiece(4, 2, _images.getPiecesRed()[0], 0, 1, false, -1, false, -1, -1),
            new MazePiece(4, 3, _images.getPiecesRed()[0], 0, 1, false, -1, false, -1, -1),
            new MazePiece(4, 4, _images.getPiecesRed()[3], 3, 3, false, -1, true, 0, treasureIndex, 'Treasure Here')
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