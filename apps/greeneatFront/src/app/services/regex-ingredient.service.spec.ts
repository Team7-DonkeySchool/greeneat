import { TestBed } from '@angular/core/testing';

import { RegexIngredientService } from './regex-ingredient.service';

describe('RegexIngredientService', () => {
  let service: RegexIngredientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegexIngredientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
