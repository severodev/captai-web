import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputerAccessoryComponent } from './computer-accessory.component';

describe('ComputerAccessoryComponent', () => {
  let component: ComputerAccessoryComponent;
  let fixture: ComponentFixture<ComputerAccessoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComputerAccessoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComputerAccessoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
