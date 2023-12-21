import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BenefitSelectorComponent } from './benefit-selector.component';

describe('BenefitSelectorComponent', () => {
  let component: BenefitSelectorComponent;
  let fixture: ComponentFixture<BenefitSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BenefitSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BenefitSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
