import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountabilityLoanCardComponent } from './accountability-loan-card.component';

describe('AccountabilityLoanCardComponent', () => {
  let component: AccountabilityLoanCardComponent;
  let fixture: ComponentFixture<AccountabilityLoanCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountabilityLoanCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountabilityLoanCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
