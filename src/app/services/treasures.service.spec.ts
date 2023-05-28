import { TestBed } from '@angular/core/testing';

import { TreasuresService } from './treasures.service';

describe('TreasuresService', () => {
  let service: TreasuresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TreasuresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
