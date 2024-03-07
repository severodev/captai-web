import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchFilterDropdownComponent } from './search-filter-dropdown.component';

describe('SearchFilterDropdownComponent', () => {
  let component: SearchFilterDropdownComponent;
  let fixture: ComponentFixture<SearchFilterDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchFilterDropdownComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchFilterDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});