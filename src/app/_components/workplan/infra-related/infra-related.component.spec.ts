import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfraRelatedComponent } from './infra-related.component';

describe('InfraRelatedComponent', () => {
  let component: InfraRelatedComponent;
  let fixture: ComponentFixture<InfraRelatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfraRelatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfraRelatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
