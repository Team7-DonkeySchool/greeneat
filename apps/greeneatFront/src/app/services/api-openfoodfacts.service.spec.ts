import { TestBed } from '@angular/core/testing';

import { ApiOpenfoodfactsService } from './api-openfoodfacts.service';

describe('ApiOpenfoodfactsService', () => {
  let service: ApiOpenfoodfactsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiOpenfoodfactsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
