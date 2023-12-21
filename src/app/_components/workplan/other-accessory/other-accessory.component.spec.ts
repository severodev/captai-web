import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherAccessoryComponent } from './other-accessory.component';

describe('OtherAccessoryComponent', () => {
  let component: OtherAccessoryComponent;
  let fixture: ComponentFixture<OtherAccessoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherAccessoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherAccessoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
