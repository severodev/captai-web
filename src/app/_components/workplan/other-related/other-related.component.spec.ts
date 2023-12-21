import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherRelatedComponent } from './other-related.component';

describe('OtherRelatedComponent', () => {
  let component: OtherRelatedComponent;
  let fixture: ComponentFixture<OtherRelatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherRelatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherRelatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
