import { TestBed } from '@angular/core/testing';

import { ApiSpoonacularService } from './api-spoonacular.service';

describe('ApiSpoonacularService', () => {
  let service: ApiSpoonacularService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiSpoonacularService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
