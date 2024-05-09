import { TestBed } from '@angular/core/testing';

import { LastInsertedPositionService } from './last-inserted-position.service';

describe('LastInsertedPieceService', () => {
  let service: LastInsertedPositionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LastInsertedPositionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
