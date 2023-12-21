import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorsSmallListComponent } from './collaborators-small-list.component';

describe('CollaboratorsSmallListComponent', () => {
  let component: CollaboratorsSmallListComponent;
  let fixture: ComponentFixture<CollaboratorsSmallListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollaboratorsSmallListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaboratorsSmallListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
