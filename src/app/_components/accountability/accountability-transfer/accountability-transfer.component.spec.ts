import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountabilityTransferComponent } from './accountability-transfer.component';

describe('TransferComponent', () => {
  let component: AccountabilityTransferComponent;
  let fixture: ComponentFixture<AccountabilityTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountabilityTransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountabilityTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
