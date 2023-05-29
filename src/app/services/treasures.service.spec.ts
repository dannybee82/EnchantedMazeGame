import { TestBed } from '@angular/core/testing';

import { TreasuresService } from './treasures.service';
import { MazeTreasures } from '../models/MazeTreasures';

describe('TreasuresService', () => {
  let service: TreasuresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TreasuresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('test method generateTreasures()', () => {
    let amounts: number[] = [1, 4, 16];
    let players: number[] = [1, 4, 4];

    for(let i = 0; i < amounts.length; i++) {
      service.generateTreasures(amounts[i], players[i]);

      let treasures: MazeTreasures[] = service.getMazeTreasures();

      expect(treasures.length).toBe(amounts[i]);

      for(let j = 0; j < treasures.length; j++) {
        if(j < players[i]) {
          expect(treasures[j].targetPlayer).toBe(j);
        } else {
          expect(treasures[j].targetPlayer).toBe(-1);
        }
      }     

      service.clearMazeTreasures();
    }
  });

  it('test methods: setTreasureFound(), amountOfTreasuresNotFound(), getNextTreasure()', () => {
    let amountOfTreasures: number = 4;
    let amounts: number[] = [3, 2, 1, 0];
    let expectations: any[] = [1, 2, 3, undefined];

    service.generateTreasures(amountOfTreasures, 1);

    expect(service.getMazeTreasures().length).toBe(amountOfTreasures);

    for(let i = 0; i < amountOfTreasures; i++) {
      service.setTreasureFound(i);
      expect(service.amountOfTreasuresNotFound()).toBe(amounts[i]);
      expect(service.getNextTreasure(0)?.index).toEqual(expectations[i]);
    }
  });



});