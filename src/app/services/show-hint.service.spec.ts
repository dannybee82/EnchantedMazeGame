import { TestBed } from '@angular/core/testing';

import { ShowHintService } from './show-hint.service';

describe('ShowHintService', () => {
  let service: ShowHintService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowHintService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
