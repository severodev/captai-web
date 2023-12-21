import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountabilityContributionGridComponent } from './accountability-contribution-grid.component';

describe('AccountabilityContributionGridComponent', () => {
  let component: AccountabilityContributionGridComponent;
  let fixture: ComponentFixture<AccountabilityContributionGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountabilityContributionGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountabilityContributionGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
