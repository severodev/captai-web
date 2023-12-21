import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CivilWorkComponent } from './civil-work.component';

describe('CivilWorkComponent', () => {
  let component: CivilWorkComponent;
  let fixture: ComponentFixture<CivilWorkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CivilWorkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CivilWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
