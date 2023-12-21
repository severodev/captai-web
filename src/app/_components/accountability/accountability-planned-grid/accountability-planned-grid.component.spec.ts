import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountabilityPlannedGridComponent } from './accountability-planned-grid.component';

describe('AccountabilityPlannedGridComponent', () => {
  let component: AccountabilityPlannedGridComponent;
  let fixture: ComponentFixture<AccountabilityPlannedGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountabilityPlannedGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountabilityPlannedGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
