import { TestBed } from '@angular/core/testing';

import { TreasureService } from './treasure.service';

describe('TreasureService', () => {
  let service: TreasureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TreasureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
