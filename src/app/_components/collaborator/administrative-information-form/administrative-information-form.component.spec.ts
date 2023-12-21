import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrativeInformationFormComponent } from './administrative-information-form.component';

describe('AdministrativeInformationFormComponent', () => {
  let component: AdministrativeInformationFormComponent;
  let fixture: ComponentFixture<AdministrativeInformationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrativeInformationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrativeInformationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
