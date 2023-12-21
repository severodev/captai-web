import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierCardComponent } from './supplier-card.component';

describe('SupplierCardComponent', () => {
  let component: SupplierCardComponent;
  let fixture: ComponentFixture<SupplierCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
