import { TestBed } from '@angular/core/testing';

import { MazeService } from './maze.service';

import { MazePiece } from '../models/MazePiece';
import { MazeTreasures } from '../models/MazeTreasures';

describe('MazeService', () => {
  let service: MazeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MazeService);
  });

  afterEach(() => {
    service.clearAllPieces();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('test method: generate()', () => {
    let fixedPieces: number = 25;
    let otherPieces: number = 56;
    let countedFixedPieces: number = 0;
    let countedOtherPieces: number = 0;

    service.generate(1);

    let pieces: MazePiece[] = service.getAllPieces();

    for(let i = 0; i < pieces.length; i++) {
      if(pieces[i].isFixed) {
        countedFixedPieces++;
      } else {
        countedOtherPieces++;
      }
    }

    expect(fixedPieces).toBe(countedFixedPieces);
    expect(otherPieces).toBe(countedOtherPieces);  

  });

  it('test method: addPlayers()', () => {
    service.generate(1);
    service.addPlayers(4);
    let pieces: MazePiece[] = service.getAllPieces();

    let expectedStartPoints: number[] = [0, 8, 72, 80];

    for(let i = 0; i < expectedStartPoints.length; i++) {
      let targetIndex: number = expectedStartPoints[i];
      expect(pieces[targetIndex].player).toBe(i);
    }
  });

  it('test method: generateStartPiece()', () => {
    let test: MazePiece = service.generateStartPiece();

    expect(test.row).toBe(-1);
    expect(test.column).toBe(-1);
    expect(test.pieceImage).toContain("red");
    expect(test.hasTreasure).toBeFalse();
    expect(test.isFixed).toBeFalse();
    expect(test.player).toBe(-1);
    expect(test.treasureForPlayer).toBe(-1);
    expect(test.treasureIndex).toBe(-1);
    expect(test.treasureImage).toBeUndefined();
  });

  it('test method: placeTreasureInMaze()', () => {
    service.generate(1);
    let pieces: MazePiece[] = service.getAllPieces();

    let treasure: MazeTreasures = new MazeTreasures(0, 'test1-test2-test3', -1, false);

    pieces = service.placeTreasureInMaze(pieces, treasure, 0);

    let indexOfTreasure: number = pieces.findIndex(item => item.hasTreasure == true);
    
    expect(indexOfTreasure).toBeGreaterThan(-1);

    if(indexOfTreasure > -1) {
      let treasureFromMaze: MazePiece = pieces[indexOfTreasure];      
      expect(treasureFromMaze.treasureImage).toContain('test1-test2-test3');
      expect(treasureFromMaze.treasureForPlayer).toBe(0);
    }

  });

});