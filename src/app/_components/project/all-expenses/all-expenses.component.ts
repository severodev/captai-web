import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { WorkplanPtCategory } from 'src/app/_enums/worplan-pt-category.enum';
import { BudgetCategory } from 'src/app/_models/budget-category';
import { Expense } from 'src/app/_models/expense';
import { Project } from 'src/app/_models/project';
import { SupplierService } from 'src/app/_services/supplier.service';
import { ExpenseStatus } from '../../../_enums/expense-status.enum';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ExpenseInstallment } from '../../../_models/expense-installment';
import * as moment from 'moment';
import { formatDateMoment } from '../../../_helpers/utils'
import { ExpenseService } from '../../../_services/expense.service';
import { ToastService } from '../../../_services/toast.service';
import { Router } from '@angular/router';
import { Options } from 'ngx-slider-v2';

@Component({
  selector: 'app-all-expenses',
  templateUrl: './all-expenses.component.html',
  styleUrls: ['./all-expenses.component.scss'],
})
export class AllExpensesComponent implements OnInit, OnChanges {

  @Input()
  project: Project;

  // @Input()
  // public editExpense: (expenseId: number) => void;

  // @Input()
  // public deleteExpense: (expenseId: number) => void;

  @Output() emitEditToInfo: EventEmitter<number> = new EventEmitter();
  @Output() emitDeleteToInfo: EventEmitter<number> = new EventEmitter();

  public budgetCategories: BudgetCategory[];
  public expensesFiltered: Expense[] = [];
  public workplanPt = WorkplanPtCategory;
  
  public selectedBudgetCategories: BudgetCategory[] = [];
  public selectedBudgetString = "";

  confirmPaymentModalRef: BsModalRef;
  deleteExpenseModalRef: BsModalRef;

  selectedExpense: Expense = new Expense();
  selectedInstallment: ExpenseInstallment;

  private momentInstallmentViewDateFormat = 'MMM DD, YYYY';

  public filter: any = {
    supplierInput: '',
    budgetInput: '',
    valueMin: 0,
    valueMax: 100000
  };

  public options: Options = {
    floor: 0,
    ceil: 100000
  };

  constructor(
    private supplierService: SupplierService,
    private expenseService: ExpenseService,
    private modalService: BsModalService,
    private ts: ToastService,
    private router: Router
  ) { 
    moment.locale('pt-br');
  }

  ngOnInit(): void {
    this.loadBudgetCategories();
  }

  ngOnChanges() {
    this.expensesFiltered = this.project?.expenses;
  }
  
  search() {
    this.expensesFiltered = this.project?.expenses
      .filter(e => this.filter.supplierInput == '' 
        || (e.supplier && e.supplier.name.toLowerCase().indexOf(this.filter.supplierInput.toLowerCase()) > -1))
      .filter(e => this.selectedBudgetCategories.length == 0 
        || this.selectedBudgetCategories.find(b => b.id === e.budgetCategory.id))
      .filter(e => Number(this.filter.valueMin) <= e.value)
      .filter(e => e.value <= Number(this.filter.valueMax));
  }

  loadBudgetCategories() {
    this.supplierService.getBudgetCategoriesDropdown().subscribe((res: any) => {
      this.budgetCategories = res;
    });
  }

  updateBudgetFilters(budget: BudgetCategory) {
    let findBudget = this.selectedBudgetCategories.find(b => b.id === budget.id);
    if(!findBudget)
      this.selectedBudgetCategories.push(budget);
    else
      this.selectedBudgetCategories.splice(this.selectedBudgetCategories.findIndex(b => b.id === budget.id), 1);

    this.selectedBudgetString = "";
    this.selectedBudgetCategories.forEach((b, i) => {
      this.selectedBudgetString += (this.selectedBudgetCategories.length > 1 && i != 0 ? ", " : "") + b.name
    })
  }

  toggleChev(attrId) {
    if (document.getElementById(attrId).classList.contains('ic-chev-down')) {
      document.getElementById(attrId).classList.remove('ic-chev-down');
      document.getElementById(attrId).classList.add('ic-chev-up');
    } else {
      document.getElementById(attrId).classList.remove('ic-chev-up');
      document.getElementById(attrId).classList.add('ic-chev-down');
    }
  }

  isItemOpended(attrId) {
    if (document.getElementById(attrId) && document.getElementById(attrId).classList.contains('ic-chev-down')) {
      return false;
    } else {
      return true;
    }
  }

  downloadFile(url: string) {
    window.open(url, '_blank');
  }

  getExpenseName(expense: any) {
    if (expense.supplier && expense.supplier.name) {
      return expense.supplier.name;
    } else if (expense.budgetCategory.name !== '') {
      return expense.budgetCategory.name;
    } else {
      return this.workplanPt[expense.budgetCategory.code];
    }
  }

  getStatusKey(expense: any){
    const key = Object.keys(ExpenseStatus).find(x => ExpenseStatus[x] == expense.status);
    return key?.toLowerCase();
  }

  getInstallmentDateStr(installment: ExpenseInstallment){
    return moment(installment.paymentDate).format(this.momentInstallmentViewDateFormat);
  }

  showConfirmPaymentModal(modal: any, expense: any) {
    this.selectedInstallment = new ExpenseInstallment();
    if (expense.budgetCategory.code === 'TRIP') {
      this.selectedExpense = expense
      this.selectedExpense.supplier = {}
    } else this.selectedExpense = expense;    
    this.confirmPaymentModalRef = this.modalService.show(modal);
  }

  // showDeleteExpenseModal(modal: any, expense: any) {
  //   this.selectedExpense = expense;    
  //   this.deleteExpenseModalRef = this.modalService.show(modal);
  // }

  

  selectInstallment(installmentId: number) {    
    this.selectedInstallment = this.selectedExpense.installments.find(i => i.id == installmentId);
  }

  confirmInstallmentPayment(): void {
    this.expenseService.confirmExpensePayment(this.selectedExpense?.id, this.selectedInstallment.id).subscribe((updatedExpense: Expense) => {                 
      updatedExpense.installments?.forEach(i => i.str_date = formatDateMoment(i.paymentDate));
      let expenseIndex = this.project?.expenses?.findIndex(e => e.id == this.selectedExpense.id);
      this.project.expenses.splice(expenseIndex, 1, updatedExpense);      
      this.confirmPaymentModalRef.hide();
      this.ts.success('Ação concluída!', 'Confirmação de pagamento realizada com sucesso.'); // TODO: trazer chave de i18n
    });
  }

  edit(expense: any): void {
    this.selectedExpense = expense;
    this.emitEditToInfo.emit(this.selectedExpense.id);
  }

  delete(expense: any): void {
    this.selectedExpense = expense;
    this.emitDeleteToInfo.emit(this.selectedExpense.id);    
  }

}
