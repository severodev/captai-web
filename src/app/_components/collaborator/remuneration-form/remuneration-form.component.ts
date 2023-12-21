import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { PaymentInformation } from 'src/app/_models/payment-information';
import { Collaborator } from 'src/app/_models/collaborator';
import { Institute } from 'src/app/_models/institute';
import { Project } from 'src/app/_models/project';
import { EmploymentRelationship } from 'src/app/_models/employment-relationship';

import { ProjectService } from 'src/app/_services/project.service';
import { InstituteService } from 'src/app/_services/institute.service';
import { CollaboratorService } from 'src/app/_services/collaborator.service';
import { BudgetCategory } from '../../../_models/budget-category';
import { SupplierService } from '../../../_services/supplier.service';

import { formatDate } from 'src/app/_helpers/utils'
import { ToastService } from 'src/app/_services/toast.service';
import { ConfirmAlertService } from 'src/app/_services/confirm-alert.service';
import { formatDateMomentFromStr } from './../../../_helpers/utils';
import * as moment from 'moment';

@Component({
  selector: 'app-remuneration-form',
  templateUrl: './remuneration-form.component.html',
  styleUrls: ['./remuneration-form.component.scss'],
})
export class RemunerationFormComponent implements OnInit {

  @Input()
  collaborator: Collaborator;

  @Input()
  canEdit: boolean = true;

  institutesDropdown: Institute[];

  projectsDropdown: Project[];

  employmentRelationshipDropdown: EmploymentRelationship[];

  budgetCategoryDropdown: BudgetCategory[];

  payment: PaymentInformation;

  isAdmissionValid: boolean = true;

  constructor(
    private projectService: ProjectService,
    private instituteService: InstituteService,
    private collaboratorService: CollaboratorService,
    private suppliersService: SupplierService,
    private ts: ToastService,
    private confirmAlert: ConfirmAlertService
  ) { }

  ngOnInit(): void {
    this.initPayment();
    this.loadInstitutesDropdown();
    this.loadEmploymentRelationshipDropdown();
    this.loadBudgetCategoryDropdown();
  }

  getinvalidRemunerationDates() {
    const admissionDate = Date.parse(formatDate(this.payment.admission));
    const dismissalDate = Date.parse(formatDate(this.payment.dismissal));

    if (this.payment.dismissal) {
      if (isNaN(admissionDate) || isNaN(dismissalDate)) {
        return true;
      } else if (admissionDate > dismissalDate) {
        return true;
      }
      return false;
    } else if (isNaN(admissionDate)) {
      return true;
    }
    return false;
  }

  initPayment() {
    this.payment = new PaymentInformation();
    this.payment.idInstitute = '';
    this.payment.idEmploymentRelationship = '';
    this.payment.idProject = '';
    this.payment.idBudgetCategory = '';
    this.payment.benefits = [];
    this.payment.selected = false;
    this.projectsDropdown = [];
    this.payment.institute = {};
    this.payment.employmentRelationship = {};
    this.payment.project = {};
    this.payment.budgetCategory = {};
  }

  addPayment() {
    if (this.getinvalidRemunerationDates()) return this.ts.error("Ocorreu um erro", "Data de desligamento inferior à data de admissão")
    this.collaborator.payments.push(this.payment);
    this.initPayment();
  }

  loadInstitutesDropdown() {
    this.instituteService
      .getInstitutesDropdown()
      .subscribe((res: Institute[]) => {
        this.institutesDropdown = res;
      });
  }

  loadBudgetCategoryDropdown() {
    this.suppliersService
      .getBudgetCategoriesDropdown()
      .subscribe((res: BudgetCategory[]) => {
        this.budgetCategoryDropdown = res.filter(bc => bc.name.includes("RH"));
      });
  }

  loadProjectsDropdown(instituteId: number) {
    this.projectService.getProjectsDropdown(instituteId).subscribe((res: Project[]) => {
      this.payment.idProject = "";
      this.projectsDropdown = res;
    });

    let instituteSelected = this.institutesDropdown.find(i => i.id == instituteId);
    this.payment.institute.id = instituteSelected.id;
    this.payment.institute.name = instituteSelected.name;
    this.payment.institute.abbreviation = instituteSelected.abbreviation;
  }

  selectProject(projectId: number) {
    this.payment.project = this.projectsDropdown.find(p => p.id == projectId);
    if(this.payment.admission) this.validateAdmission(this.payment.admission)
  }

  getProjectDurationStr() : string {
    if(this.payment.project && this.payment.project.start) {
      return `Período: ${formatDateMomentFromStr(this.payment.project.start)} - ${this.payment.project.end ? formatDateMomentFromStr(this.payment.project.end) : "[Aberto]"}`;
    }
    return "";
  }

  selectEmploymentRelationship(employmentRelationshipId: number) {
    this.payment.employmentRelationship = this.employmentRelationshipDropdown.find(er => er.id == employmentRelationshipId);
  }

  selectBudgetCategory(budgetCategoryId: number) {
    this.payment.budgetCategory = this.budgetCategoryDropdown.find(bc => bc.id == budgetCategoryId);
  }

  loadEmploymentRelationshipDropdown() {
    this.collaboratorService
      .getEmploymentRelationshipDropdown()
      .subscribe((res: EmploymentRelationship[]) => {
        this.employmentRelationshipDropdown = res;
      });
  }

  deletePayment(index) {
    this.confirmAlert.initAlert("Tem certeza que deseja remover a remuneração?").subscribe(event => {
      if(this.confirmAlert.getValue()) {
        this.collaborator.payments.splice(index, 1);
        this.confirmAlert.reset()
      }
    })
  }

  editPayment(index) {

  }

  validateAdmission(admission: string) {
    const admissionDate = moment(admission, "DD/MM/YYYY")
    
    return this.isAdmissionValid = admissionDate.isSameOrAfter(moment(this.payment.project.start)) 
      && admissionDate.isSameOrBefore(moment(this.payment.project.end));
  }
}
