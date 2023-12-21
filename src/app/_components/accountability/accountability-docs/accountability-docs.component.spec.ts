import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountabilityDocsComponent } from './accountability-docs.component';

describe('AccountabilityDocsComponent', () => {
  let component: AccountabilityDocsComponent;
  let fixture: ComponentFixture<AccountabilityDocsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountabilityDocsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountabilityDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
