import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelRecipeComponent } from './panel-recipe.component';

describe('PanelRecipeComponent', () => {
  let component: PanelRecipeComponent;
  let fixture: ComponentFixture<PanelRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelRecipeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
