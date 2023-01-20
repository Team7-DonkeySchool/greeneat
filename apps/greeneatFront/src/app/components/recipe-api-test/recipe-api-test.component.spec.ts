import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeApiTestComponent } from './recipe-api-test.component';

describe('RecipeApiTestComponent', () => {
  let component: RecipeApiTestComponent;
  let fixture: ComponentFixture<RecipeApiTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeApiTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeApiTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
