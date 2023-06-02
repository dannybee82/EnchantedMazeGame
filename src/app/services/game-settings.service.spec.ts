import { TestBed } from '@angular/core/testing';

import { GameSettingsService } from './game-settings.service';

describe('GameSettingsService', () => {
  let service: GameSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('test methods: setAmountOfPlayers() & getAmountOfPlayers()', () => {
    let tests: number[] = [-1, 0, 1, 2, 3, 4, 5]
    let expectations: number[] = [1, 1, 1, 2, 3, 4, 4];

    for(let i = 0; i < tests.length; i++) {
      service.setAmountOfPlayers(tests[i]);
      expect(service.getAmountOfPlayers()).toBe(expectations[i]);
    }
  });

  it('test methods: setAmountOfTreasures() & getAmountOfTreasures()', () => {
    let tests: number[] = [-1, 0, 1, 25, 33, 42, 51, 60]
    let expectations: number[] = [1, 1, 1, 25, 33, 42, 51, 51];

    for(let i = 0; i < tests.length; i++) {
      service.setAmountOfTreasures(tests[i]);
      expect(service.getAmountOfTreasures()).toBe(expectations[i]);
    }
  });

  it('test method: getMaximumAmountOfTreasures()', () => {
    expect(service.getMaximumAmountOfTreasures()).toBe(51);
  });

  it('test method: setHumanOrCpu() and getHumanOrCpu()', () => {
    let test: boolean[] = [false, false, false, true];
    service.setHumanOrCpu(test);

    let setPlayers: boolean[] = service.getHumanOrCpu();

    for(let i = 0; i < setPlayers.length; i++) {
      expect(setPlayers[i]).toEqual(test[i]);
    }
  });

  it('test methods: setDifficulty() & getDifficulty()', () => {
    let tests: number[] = [-1, 0, 1, 2, 3, 4]
    let expectations: number[] = [1, 1, 1, 2, 3, 3];

    for(let i = 0; i < tests.length; i++) {
      service.setDifficulty(tests[i]);
      expect(service.getDifficulty()).toBe(expectations[i]);
    }
  });

  it('test method: setUseRandomStartLocations() & getUseRandomStartLocations()', () => {
    //Default value.
    expect(service.getRandomStartLocations()).toBeFalse();

    service.setRandomStartLocations(true);

    expect(service.getRandomStartLocations()).toBeTrue();
  });

  it('test method resetDefaults()', () => {
    service.setAmountOfPlayers(3);
    service.setAmountOfTreasures(12);
    service.setDifficulty(2);
    service.setHumanOrCpu([false, false, false, true]);
    service.resetDefaults();

    expect(service.getAmountOfPlayers()).toBe(-1);
    expect(service.getAmountOfTreasures()).toBe(-1);
    expect(service.getDifficulty()).toBe(1);
    expect(service.getHumanOrCpu()).toEqual([]);
  });

  it('test method getStartGame() and setStartGame() -> BehaviorSubject', () => {
    let hasFired: boolean = false;

    service.getStartGame().subscribe({
      next: (result) => {
        hasFired = result;
      }
    });

    service.setStartGame(true);

    expect(hasFired).toBeTrue();
  });


});