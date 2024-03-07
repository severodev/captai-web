import { Component } from '@angular/core';
import { Options } from 'ngx-slider-v2';

@Component({
  selector: 'app-search-filter-dropdown',
  templateUrl: './search-filter-dropdown.component.html',
  styleUrl: './search-filter-dropdown.component.scss'
})
export class SearchFilterDropdownComponent {
  public temas = [
    'Edital de ciência',
    'Edital de robótica',
    'Edital de técnologia']
  public areas = [
    'ux/ui Desing',
    'Frontend',
    'Backend',
    'Full stack',
    'Graphic Designer',
    'Web Designer',
    'QA']
  selectedCity: any;

  value: number = 1000;
  highValue: number = 10000000;
  options: Options = {
    floor: 1000,
    ceil: 10000000,
    step: 500,
    showTicks: false,
    hideLimitLabels: true
  };

  value1: number = 0;
  highValue2: number = 10;
  options2: Options = {
    floor: 0,
    ceil: 10,
    step: 1,
    showTicks: false,
    hideLimitLabels: true
  };

  select(selected) {
    console.log(selected)
    let item = document.getElementById(selected);
    console.log(item)
    if (item) {
      if(item.classList.contains('item-selected')) {
        item.classList.remove('item-selected');
      } else {
        item.classList.add('item-selected');
      }
    }
  }
}