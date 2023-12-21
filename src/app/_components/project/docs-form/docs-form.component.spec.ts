import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocsFormComponent } from './docs-form.component';

describe('DocsFormComponent', () => {
  let component: DocsFormComponent;
  let fixture: ComponentFixture<DocsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
