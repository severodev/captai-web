import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumptionMaterialComponent } from './consumption-material.component';

describe('ConsumptionMaterialComponent', () => {
  let component: ConsumptionMaterialComponent;
  let fixture: ComponentFixture<ConsumptionMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumptionMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumptionMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
