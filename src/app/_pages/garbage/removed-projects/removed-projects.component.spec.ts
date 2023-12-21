import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemovedProjectsComponent } from './removed-projects.component';

describe('RemovedProjectsComponent', () => {
  let component: RemovedProjectsComponent;
  let fixture: ComponentFixture<RemovedProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemovedProjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemovedProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
