import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EditalService } from 'src/app/_services/edital.service';
import { EditalFilter, PageRequest } from 'src/app/_interfaces/index';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {

  public editais = [];
  public selected;
  public filterForm;
  public agencyOrder = '';
  public submission = 'DESC';
  public financingValue = '';

  constructor(
    private editalService: EditalService,
    private router: Router,
    private fb: FormBuilder) {
      this.filterForm = this.fb.group({
        agency: [],
        title: [],
        financingValue: []
      });
     }
  
  ngOnInit(): void {
    this.getEditais({by: 'submission', order: 'DESC'})
  }

  filter() {
    let filter: EditalFilter = {
      agency: this.filterForm.controls['agency'].value,
      title:  this.filterForm.controls['title'].value,
      financingValue:  this.filterForm.controls['financingValue'].value
    }
    this.getEditais(filter);
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

    let filter: EditalFilter = {
      by: 'agency',
      order: this.agencyOrder != '' ? this.agencyOrder : null
    }
    this.getEditais(filter);
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

    let filter: EditalFilter = {
      by: 'submission',
      order: this.submission != '' ? this.submission : null
    }
    this.getEditais(filter);
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

    let filter: EditalFilter = {
      by: 'financingValue',
      order: this.financingValue != '' ? this.financingValue : null
    }
    this.getEditais(filter);
  }

  cancelFilter() {
    let modalRef = document.getElementById('filter-modal');
    if (modalRef) 
      modalRef.classList.remove("show");
  }
}