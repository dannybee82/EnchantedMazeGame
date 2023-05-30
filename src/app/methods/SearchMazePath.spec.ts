import { SearchMazePath } from "./SearchMazePath";
import { MazePiece } from "../models/MazePiece";
import { PieceImages } from "./PieceImages";
import { MazePaths } from "../models/MazePaths";
import { Misc } from "./Misc";

describe('Class SearchMazePath', () => {   
    
    let testClass: SearchMazePath = new SearchMazePath();
    let misc: Misc = new Misc();

    let _images: PieceImages = new PieceImages();

    let playerNumber: number = 0;
    let treasureIndex: number = 0;
    
    //Create a simple test maze. 3 x 3 with treasure at bottom right corner
    let testMaze: MazePiece[] =  [];

    let mazePaths: MazePaths[] = [];    

    beforeEach(() => {
        testClass.clearPaths();
        testMaze = generateMaze();
        mazePaths = generatePaths();
    });

    function generateMaze() : MazePiece[] {
        let maze: MazePiece[] = [
            new MazePiece(0, 0, _images.getPiecesRed()[3], 3, 1, false, playerNumber, false, -1, -1), //Player: 0 here.
            new MazePiece(0, 1, _images.getPiecesRed()[0], 0, 1, false, -1, false, -1, -1),
            new MazePiece(0, 2, _images.getPiecesRed()[3], 3, 2, false, -1, false, -1, -1),
        
            new MazePiece(1, 0, _images.getPiecesRed()[2], 2, 0, false, -1, false, -1, -1),
            new MazePiece(1, 1, _images.getPiecesRed()[0], 0, 1, false, -1, false, -1, -1),
            new MazePiece(1, 2, _images.getPiecesRed()[2], 2, 2, false, -1, false, -1, -1),
        
            new MazePiece(2, 0, _images.getPiecesRed()[3], 3, 0, false, -1, false, -1, -1),
            new MazePiece(2, 1, _images.getPiecesRed()[0], 0, 1, false, -1, false, -1, -1),
            new MazePiece(2, 2, _images.getPiecesRed()[3], 3, 3, false, -1, true, 0, treasureIndex, 'Treasure Here')
        ];
        
        return maze;
    }

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

    function generatePaths() : MazePaths[] {
        let paths: MazePaths[] = [
            new MazePaths(0, 0),
            new MazePaths(0, 1),
            new MazePaths(0, 2),
            new MazePaths(1, 2),
            new MazePaths(1, 1),
            new MazePaths(1, 0),
            new MazePaths(2, 0),
            new MazePaths(2, 1),
            new MazePaths(2, 2),
        ];

        return paths;
    }

    it('test method: search()', () => {
        let getPaths: MazePaths[] = testClass.search(playerNumber, testMaze);
        expect(getPaths.length).toBe(9);

        //Block paths in middle.
        testMaze[1].orientation = 0;
        testMaze[4].orientation = 0;
        testMaze[5].orientation = 3;

        getPaths = testClass.search(playerNumber, testMaze);
        expect(getPaths.length).toBe(5);

        //Block player start position
        testMaze[3].orientation = 1;
        getPaths = testClass.search(playerNumber, testMaze);

        expect(getPaths.length).toBe(1);
    });

    it('test method: showPlayerPaths()', () => {
        testMaze = testClass.showPlayerPaths(testMaze, mazePaths, true);

        for(let i = 0; i < testMaze.length; i++) {
            expect(testMaze[i].pieceImage).toContain('_path');
        }

        testMaze = testClass.showPlayerPaths(testMaze, mazePaths, false);

        for(let i = 0; i < testMaze.length; i++) {
            expect(testMaze[i].pieceImage).not.toContain('_path');
        }
    });

    it('test method: findShortestWay() - maze 5x5 - test 1', () => {
        let testMaze5x5: MazePiece[] = getMaze5x5();
        let paths: MazePaths[] = testClass.search(playerNumber, testMaze5x5);
        let playerIndex: number = misc.findIndexOfPlayer(testMaze5x5, playerNumber);
        let treasureIndex: number = misc.findIndexOfTreasure(testMaze5x5, playerNumber);
        
        let shortestWay: number[][] = testClass.findShortestWay(testMaze5x5, paths, testMaze5x5[playerIndex].row, testMaze5x5[playerIndex].column, 
                                                                testMaze5x5[treasureIndex].row, testMaze5x5[treasureIndex].column );
        
        let expectations: number[][] = [[0,0],[1,0],[2,0],[3,0],[4,0],[4,1],[4,2],[4,3],[4,4]];
                                        
        expect(shortestWay).toEqual(expectations);
    });

    it('test method: findShortestWay() - maze 5x5 - test 2', () => {
        //Below: close some paths.
        let testMaze5x5: MazePiece[] = getMaze5x5();
        testMaze5x5[1].orientation = 0; 
        testMaze5x5[7].orientation = 0;
        testMaze5x5[13].orientation = 0;

        let paths: MazePaths[] = testClass.search(playerNumber, testMaze5x5);
        let playerIndex: number = misc.findIndexOfPlayer(testMaze5x5, playerNumber);
        let treasureIndex: number = misc.findIndexOfTreasure(testMaze5x5, playerNumber);
        
        let shortestWay: number[][] = testClass.findShortestWay(testMaze5x5, paths, testMaze5x5[playerIndex].row, testMaze5x5[playerIndex].column, 
                                                                testMaze5x5[treasureIndex].row, testMaze5x5[treasureIndex].column );
           
        let expectations: number[][] = [[0,0],[1,0],[2,0],[3,0],[4,0],[4,1],[4,2],[4,3],[4,4]];
                                        
        expect(shortestWay).toEqual(expectations);
    });

    it('test method: findShortestWay() - maze 5x5 - test 3 - path through middle', () => {
        //Below: open shorter path by pieces that are open from all sides.
        let testMaze5x5: MazePiece[] = getMaze5x5();        
        testMaze5x5[2].pieceNumber = 1; //open
        testMaze5x5[5].orientation = 0; //Close
        testMaze5x5[5].pieceNumber = 0; //Close
        testMaze5x5[5].orientation = 1; //Close
        testMaze5x5[7].pieceNumber = 1; //open
        testMaze5x5[8].pieceNumber = 0; //Close
        testMaze5x5[8].orientation = 1; //Close
        testMaze5x5[12].pieceNumber = 1; //open
        testMaze5x5[13].pieceNumber = 0; //Close
        testMaze5x5[13].orientation = 1; //Close
        testMaze5x5[17].pieceNumber = 1; //open
        testMaze5x5[18].pieceNumber = 0; //Close
        testMaze5x5[18].orientation = 1; //Close
        testMaze5x5[22].pieceNumber = 1; //open

        let paths: MazePaths[] = testClass.search(playerNumber, testMaze5x5);
        let playerIndex: number = misc.findIndexOfPlayer(testMaze5x5, playerNumber);
        let treasureIndex: number = misc.findIndexOfTreasure(testMaze5x5, playerNumber);
        
        let shortestWay: number[][] = testClass.findShortestWay(testMaze5x5, paths, testMaze5x5[playerIndex].row, testMaze5x5[playerIndex].column, 
                                                                testMaze5x5[treasureIndex].row, testMaze5x5[treasureIndex].column );
            
        let expectations: number[][] = [[0,0],[0,1],[0,2],[1,2],[2,2],[3,2],[4,2],[4,3],[4,4]];

        //not perfect, but acceptable.
        expect(shortestWay).toEqual(expectations);
    });

    it('test method: findShortestWay() - maze 5x5 - test 4 -> from south to north', () => {        
        let testMaze5x5: MazePiece[] = getMaze5x5();
        testMaze5x5[0].player = -1;
        testMaze5x5[0].treasureForPlayer = 0;
        testMaze5x5[24].player = 0;
        testMaze5x5[24].treasureForPlayer = -1;

        let paths: MazePaths[] = testClass.search(playerNumber, testMaze5x5);
        let playerIndex: number = misc.findIndexOfPlayer(testMaze5x5, playerNumber);
        let treasureIndex: number = misc.findIndexOfTreasure(testMaze5x5, playerNumber);
        
        let shortestWay: number[][] = testClass.findShortestWay(testMaze5x5, paths, testMaze5x5[playerIndex].row, testMaze5x5[playerIndex].column, 
                                                                testMaze5x5[treasureIndex].row, testMaze5x5[treasureIndex].column );
        
        let expectations: number[][] = [[4,4],[3,4],[2,4],[1,4],[0,4],[0,3],[0,2],[0,1],[0,0]];

        expect(shortestWay).toEqual(expectations);
    });

    it('test method: findShortestWay() - maze 5x5 - test 5 - treasure in middle', () => {
        //Below: close some paths.
        let testMaze5x5: MazePiece[] = getMaze5x5();
        testMaze5x5[24].treasureForPlayer = -1; //remove treasure.

        testMaze5x5[1].orientation = 0;
        testMaze5x5[6].orientation = 0;
        testMaze5x5[11].orientation = 0;
        testMaze5x5[16].orientation = 0;
        testMaze5x5[17].pieceNumber = 1; //replace piece.
        testMaze5x5[18].pieceNumber = 1; //replace piece.                
        testMaze5x5[12].pieceNumber = 0; //replace piece.
        testMaze5x5[12].treasureForPlayer = 0;
        testMaze5x5[24].pieceNumber = 1; //replace piece.     

        let paths: MazePaths[] = testClass.search(playerNumber, testMaze5x5);
        let playerIndex: number = misc.findIndexOfPlayer(testMaze5x5, playerNumber);
        let treasureIndex: number = misc.findIndexOfTreasure(testMaze5x5, playerNumber);
        
        let shortestWay: number[][] = testClass.findShortestWay(testMaze5x5, paths, testMaze5x5[playerIndex].row, testMaze5x5[playerIndex].column, 
                                                                testMaze5x5[treasureIndex].row, testMaze5x5[treasureIndex].column );
        //console.log(JSON.stringify(shortestWay));
        let expectations: number[][] = [[0,0],[1,0],[2,0],[3,0],[4,0],[4,1],[4,2],[4,3],[4,4],[3,4],[2,4],[2,3],[2,2]];
                                       
        //not perfect, but again, acceptable.
        expect(shortestWay).toEqual(expectations);
    });

    it('test private method: getPrioritiesOfDirection()', () => {
        let startRow: number = 2;
        let startColumn: number = 2;
        let destinations: number[][] = [[0, 1],
                                        [1, 4],
                                        [4, 1],
                                        [4, 3],
                                        [2, 0],
                                        [2, 4],
                                        [0, 2],
                                        [4, 2],
                                        [2, 2]];
        
        //expectations: 0 for North, 1 for East, 2 for South, 3 for West.
        let expectations: number[][] = [[0, 3, 2, 1],
                                        [0, 1, 2, 3],
                                        [2, 3, 0, 1],
                                        [2, 1, 0, 3],
                                        [3, 1, 0, 2],
                                        [1, 3, 0, 2],
                                        [0, 2, 1, 3],
                                        [2, 0, 1, 3],
                                        [0, 1, 2, 3]
                                    ];

        for(let i = 0; i < destinations.length; i++) {
            //@ts-ignore
            expect(testClass.getPrioritiesOfDirection(startRow, startColumn, destinations[i])).toEqual(expectations[i]);

            //@ts-ignore
            //console.log(JSON.stringify(destinations[i]) + "::" + JSON.stringify(testClass.getPrioritiesOfDirection(startRow, startColumn, destinations[i])) + "::" + JSON.stringify(expectations[i]))
        }
    });

    it('test private method: checkOtherPlayersAtPath()', () => {        
        let testMaze5x5: MazePiece[] = getMaze5x5();
        testMaze5x5[5].player = 1; //Add player.
        testMaze5x5[10].player = 2; //Add player.
        testMaze5x5[21].player = 3; //Add player.
        testMaze5x5[23].player = 4; //Add player.

        let paths: MazePaths[] = testClass.search(playerNumber, testMaze5x5);
        let playerIndex: number = misc.findIndexOfPlayer(testMaze5x5, playerNumber);
        let treasureIndex: number = misc.findIndexOfTreasure(testMaze5x5, playerNumber);
        
        let shortestWay: number[][] = testClass.findShortestWay(testMaze5x5, paths, testMaze5x5[playerIndex].row, testMaze5x5[playerIndex].column, 
                                                                testMaze5x5[treasureIndex].row, testMaze5x5[treasureIndex].column );
        
        //@ts-ignore
        shortestWay = testClass.checkOtherPlayersAtPath(testMaze5x5, shortestWay);

        expect(shortestWay.length).toBe(5); //9 - 4 = 5.
    });

    it('test private method: checkStartAndDestinationNotAdjacent()', () => {
        let starts: number[][] = [[0, 1],
                                  [1, 0], 
                                  [2, 2],
                                  [4, 1]];

        let destinations: number[][] = [ [0, 2],
                                         [0, 0],
                                         [2, 4],
                                         [3, 3] ];

        let expectations: boolean[] = [false, //adjacent.
                                       false, //adjacent.
                                       true, //not adjacent.
                                       true]; //not adjacent.
        
        for (let i = 0; i < expectations.length; i++) {
            //@ts-ignore
            expect(testClass.checkStartAndDestinationNotAdjacent(starts[i], destinations[i])).toBe(expectations[i]);
        }                        
    });


});