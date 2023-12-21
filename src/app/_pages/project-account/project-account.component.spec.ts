import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectAccountComponent } from './project-account.component';

describe('ProjectAccountComponent', () => {
  let component: ProjectAccountComponent;
  let fixture: ComponentFixture<ProjectAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
