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
  public agencyOrder = 'DESC';
  public created = 'DESC';
  public financingValue = 'DESC';

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
    this.getEditais(null)
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

  orderByInstitute() {
    this.agencyOrder = this.agencyOrder === 'ASC' ? 'DESC': 'ASC';
    let filter: EditalFilter = {
      by: 'agency',
      order: this.agencyOrder
    }
    this.getEditais(filter);
  }

  orderBycreated() {
    this.created = this.created === 'ASC' ? 'DESC': 'ASC';
    let filter: EditalFilter = {
      by: 'created',
      order: this.created
    }
    this.getEditais(filter);
  }

  orderByfinancingValue() {
    this.financingValue = this.financingValue === 'ASC' ? 'DESC': 'ASC';
    let filter: EditalFilter = {
      by: 'financingValue',
      order: this.financingValue
    }
    this.getEditais(filter);
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
}