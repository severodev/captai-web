import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountabilityContributionCardComponent } from './accountability-contribution-card.component';

describe('AccountabilityContributionCardComponent', () => {
  let component: AccountabilityContributionCardComponent;
  let fixture: ComponentFixture<AccountabilityContributionCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountabilityContributionCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountabilityContributionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
