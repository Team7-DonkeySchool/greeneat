import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourRecipeComponent } from './your-recipe.component';

describe('YourRecipeComponent', () => {
  let component: YourRecipeComponent;
  let fixture: ComponentFixture<YourRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YourRecipeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YourRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
