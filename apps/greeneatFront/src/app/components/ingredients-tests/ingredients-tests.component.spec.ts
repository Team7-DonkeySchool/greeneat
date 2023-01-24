import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientsTestsComponent } from './ingredients-tests.component';

describe('IngredientsTestsComponent', () => {
  let component: IngredientsTestsComponent;
  let fixture: ComponentFixture<IngredientsTestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngredientsTestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngredientsTestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
