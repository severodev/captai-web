import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectPaymentsComponent } from './project-payments.component';

describe('ProjectPaymentsComponent', () => {
  let component: ProjectPaymentsComponent;
  let fixture: ComponentFixture<ProjectPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
