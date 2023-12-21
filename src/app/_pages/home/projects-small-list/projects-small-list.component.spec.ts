import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsSmallListComponent } from './projects-small-list.component';

describe('ProjectsSmallListComponent', () => {
  let component: ProjectsSmallListComponent;
  let fixture: ComponentFixture<ProjectsSmallListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsSmallListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsSmallListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
