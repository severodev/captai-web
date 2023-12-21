import { Component, Input, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { ExpenseInstallment } from 'src/app/_models/expense-installment';
import { ConfirmAlertService } from 'src/app/_services/confirm-alert.service';
import { Expense, CostShare } from '../../../_models/expense';
import { formatDateMoment } from '../../../_helpers/utils';
import { Project } from '../../../_models/project';
import { ToastService } from './../../../_services/toast.service';

@Component({
  selector: 'app-expense-installments-table',
  templateUrl: './expense-installments-table.component.html',
  styleUrls: ['./expense-installments-table.component.scss'],
})
export class ExpenseInstallmentsTableComponent implements OnInit {
  
  @Input() expenseItem: Expense;

  @Input() projects: Project[];

  @ViewChild('installmentsForm') installmentsForm: any;

  selected: boolean = false;
  editing: boolean = false

  constructor(private confirmAlertService: ConfirmAlertService, private ts: ToastService) {}

  ngOnInit(): void {
    moment.locale('pt-br');
    this.loadInstallments();
  }

  get invalidTripTotal() {
    let installmentsTotal = 0;
    let tripCosts = 0;

    this.expenseItem.installments.map(
      (i: any) => (installmentsTotal += parseFloat(i.value))
    );

    tripCosts += +this.expenseItem.tripDetails.ticketValue;
    tripCosts += +this.expenseItem.tripDetails.hostingValue;
    tripCosts += +this.expenseItem.tripDetails.dailyAllowanceValue;

    if (tripCosts != installmentsTotal) {
      return true;
    }

    return false;
  }

  loadInstallments() {
    this.expenseItem.installments
      ? this.expenseItem.installments.map((installment) => {
          installment.str_date = formatDateMoment(installment.paymentDate);
          installment.projectId = installment.project?.id;
          return installment;
        })
      : null;
  }

  addInstallment() {
    const installment = new ExpenseInstallment();
    installment.order = this.expenseItem.installments?.length + 1;
    this.expenseItem.installments.push(installment);
  }

  removeInstallment(index: number) {
    this.confirmAlertService.initAlert("Não será possível desfazer essa ação.").subscribe(event => {
      if(event) {
        this.expenseItem.installments.splice(index, 1);
        this.confirmAlertService.reset();
      }
    });
  }

  parseDate(installment: ExpenseInstallment) {
    if (installment.str_date.length == 10) {
      const paymentDate = moment(installment.str_date, 'DD/MM/YYYY');
      installment.paymentDate = paymentDate.toDate();
      installment.month = paymentDate.month() + 1;
      installment.year = paymentDate.year();
    }
  }

  changeInstallmentSelectedState() {
    this.selected = !this.selected;
    this.expenseItem.installments.map(installment => installment.selected = this.selected);
  }

  get selectedInstallments() {
     return this.expenseItem.installments.filter(installment => installment.selected == true);
  }

  removeSelectedsInstallments() {
    this.confirmAlertService.initAlert("Não será possível desfazer essa ação.").subscribe(event => {
      if(event) {
        this.expenseItem.installments = this.expenseItem.installments.filter(installment => installment.selected != true);
        this.selected = false;
        this.confirmAlertService.reset();
      }
    })
  }

  editSelectedsInstallments() {

    const _selectedInstallments = this.expenseItem.installments.filter(installment => installment.selected == true);

    if(this.editing){
      for (const inst of _selectedInstallments) {
        if(!this.validateInstallment(inst)){
          this.ts.error('Ops!', 'Preencha todos os campos obrigatórios dos pagamentos em edição.');
          return;
        }
        
        if(inst.isEditing && !this.validateInstallmentDateOnProject(inst)){
          const project = this.projects.find(p => p.id == +inst.projectId);
          const start = moment(project.start, 'YYYY-MM-DD').format('DD/MM/YYYY'),
                end = moment(project.end, 'YYYY-MM-DD').format('DD/MM/YYYY');
          this.ts.error('Ops!', `O gasto deve estar dentro do período do projeto (entre ${start} e ${end}).`);
          return;
        }
      }
    }

    this.editing = !this.editing;
      _selectedInstallments.map(installment => {
        installment.isEditing = this.editing;
        return installment;
      });
    if(!this.editing){
      this.updateCostShare();
    }
  }

  indexTracker(index: number, value: any) {
    return index;
  }

  updateInstallment(installmentIndex: number) {
    const installment = this.expenseItem.installments[installmentIndex];

    if(installment.isEditing && !this.validateInstallment(installment)){
      this.ts.error('Ops!', 'Preencha todos os campos obrigatórios do pagamento.');
      return;
    }

    if(installment.isEditing && !this.validateInstallmentDateOnProject(installment)){
      const project = this.projects.find(p => p.id == +installment.projectId);
      const start = moment(project.start, 'YYYY-MM-DD').format('DD/MM/YYYY'),
            end = moment(project.end, 'YYYY-MM-DD').format('DD/MM/YYYY');
      this.ts.error('Ops!', `O gasto deve estar dentro do período do projeto (entre ${start} e ${end}).`);
      return;
    }

    installment.isEditing = !installment.isEditing;
    
    if(!installment.isEditing){
      this.updateCostShare();
    }
  }

  private validateInstallment(installment: ExpenseInstallment) : boolean {
    return installment.value != undefined && installment.value > 0 &&
      installment.projectId != undefined && installment.projectId != 0 &&
      (installment.str_date != undefined && installment.str_date.includes('/'));
  }

  private validateInstallmentDateOnProject(installment: ExpenseInstallment) : boolean {

    const project = this.projects.find(p => p.id == +installment.projectId);
    const fundDate = moment(installment.str_date, 'dd/MM/yyyy');
    return fundDate.isSameOrAfter(moment(project.start, 'yyyy-MM-dd')) 
      && fundDate.isSameOrBefore(moment(project.end, 'yyyy-MM-dd'));   

  }


  updateCostShare() {
    const costShare = new Map<number, number>();
    let expenseTotal = 0;
    this.expenseItem.installments.forEach(inst => {
      // inst.value = parseFloat(`${inst.value}`);
      const item = costShare.get(inst.project.id);
      if (item) {
        costShare.set(inst.project.id, item + +inst.value);
      } else {
        costShare.set(inst.project.id, +inst.value);
      }
      expenseTotal += +inst.value;
    });
    this.expenseItem.value = expenseTotal;

    this.expenseItem.costShare = Array.from(costShare.keys()).map(p => {
      const project = this.projects.find( _p => _p.id == p);
      return <CostShare>{
        project: project,
        projectId: project.id,
        value: costShare.get(p)
      }
      });
  }

  fillInstallmentProject(installmentIndex: number) {
    const installment = this.expenseItem.installments[installmentIndex];
    installment.project = this.projects.find(p => p.id == +installment.projectId);
  }

}
