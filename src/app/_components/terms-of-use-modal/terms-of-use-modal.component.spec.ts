import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsOfUseModalComponent } from './terms-of-use-modal.component';

describe('TermsOfUseModalComponent', () => {
  let component: TermsOfUseModalComponent;
  let fixture: ComponentFixture<TermsOfUseModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TermsOfUseModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TermsOfUseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
