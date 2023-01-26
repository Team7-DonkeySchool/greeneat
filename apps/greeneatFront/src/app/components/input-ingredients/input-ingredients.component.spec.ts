import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputIngredientsComponent } from './input-ingredients.component';

describe('InputIngredientsComponent', () => {
  let component: InputIngredientsComponent;
  let fixture: ComponentFixture<InputIngredientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputIngredientsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputIngredientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
