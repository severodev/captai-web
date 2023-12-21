import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierHeaderComponent } from './supplier-header.component';

describe('SupplierHeaderComponent', () => {
  let component: SupplierHeaderComponent;
  let fixture: ComponentFixture<SupplierHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
