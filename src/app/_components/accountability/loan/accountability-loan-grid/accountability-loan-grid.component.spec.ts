import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountabilityLoanGridComponent } from './accountability-loan-grid.component';

describe('AccountabilityLoanGridComponent', () => {
  let component: AccountabilityLoanGridComponent;
  let fixture: ComponentFixture<AccountabilityLoanGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountabilityLoanGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountabilityLoanGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
