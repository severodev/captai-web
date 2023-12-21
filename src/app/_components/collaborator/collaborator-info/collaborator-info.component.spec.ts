import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorInfoComponent } from './collaborator-info.component';

describe('CollaboratorInfoComponent', () => {
  let component: CollaboratorInfoComponent;
  let fixture: ComponentFixture<CollaboratorInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollaboratorInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaboratorInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
