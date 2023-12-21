import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorDocsFormComponent } from './collaborator-docs-form.component';

describe('CollaboratorDocsFormComponent', () => {
  let component: CollaboratorDocsFormComponent;
  let fixture: ComponentFixture<CollaboratorDocsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollaboratorDocsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaboratorDocsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
