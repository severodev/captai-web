import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountabilityLoanFormComponent } from './accountability-loan-form.component';

describe('AccountabilityLoanFormComponent', () => {
  let component: AccountabilityLoanFormComponent;
  let fixture: ComponentFixture<AccountabilityLoanFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountabilityLoanFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountabilityLoanFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
