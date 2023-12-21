import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemovedCollaboratorsComponent } from './removed-collaborators.component';

describe('RemovedCollaboratorsComponent', () => {
  let component: RemovedCollaboratorsComponent;
  let fixture: ComponentFixture<RemovedCollaboratorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemovedCollaboratorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemovedCollaboratorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
