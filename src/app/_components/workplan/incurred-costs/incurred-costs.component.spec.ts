import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncurredCostsComponent } from './incurred-costs.component';

describe('IncurredCostsComponent', () => {
  let component: IncurredCostsComponent;
  let fixture: ComponentFixture<IncurredCostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncurredCostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncurredCostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
