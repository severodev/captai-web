import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndirectHrComponent } from './indirect-hr.component';

describe('IndirectHrComponent', () => {
  let component: IndirectHrComponent;
  let fixture: ComponentFixture<IndirectHrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndirectHrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndirectHrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
