import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountabilityContributionHeaderComponent } from './accountability-contribution-header.component';

describe('AccountabilityContributionHeaderComponent', () => {
  let component: AccountabilityContributionHeaderComponent;
  let fixture: ComponentFixture<AccountabilityContributionHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountabilityContributionHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountabilityContributionHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
