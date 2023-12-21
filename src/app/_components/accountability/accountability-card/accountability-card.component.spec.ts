import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountabilityCardComponent } from './accountability-card.component';

describe('AccountabilityCardComponent', () => {
  let component: AccountabilityCardComponent;
  let fixture: ComponentFixture<AccountabilityCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountabilityCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountabilityCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
