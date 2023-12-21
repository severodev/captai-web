import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDropdownCardComponent } from './main-dropdown-card.component';

describe('MainDropdownCardComponent', () => {
  let component: MainDropdownCardComponent;
  let fixture: ComponentFixture<MainDropdownCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainDropdownCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainDropdownCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
