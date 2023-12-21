import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountabilityContributionFormComponent } from './accountability-contribution-form.component';

describe('AccountabilityContributionFormComponent', () => {
  let component: AccountabilityContributionFormComponent;
  let fixture: ComponentFixture<AccountabilityContributionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountabilityContributionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountabilityContributionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
