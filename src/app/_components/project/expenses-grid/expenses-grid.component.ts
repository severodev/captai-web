import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { WorkplanPtCategory } from 'src/app/_enums/worplan-pt-category.enum';
import { BudgetCategory } from 'src/app/_models/budget-category';
import { Project } from 'src/app/_models/project';
import { SupplierService } from 'src/app/_services/supplier.service';

@Component({
  selector: 'app-expenses-grid',
  templateUrl: './expenses-grid.component.html',
  styleUrls: ['./expenses-grid.component.scss']
})
export class ExpensesGridComponent implements OnChanges {
  @Input()
  project: Project;
  budgetCategories: BudgetCategory[];

  monthYearLabels: { monthLabel: string; yearLabel: string }[] = [];
  financeHeadings: string[] = [];
  expenses: any[] = [];

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

  constructor(
    private supplierService: SupplierService,
  ) {
    this.loadBudgetCategories();
  }

  ngOnChanges(): void {
    this.currentMonth = new Date().getMonth();
    this.currentYear = new Date().getFullYear();
    this.currentMonthLabel = this.months[new Date().getMonth()];

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
    }
  }

  loadBudgetCategories() {
    this.supplierService.getBudgetCategoriesDropdown().subscribe((res: any) => {
      this.budgetCategories = res;
    });
  }

  getMonthIndex(monthLabel: string) {
    return this.months.indexOf(monthLabel);
  }

  getWorkplanLabel(key: string) {
    return WorkplanPtCategory[key];
  }
}
