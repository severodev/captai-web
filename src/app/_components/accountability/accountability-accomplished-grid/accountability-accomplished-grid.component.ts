import { Component, Input, OnInit } from '@angular/core';
import { WorkplanPtCategory } from '../../../_enums/worplan-pt-category.enum';
import { Project } from '../../../_models/project';
import { ContributionService } from '../../../_services/contribution.service';
import { ProjectService } from '../../../_services/project.service';

@Component({
  selector: 'app-accountability-accomplished-grid',
  templateUrl: './accountability-accomplished-grid.component.html',
  styleUrls: ['./accountability-accomplished-grid.component.scss']
})
export class AccountabilityAccomplishedGridComponent implements OnInit {
  financialResource: any = [];

  financialSupport: any = [];

  subtotalFinancialResources: number = 0;

  subtotalFinancialResourcesPerMonths: number[] = [];
  totalFinancialResourcesPerMonths: number = 0;

  totalFinancialContributionsPerMonths: number = 0;

  totalFinancialBalancePerMonth: number[] = [];
  totalFinancialBalance: number = 0;

  @Input() public project: Project;

  monthYearLabels: { monthLabel: string; yearLabel: string }[] = [];
  financeHeadings: string[] = [];
  expenses: any[] = [];

  constructor(
    private projectService: ProjectService,
    private contributionService: ContributionService,
  ) { }

  ngOnInit(): void {

    this.projectService.getProjectDetailed(this.project.id, 'REALIZADO').subscribe((res) => {
      this.project = res;

      if (this.project) {
        this.financeHeadings = Object.keys(
          this.project.expensesGrid.items[0].financeHeadings
        );

        this.expenses = this.project.expensesGrid.items;
        this.financialResource = this.mountFinancialResource(this.financeHeadings, this.expenses);
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

        this.contributionService.contributionsReceivedInTableStyle(this.project.id).subscribe((data) => {
          this.financialSupport = data
          this.totalFinancialBalancePerMonth = Array(this.financialSupport.length).fill(0);
          this.totalFinancialContributionsPerMonths = this.financialSupport.reduce(
            (acc, month) => {
              acc += month.amount;
              return acc;
            }
            , 0);
          this.totalFinancialBalancePerMonth = this.financialSupport.map(
            (month, index) => (month.amount - this.subtotalFinancialResourcesPerMonths[index]));

          this.totalFinancialBalance = this.totalFinancialBalancePerMonth.reduce(
            (acc, amount) => {
              acc += amount;
              return acc;
            }
            , 0);
        });
      }
    })

  }

  getWorkplanLabel(key: string) {
    return WorkplanPtCategory[key];
  }

  mountFinancialResource(financeHeadings, expensesGrid) {

    financeHeadings = financeHeadings.map(finance => {
      let monthsInfos = [];
      for (let index = 0; index < expensesGrid.length; index++) {
        const element = expensesGrid[index];
        monthsInfos.push({
          amount: 0,
          name: `${element.monthLabel}/${element.yearLabel}`
        })
      }

      return {
        name: finance,
        amount: 0,
        months: monthsInfos
      }
    });

    expensesGrid.map((expense) => {
      let currentDate = `${expense.monthLabel}/${expense.yearLabel}`;
      for (let heading of Object.entries(expense.financeHeadings)) {
        if (heading[1] != 0) {
          for (let index = 0; index < financeHeadings.length; index++) {
            const element = financeHeadings[index];
            if (element.name == heading[0]) {
              for (let index = 0; index < element.months.length; index++) {
                const monthInfos = element.months[index];
                if (monthInfos.name == currentDate) {
                  monthInfos.amount += heading[1];
                }
              }
            }

          }
        }
      }
    })

    return financeHeadings
  }

}
