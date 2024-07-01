import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EditalService } from 'src/app/_services/edital.service';
import { EditalFilter, PageRequest } from 'src/app/_interfaces/index';
import { FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {

  clearFilter = new Subject<void>();

  public editais = [];
  public selected;
  public filterForm;
  public agencyOrder = '';
  public submission = 'DESC';
  public financingValue = '';

  private customFilter;

  private filterRequest: EditalFilter = {
    agency: null,
    agencyList: null,
    title: null,
    financingValueHigh: null,
    financingValueLow: null,
    maturity: null,
    submission: null,
    areaList: null,
    created: null,
    by: 'dt_submission',
    order: 'DESC'
  }

  constructor(
    private editalService: EditalService,
    private router: Router,
    private fb: FormBuilder) {
      this.filterForm = this.fb.group({
        agency: []
      });
    }
  
  ngOnInit(): void {
    this.getEditais( this.filterRequest )
  }

  clear() {
    this.clearFilter.next();
  }

  clearFilterObservable() {
    return this.clearFilter.asObservable();
  }

  filter() {
    this.filterRequest.agency = this.filterForm.controls['agency'].value
    this.filterRequest.agencyList = null;
    this.filterRequest.title = null;
    this.filterRequest.maturity = null;
    this.filterRequest.submission = null;
    this.filterRequest.areaList = null;
    this.getEditais(this.filterRequest);
    this.filterForm.reset();
  }

  getEditais(filter: EditalFilter) {
    var params: PageRequest = {
      itemsPerPage : 999
    }
    this.editalService.getEditais(filter, params).subscribe(data => {
      this.editais = data.map(edital => {
        let list = edital.areaList.split(";");
        edital.areaList = list.length > 1 ? list.slice(0, 1) : list;
        return edital;
      });
    });
  }

  reduceTitle(title) {
    if (title.length > 50) {
      title =  title.substring(0, 50) + "...";
    }
    return title;
  }

  reduceArea(area) {
    if (area.length > 20) {
      area =  area.substring(0, 20) + "...";
    }
    return area;
  }
  seeMore(id : number) {
    this.router.navigate(['/details'], { queryParams: { editalId: id } });
  }

  select(idSelected) {
   this.selected = idSelected;
  }

  toggleDetails(id) {
    var details = document.getElementById('details-' + id);
    var toggle = document.getElementById('toggle-' + id);
    if (details && toggle) {
        if (details.getAttribute('hidden') !== null) {
          toggle.style.transform = 'rotate(180deg)';
          details.removeAttribute('hidden');
        } else {
          toggle.style.transform = 'rotate(0deg)';
          details.setAttribute('hidden', 'true');
        }
    }
  }


  orderByInstitute() {
    this.submission = '';
    this.financingValue = '';

    switch (this.agencyOrder) {
      case '' : this.agencyOrder = 'ASC'
      break;
      case 'ASC' : this.agencyOrder = 'DESC'
      break;
      case 'DESC' : this.agencyOrder = ''
      break;
    }
    this.filterRequest.by = 'agency';
    this.filterRequest.order = this.agencyOrder != '' ? this.agencyOrder : null;
    this.getEditais(this.filterRequest);
  }

  orderBySubmission() {
    this.financingValue = '';
    this.agencyOrder = '';

    switch (this.submission) {
      case '' : this.submission = 'ASC'
      break;
      case 'ASC' : this.submission = 'DESC'
      break;
      case 'DESC' : this.submission = ''
      break;
    }

    this.filterRequest.by = 'dt_submission';
    this.filterRequest.order = this.submission != '' ? this.submission : null;
   
    this.getEditais(this.filterRequest);
  }

  orderByfinancingValue() {
    this.submission = '';
    this.agencyOrder = '';

    switch (this.financingValue) {
      case '' : this.financingValue = 'ASC'
      break;
      case 'ASC' : this.financingValue = 'DESC'
      break;
      case 'DESC' : this.financingValue = ''
      break;
    }

    this.filterRequest.by = 'nm_financing_value';
    this.filterRequest.order = this.financingValue != '' ? this.financingValue : null;

    this.getEditais( this.filterRequest);
  }

  cancelFilter() {
    let modalRef = document.getElementById('filter-modal');
    if (modalRef) 
      modalRef.classList.remove("show");
  }

  applyCustomFilter() {
    this.filterRequest.agency = null;
    this.filterRequest.agencyList = this.customFilter.agency;
    this.filterRequest.maturity = this.customFilter.maturity != 0 ? this.customFilter.maturity : null;
    this.filterRequest.submission = this.customFilter.date == 'Invalid date' ? null : this.customFilter.date;
    this.filterRequest.areaList = this.customFilter.areas;
    this.filterRequest.financingValueLow = !this.customFilter.value ? null : this.customFilter.value[0];
    this.filterRequest.financingValueHigh = !this.customFilter.value ? null : this.customFilter.value[1];
    
    this.getEditais(this.filterRequest);
    this.filterForm.reset();
    this.cancelFilter()
  }

  setFilter(filterForm: any) {
    this.customFilter = filterForm
  }
}