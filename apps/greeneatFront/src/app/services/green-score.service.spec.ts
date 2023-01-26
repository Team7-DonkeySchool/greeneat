import { TestBed } from '@angular/core/testing';

import { GreenScoreService } from './green-score.service';

describe('GreenScoreService', () => {
  let service: GreenScoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GreenScoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
