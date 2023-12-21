import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierExpenseComponent } from './supplier-expense.component';

describe('SupplierExpenseComponent', () => {
  let component: SupplierExpenseComponent;
  let fixture: ComponentFixture<SupplierExpenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierExpenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
