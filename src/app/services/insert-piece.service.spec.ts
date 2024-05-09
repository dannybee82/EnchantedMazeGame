import { TestBed } from '@angular/core/testing';

import { InsertPieceService } from './insert-piece.service';

describe('CurrentPieceService', () => {
  let service: InsertPieceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsertPieceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
