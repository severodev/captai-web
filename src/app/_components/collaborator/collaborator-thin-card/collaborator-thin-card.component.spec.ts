import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorThinCardComponent } from './collaborator-thin-card.component';

describe('CollaboratorThinCardComponent', () => {
  let component: CollaboratorThinCardComponent;
  let fixture: ComponentFixture<CollaboratorThinCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollaboratorThinCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaboratorThinCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
