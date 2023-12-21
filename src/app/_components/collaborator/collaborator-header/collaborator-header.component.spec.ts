import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorHeaderComponent } from './collaborator-header.component';

describe('CollaboratorHeaderComponent', () => {
  let component: CollaboratorHeaderComponent;
  let fixture: ComponentFixture<CollaboratorHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollaboratorHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaboratorHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
