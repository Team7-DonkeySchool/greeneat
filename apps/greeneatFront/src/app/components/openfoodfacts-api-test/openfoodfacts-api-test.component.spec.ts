import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenfoodfactsApiTestComponent } from './openfoodfacts-api-test.component';

describe('OpenfoodfactsApiTestComponent', () => {
  let component: OpenfoodfactsApiTestComponent;
  let fixture: ComponentFixture<OpenfoodfactsApiTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenfoodfactsApiTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenfoodfactsApiTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
