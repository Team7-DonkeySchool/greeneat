import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputIngredientComponent } from './input-ingredient.component';

describe('InputIngredientComponent', () => {
  let component: InputIngredientComponent;
  let fixture: ComponentFixture<InputIngredientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputIngredientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputIngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
