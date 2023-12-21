import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCollaboratorComponent } from './create-collaborator.component';

describe('CreateCollaboratorComponent', () => {
  let component: CreateCollaboratorComponent;
  let fixture: ComponentFixture<CreateCollaboratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCollaboratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCollaboratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
