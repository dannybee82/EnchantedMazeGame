import { TestBed } from '@angular/core/testing';
import { TurnAndScoreboardService } from './turn-and-scoreboard.service';
import { MazeTreasures } from '../models/MazeTreasures';

describe('TurnAndScoreboardService', () => {
  let service: TurnAndScoreboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TurnAndScoreboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('test methods: setTotalTurns() & getTotalTurns()', () => {
    let testsAndExpectations: number[] = [0, 1, 5, 10, 25];

    for(let i = 0; i < testsAndExpectations.length; i++) {
      service.setTotalTurns(testsAndExpectations[i]);
      expect(service.getTotalTurns()).toBe(testsAndExpectations[i]);
    }
  });

  it('test methods: setPlayers() and getPlayers()', () => {
    let tests: number[] = [-1, 0, 1, 2, 3, 4, 5];
    let expectations: number[] = [1, 1, 1, 2, 3, 4, 4];

    for(let i = 0; i < tests.length; i++) {
      service.setPlayers(tests[i]);
      expect(service.getPlayers().length).toBe(expectations[i]);
    }
  });

  it('test methods: setScore(), updateScore() and getScore()', () => {
    let initialExpectation: number[] = [0, 0, 0, 0];
    
    service.setScore(4);
    expect(service.getScore()).toEqual(initialExpectation);

    //Update.
    service.updateScore(0);
    service.updateScore(0);
    service.updateScore(1);
    service.updateScore(3);

    let expectedScore: number[] = [2, 1, 0, 1]

    expect(service.getScore()).toEqual(expectedScore);
  });

  it('test methods: setCurrentPlayerTurn() & getCurrentPlayerTurn()', () => {
    let tests: number[] = [0, 1, 2, 3];

    for(let i = 0; i < tests.length; i++) {
      service.setCurrentPlayerTurn(tests[i]);
      expect(service.getCurrentPlayerTurn()).toBe(tests[i]);
    }
  });

  it('test methods: setPlayersTreasures() & getPlayersTreasures()', () => {
    let testTreasures: MazeTreasures[] = [
      new MazeTreasures(0, 'some_image_001.jpg', 0, false),
      new MazeTreasures(1, 'some_image_002.jpg', 1, true)
    ];

    service.setPlayersTreasures(testTreasures);

    for(let i = 0; i < testTreasures.length; i++) {
      expect(service.getPlayersTreasures()[i]).toEqual(testTreasures[i]);
    }
  });

  it('test methods: setIsGameEnded() & getIsGameEnded()', () => {
    //Default value
    expect(service.getIsGameEnded()).toBeFalse();

    service.setIsGameEnded(true);
    
    expect(service.getIsGameEnded()).toBeTrue();
  });

  it('test method: setMessage() and getMessage()', () => {
    service.setMessage("Some Test Message");

    expect(service.getMessage()).toContain("Some Test Message");
  });


  it('test ReplaySubject: _firstInitialization', () => {
    let isFired: boolean = false;

    service.getFirstInitialization().subscribe({
      next: (result) => {
        isFired = result;
      }      
    });

    service.setFirstInitialization(true);

    expect(isFired).toBeTrue();
  });

  it('test ReplaySubject: _updateTurnAndScore', () => {
    let isFired: boolean = false;

    service.getUpdateTurnAndScore().subscribe({
      next: (result) => {
        isFired = result;
      }      
    });

    service.setUpdateTurnAndScore(true);

    expect(isFired).toBeTrue();
  });

});