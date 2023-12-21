import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { WorkplanPtCategory } from 'src/app/_enums/worplan-pt-category.enum';
import { Project } from 'src/app/_models/project';

@Component({
  selector: 'app-margins-grid',
  templateUrl: './margins-grid.component.html',
  styleUrls: ['./margins-grid.component.scss'],
})
export class MarginsGridComponent implements OnChanges {
  @Input()
  project: Project;

  monthYearLabels: { monthLabel: string; yearLabel: string }[] = [];
  financeHeadings: string[] = [];
  margins: any[] = [];

  private months = [
    'JAN',
    'FEV',
    'MAR',
    'ABR',
    'MAI',
    'JUN',
    'JUL',
    'AGO',
    'SET',
    'OUT',
    'NOV',
    'DEZ',
  ];
  currentMonth: number;
  currentYear: number;
  currentMonthLabel: string;

  constructor() {}

  ngOnChanges(): void {
    this.currentYear = new Date().getFullYear();
    this.currentMonth = new Date().getMonth();
    this.currentMonthLabel = this.months[new Date().getMonth()];

    if (this.project) {
      this.financeHeadings = Object.keys(
        this.project.marginsGrid.items[0].financeHeadings
      );

      this.margins = this.project.marginsGrid.items;
      this.monthYearLabels = this.margins.map((element) => {
        return {
          monthLabel: element.monthLabel,
          yearLabel: element.yearLabel,
        };
      });
    }
  }

  getMonthIndex(monthLabel: string) {
    return this.months.indexOf(monthLabel);
  }

  getWorkplanLabel(key: string) {
    return WorkplanPtCategory[key];
  }
}
