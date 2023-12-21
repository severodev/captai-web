import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalServiceComponent } from './technical-service.component';

describe('TechnicalServiceComponent', () => {
  let component: TechnicalServiceComponent;
  let fixture: ComponentFixture<TechnicalServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechnicalServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicalServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
