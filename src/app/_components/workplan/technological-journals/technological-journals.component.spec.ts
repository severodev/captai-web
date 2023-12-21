import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnologicalJournalsComponent } from './technological-journals.component';

describe('TechnologicalJournalsComponent', () => {
  let component: TechnologicalJournalsComponent;
  let fixture: ComponentFixture<TechnologicalJournalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechnologicalJournalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnologicalJournalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
