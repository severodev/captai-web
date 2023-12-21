import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemovedSuppliersComponent } from './removed-suppliers.component';

describe('RemovedSuppliersComponent', () => {
  let component: RemovedSuppliersComponent;
  let fixture: ComponentFixture<RemovedSuppliersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemovedSuppliersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemovedSuppliersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
