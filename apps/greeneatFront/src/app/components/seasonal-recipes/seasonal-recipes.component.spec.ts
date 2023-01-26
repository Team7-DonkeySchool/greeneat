import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonalRecipesComponent } from './seasonal-recipes.component';

describe('SeasonalRecipesComponent', () => {
  let component: SeasonalRecipesComponent;
  let fixture: ComponentFixture<SeasonalRecipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeasonalRecipesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeasonalRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
