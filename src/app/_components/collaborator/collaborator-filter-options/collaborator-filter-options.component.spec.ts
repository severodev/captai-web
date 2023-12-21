import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorFilterOptionsComponent } from './collaborator-filter-options.component';

describe('CollaboratorFilterOptionsComponent', () => {
  let component: CollaboratorFilterOptionsComponent;
  let fixture: ComponentFixture<CollaboratorFilterOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollaboratorFilterOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaboratorFilterOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
