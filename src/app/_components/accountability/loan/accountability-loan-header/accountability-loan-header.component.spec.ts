import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountabilityLoanHeaderComponent } from './accountability-loan-header.component';

describe('AccountabilityLoanHeaderComponent', () => {
  let component: AccountabilityLoanHeaderComponent;
  let fixture: ComponentFixture<AccountabilityLoanHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountabilityLoanHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountabilityLoanHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
