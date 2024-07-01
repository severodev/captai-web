import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import moment from 'moment';
import { Options } from 'ngx-slider-v2';
import { BehaviorSubject, Subject } from 'rxjs';
import { PageRequest } from 'src/app/_interfaces';
import { EditalService } from 'src/app/_services/edital.service';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-search-filter-dropdown',
  templateUrl: './search-filter-dropdown.component.html',
  styleUrl: './search-filter-dropdown.component.scss'
})


export class SearchFilterDropdownComponent {

  @Output() filteParams = new EventEmitter<any>();

  filterForm: FormGroup;
 
  public agencies = []
  public areas = []
  public areasSelected = []

  public lowValue: number = 500;
  public highValue: number = 10000000;
  public options: Options = {
    floor: this.lowValue,
    ceil: this.highValue,
    step: 500,
    showTicks: false,
    hideLimitLabels: true
  };

  public value1: number = 0;
  public highValue2: number = 10;
  public options2: Options = {
    floor: this.value1,
    ceil: this.highValue2,
    step: 1,
    showTicks: false,
    hideLimitLabels: true
  };

  constructor(
    private editalService: EditalService,
    private searchComponent: SearchComponent,
    private fb: FormBuilder) {
      this.filterForm = this.fb.group({
        agency: [],
        date: [],
        value: [],
        areas: [],
        maturity: []
      });
      searchComponent.clearFilterObservable().subscribe(() => {
        this.lowValue = 500;
        this.highValue = 10000000;
        this.filterForm.controls.value.setValue([this.lowValue, this.highValue])
        this.filterForm.reset();
        console.log("formulario ", this.filterForm)
      })
    }
  
  ngOnInit(): void {
    this.filterForm.valueChanges.subscribe(() => {
      this.filterForm.controls.date.setValue(moment(this.filterForm.controls.date.value).format('YYYY-MM-DD'), { emitEvent: false });
      this.filteParams.next(this.filterForm.value)
    })
    this.getEditais();
  }

  getEditais() {
    var params: PageRequest = {
      itemsPerPage : 999
    }
    this.editalService.getEditais(null, params).subscribe(data => {
      this.agencies = data.filter((value, index, self) => self.findIndex(edital => edital.agency === value.agency) === index)
      .map(edital => edital.agency);
      this.areas = data.map(edital => {
        return edital.areaList;
      });
    });
  }

  select(indexElement, value) {
    let item = document.getElementById(indexElement);
    if (item) {
      if(item.classList.contains('item-selected')) {
        item.classList.remove('item-selected');
        let index = this.areasSelected.indexOf(value);
        if (index !== -1) {
          this.areasSelected.splice(index, 1);
        }
      } else {
        item.classList.add('item-selected');
        this.areasSelected.push(value);
      }
      this.filterForm.controls.areas.setValue(this.areasSelected);
    }
  }
}