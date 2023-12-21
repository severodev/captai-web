import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorShortCardComponent } from './collaborator-short-card.component';

describe('CollaboratorShortCardComponent', () => {
  let component: CollaboratorShortCardComponent;
  let fixture: ComponentFixture<CollaboratorShortCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollaboratorShortCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaboratorShortCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
