import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseInstallmentsTableComponent } from './expense-installments-table.component';

describe('ExpenseInstallmentsTableComponent', () => {
  let component: ExpenseInstallmentsTableComponent;
  let fixture: ComponentFixture<ExpenseInstallmentsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseInstallmentsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseInstallmentsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
