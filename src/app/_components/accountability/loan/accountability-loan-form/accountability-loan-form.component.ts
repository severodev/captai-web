import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { AccountabilityLoan } from 'src/app/_models/accountability-loan';
import { Project } from 'src/app/_models/project';
import { BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { ProjectService } from 'src/app/_services/project.service';
import { LoanService } from 'src/app/_services/loan.service';

@Component({
  selector: 'app-accountability-loan-form',
  templateUrl: './accountability-loan-form.component.html',
  styleUrls: ['./accountability-loan-form.component.scss'],
})
export class AccountabilityLoanFormComponent implements OnInit {
  public accountabilityLoan: AccountabilityLoan;
  public projects: Project[];

  @ViewChild('accountabilityLoanForm') accountabilityLoanForm: any;

  @Output() onSave: EventEmitter<AccountabilityLoan> = new EventEmitter();

  private projectId : any = 0;
  public editConfiguration : boolean;

  originalAmount : number;
  originalReceiptDate : Date;
  originalReturnDate : Date;

  receiptDateString : string;
  returnDateString : string;

  institute: string;

  constructor(
    public bsModalRef: BsModalRef,
    private projectService: ProjectService,
    private loanService : LoanService,
    public options: ModalOptions
  ) {
    this.projectId = this.options.initialState['projectId'];
  }

  ngOnInit(): void {
    
    if (!this.accountabilityLoan){
      this.editConfiguration = false;
      this.init();
    }
    else{
      this.originalAmount = this.accountabilityLoan.amount;
      this.originalReceiptDate = this.accountabilityLoan.receiptDate;
      this.originalReturnDate = this.accountabilityLoan.returnDate;
      this.receiptDateString = new Date(this.accountabilityLoan.receiptDate).toJSON().slice(0,10);
      this.returnDateString = new Date(this.accountabilityLoan.returnDate).toJSON().slice(0,10);
      this.editConfiguration = true;
    }

    this.loadProjects();
  }

  async save() {

    const { amount, receiptDate, returnDate, targetProject } = this.accountabilityLoan;
    this.loanService.createLoan({
      amount : amount,
      originProject : this.projectId,
      targetProject : targetProject,
      receiptDate : receiptDate,
      returnDate : returnDate
    }).subscribe((data) => {
      this.onSave.emit({
        id : data.id,
        amount : Number(data.amount),
        receiptDate : data.receiptDate,
        returnDate : data.returnDate,
        confirmationOfReceive : data.confirmationOfReceive,
        targetProject : data.targetProject.id,
        targetProjectName : data.targetProject.name,
        originProject : data.originProject.id,
        originProjectName : data.originProject.name
      });
    })

    this.bsModalRef.hide();
  }

  update(): void{
    const { id, amount, receiptDate, returnDate, originProject, targetProject } = this.accountabilityLoan;
    if(targetProject == `${this.projectId}`){
      this.loanService.updateLoan(id, {
        amount : amount,
        originProject : originProject,
        targetProject : targetProject,
        receiptDate : receiptDate,
        returnDate : returnDate
      }).subscribe((data) => {
        this.accountabilityLoan.originProjectName = data.originProject.name;
        this.onSave.emit(this.accountabilityLoan);
        this.bsModalRef.hide();
      });
    } else {
      this.loanService.updateLoan(id, {
        amount : amount,
        originProject : originProject,
        targetProject : targetProject,
        receiptDate : receiptDate,
        returnDate : returnDate
      }).subscribe((data) => {
        this.accountabilityLoan.targetProjectName = data.targetProject.name;
        this.onSave.emit(this.accountabilityLoan);
        this.bsModalRef.hide();
      });
    }
  }

  init(): void {
    this.accountabilityLoan = {
      id: null,
      amount: null,
      receiptDate : null,
      returnDate : null,
      confirmationOfReceive : false,
      targetProject : null,
    };
  }

  cancel(){
    this.accountabilityLoan.amount = this.originalAmount;
    this.accountabilityLoan.receiptDate = this.originalReceiptDate;
    this.accountabilityLoan.returnDate = this.originalReturnDate;
    this.bsModalRef.hide();
  }

  private loadProjects() {
    this.projectService.getProjectsCards('', 1, 50, 1).subscribe(
      async (res) => {
        this.projectService.findInstituteByProjectId(this.projectId).subscribe((institute : any) => {
          this.projects = res.filter((project) => project.id != this.projectId && project.institute.abbreviation == institute.institute);
        })
      },
      () => (this.projects = [])
    );

  }
}
