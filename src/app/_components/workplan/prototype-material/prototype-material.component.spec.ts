import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrototypeMaterialComponent } from './prototype-material.component';

describe('PrototypeMaterialComponent', () => {
  let component: PrototypeMaterialComponent;
  let fixture: ComponentFixture<PrototypeMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrototypeMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrototypeMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
