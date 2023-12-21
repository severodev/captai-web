import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectHrComponent } from './direct-hr.component';

describe('DirectHrComponent', () => {
  let component: DirectHrComponent;
  let fixture: ComponentFixture<DirectHrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectHrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectHrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
