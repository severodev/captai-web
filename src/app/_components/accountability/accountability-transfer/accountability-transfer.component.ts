import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable, of, throwError } from 'rxjs';
import { catchError, debounceTime, filter, map, switchMap, tap, throttleTime } from 'rxjs/operators';
import { Project } from 'src/app/_models/project';
import { ProjectService } from 'src/app/_services/project.service';
import { transfer } from 'src/app/_interfaces/transfer';
import { ToastService } from 'src/app/_services/toast.service';
import { ContributionService } from 'src/app/_services/contribution.service';


@Component({
  selector: 'app-accountability-transfer',
  templateUrl: './accountability-transfer.component.html',
  styleUrls: ['./accountability-transfer.component.scss']
})
export class AccountabilityTransferComponent implements OnInit {

  @Input()
  project: Project;
  modalRef: BsModalRef;

  transferForm;

  projectList$: Observable<Project[]>
  receivingProject: Project
  updatedValue;
  updateCurrentValue;

  constructor(
    public modalService: BsModalService,
    private fb: FormBuilder,
    private projectService: ProjectService,
    private contributionService: ContributionService,
    private ts: ToastService) { 
      this.transferForm = fb.group({
        receivingProjectId: ['', Validators.required],
        donatedAmount: ['', {
          validators: [Validators.required],
        }]
      })
      this.updatedValue = this.transferForm.get('donatedAmount').valueChanges.pipe(
        debounceTime(300),
        map((value : any) => {
          this.updateCurrentValue = of(this.project.expensesGrid.remainingRealMargin - value);
          return this.receivingProject.expensesGrid.remainingRealMargin + value;
        })
      )
    
    }

  ngOnInit(): void {
    this.updateCurrentValue = of(this.project.expensesGrid.remainingRealMargin);
    this.projectList$ = this.projectService.getProjectsDropdown(this.project.institute.id).pipe(
      map(res => res.filter((project) => project.id != this.project.id))
    )
  }

  showTransferModal(modal: any) {
    this.modalRef = this.modalService.show(modal)
  }

  getReceivingProject() {
    this.projectService.getProjectDetailed(this.transferForm.get('receivingProjectId').value, 'undefined')
    .subscribe(response => this.receivingProject = response)
  }

  cancel() {
    this.modalRef.hide()
    this.transferForm.reset()
  }

  save() {
    const body: transfer = {
      donatingProjectId: this.project.id,
      receivingProjectId: +this.transferForm.get('receivingProjectId').value,
      donatedAmount: this.transferForm.get('donatedAmount').value,
      transferDate: new Date()
    }

    this.contributionService.createTransfer(body).pipe(
      throttleTime(500),
      catchError(err => {
        console.error(err)
        this.ts.error('Ocorreu um erro!', err)
        return throwError(err)
      }))
      .subscribe(res => {
        this.project.expensesGrid.remainingRealMargin -= body.donatedAmount;
        this.project.budget = this.project.expensesGrid.remainingRealMargin;
        this.cancel()
        this.ts.success('', 'Transferência cadastrada com sucesso')
    })
  }

}
