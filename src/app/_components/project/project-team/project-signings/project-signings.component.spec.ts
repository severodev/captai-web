import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSigningsComponent } from './project-signings.component';

describe('ProjectSigningsComponent', () => {
  let component: ProjectSigningsComponent;
  let fixture: ComponentFixture<ProjectSigningsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectSigningsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSigningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
