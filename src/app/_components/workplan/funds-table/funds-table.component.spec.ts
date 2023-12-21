import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundsTableComponent } from './funds-table.component';

describe('FundsTableComponent', () => {
  let component: FundsTableComponent;
  let fixture: ComponentFixture<FundsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
