import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorDetailsComponent } from './collaborator-details.component';

describe('CollaboratorDetailsComponent', () => {
  let component: CollaboratorDetailsComponent;
  let fixture: ComponentFixture<CollaboratorDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollaboratorDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaboratorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
