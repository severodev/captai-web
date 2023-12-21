import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentAndSoftwareComponent } from './equipment-and-software.component';

describe('EquipmentAndSoftwareComponent', () => {
  let component: EquipmentAndSoftwareComponent;
  let fixture: ComponentFixture<EquipmentAndSoftwareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentAndSoftwareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentAndSoftwareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
