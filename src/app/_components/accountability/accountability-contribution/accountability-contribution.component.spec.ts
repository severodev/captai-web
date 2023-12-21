import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountabilityContributionComponent } from './accountability-contribution.component';

describe('AccountabilityContributionComponent', () => {
  let component: AccountabilityContributionComponent;
  let fixture: ComponentFixture<AccountabilityContributionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountabilityContributionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountabilityContributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
