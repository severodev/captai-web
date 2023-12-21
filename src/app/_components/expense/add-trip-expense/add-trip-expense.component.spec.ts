import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTripExpenseComponent } from './add-trip-expense.component';

describe('AddTripExpenseComponent', () => {
  let component: AddTripExpenseComponent;
  let fixture: ComponentFixture<AddTripExpenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTripExpenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTripExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
