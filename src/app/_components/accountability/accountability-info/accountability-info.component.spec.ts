import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountabilityInfoComponent } from './accountability-info.component';

describe('AccountabilityInfoComponent', () => {
  let component: AccountabilityInfoComponent;
  let fixture: ComponentFixture<AccountabilityInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountabilityInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountabilityInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
