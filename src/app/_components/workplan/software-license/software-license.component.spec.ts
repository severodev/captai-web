import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftwareLicenseComponent } from './software-license.component';

describe('SoftwareLicenseComponent', () => {
  let component: SoftwareLicenseComponent;
  let fixture: ComponentFixture<SoftwareLicenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoftwareLicenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoftwareLicenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
