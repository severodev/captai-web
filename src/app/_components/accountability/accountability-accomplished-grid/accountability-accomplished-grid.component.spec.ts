import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountabilityAccomplishedGridComponent } from './accountability-accomplished-grid.component';

describe('AccountabilityAccomplishedGridComponent', () => {
  let component: AccountabilityAccomplishedGridComponent;
  let fixture: ComponentFixture<AccountabilityAccomplishedGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountabilityAccomplishedGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountabilityAccomplishedGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
