import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorLongCardComponent } from './collaborator-long-card.component';

describe('CollaboratorLongCardComponent', () => {
  let component: CollaboratorLongCardComponent;
  let fixture: ComponentFixture<CollaboratorLongCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollaboratorLongCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaboratorLongCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
