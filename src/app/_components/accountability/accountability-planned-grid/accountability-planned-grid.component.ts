import { Component, Input, OnInit } from '@angular/core';
import { WorkplanPtCategory } from '../../../_enums/worplan-pt-category.enum';
import { Project } from '../../../_models/project';
import { WorkplanService } from '../../../_services/workplan.service';

@Component({
  selector: 'app-accountability-planned-grid',
  templateUrl: './accountability-planned-grid.component.html',
  styleUrls: ['./accountability-planned-grid.component.scss']
})
export class AccountabilityPlannedGridComponent implements OnInit {
  financialResource: any;

  subtotalFinancialResources: number = 0;
  subtotalFinancialResourcesPerMonths: number[] = [];
  totalFinancialResourcesPerMonths: number = 0;

  @Input() public project: Project;

  monthYearLabels: { monthLabel: string; yearLabel: string }[] = [];
  financeHeadings: string[] = [];
  expenses: any[] = [];

  constructor(
    private workplanService: WorkplanService,
  ) { }

  ngOnInit(): void {
    this.workplanService.workplanPlannedByProject(this.project.id).subscribe(async (data) => {
      this.financialResource = data;

      if (this.project) {
        this.financeHeadings = Object.keys(
          this.project.expensesGrid.items[0].financeHeadings
        );

        this.expenses = this.project.expensesGrid.items;
        this.monthYearLabels = this.expenses.map((element) => {
          return {
            monthLabel: element.monthLabel,
            yearLabel: element.yearLabel,
          };
        });
        this.subtotalFinancialResourcesPerMonths = Array(this.financialResource[0].months.length).fill(0);

        this.financialResource.map(rubrica => {
          this.subtotalFinancialResources += rubrica.amount;

          rubrica.totalMonth = rubrica.months.reduce((accumulator, month, index) => {
            accumulator += month.amount;

            this.subtotalFinancialResourcesPerMonths[index] += month.amount;

            return accumulator;
          }, 0);
        });

        this.totalFinancialResourcesPerMonths = this.subtotalFinancialResourcesPerMonths.reduce(
          (acc, amount) => {
            acc += amount;
            return acc;
          }
          , 0);
      }
    });
  }

  getWorkplanLabel(key: string) {
    return WorkplanPtCategory[key];
  }

}
