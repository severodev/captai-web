import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AccountabilityLoanFormComponent } from '../accountability-loan-form/accountability-loan-form.component';
import { AccountabilityLoan } from 'src/app/_models/accountability-loan';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { LoanService } from 'src/app/_services/loan.service';
import { ToastService } from 'src/app/_services/toast.service';

@Component({
  selector: 'app-accountability-loan-grid',
  templateUrl: './accountability-loan-grid.component.html',
  styleUrls: ['./accountability-loan-grid.component.scss'],
})
export class AccountabilityLoanGridComponent implements OnInit, OnDestroy {
  public accountabilityReceivedLoans: AccountabilityLoan[] = [];
  public accountabilityGivenLoans: AccountabilityLoan[] = [];
  @Output() cardChangesLoans = new EventEmitter<string>();
  public modalRef: BsModalRef;
  private routeSub: Subscription;
  private projectId : number;
  public noneLoansReceived : boolean;
  public noneLoansGiven : boolean;
  constructor(
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private loanService : LoanService,
    private ts: ToastService
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.projectId = params['projectId'];
    });

    this.loanService.findReceivedLoansByProductId(this.projectId).subscribe((data) => {

      if(data.length == 0){
        this.noneLoansReceived = true;
      } else {
        this.noneLoansReceived = false;
        data.forEach((element) => {        
          this.accountabilityReceivedLoans.push({
            id : element.id,
            amount : element.amount,
            receiptDate : element.receiptDate,
            returnDate : element.returnDate,
            confirmationOfReceive : element.confirmationOfReceive,
            confirmationOfDevolution : element.confirmationOfDevolution,
            targetProject : element.targetProject.id,
            targetProjectName : element.targetProject.name,
            originProject : element.originProject.id,
            originProjectName : element.originProject.name,
            cardType : 'ReceivedLoans'
          });
        });
      }
    });

    this.loanService.findGivenLoansByProductId(this.projectId).subscribe((data) => {
      if(data.length == 0){
        this.noneLoansGiven = true;
      } else {
        this.noneLoansGiven = false;
        data.forEach(element => {        
          this.accountabilityGivenLoans.push({
            id : element.id,
            amount : element.amount,
            receiptDate : element.receiptDate,
            returnDate : element.returnDate,
            confirmationOfReceive : element.confirmationOfReceive,
            confirmationOfDevolution : element.confirmationOfDevolution,
            targetProject : element.targetProject.id,
            targetProjectName : element.targetProject.name,
            originProject : element.originProject.id,
            originProjectName : element.originProject.name,
            cardType : 'GivenLoans'
          });
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  cardChanges(change : any) {
    if(change.type == 'UPDATE'){
      this.cardChangesLoans.emit('loanChange');
      if(change.loan.originProject ==  this.projectId){
        this.accountabilityGivenLoans.forEach((data, index) => {
        if(change.loan.id == data.id){
          this.accountabilityGivenLoans[index].amount = change.loan.amount;
          this.accountabilityGivenLoans[index].originProjectName = change.loan.originProjectName;
          this.accountabilityGivenLoans[index].receiptDate = change.loan.receiptDate;
          this.accountabilityGivenLoans[index].returnDate = change.loan.returnDate;
        }
      });
      } else {
        this.accountabilityReceivedLoans.forEach((data, index) => {
        if(change.loan.id == data.id){
          this.accountabilityReceivedLoans[index].amount = change.loan.amount;
          this.accountabilityReceivedLoans[index].receiptDate = change.loan.receiptDate;
          this.accountabilityReceivedLoans[index].returnDate = change.loan.returnDate;
          this.accountabilityReceivedLoans[index].originProjectName = change.loan.originProjectName;
        }
      });
      }
    } else if (change.type == 'DELETE'){
      this.cardChangesLoans.emit('loanChange');
      if(change.loan.originProject ==  this.projectId){
        this.accountabilityGivenLoans.forEach((data, index) => {
          if(change.loan.id == data.id){
            this.accountabilityGivenLoans.splice(index, 1);
            if(this.accountabilityGivenLoans.length == 0){
              this.noneLoansGiven = true;
            }
          }
        });
      } else {
        this.accountabilityReceivedLoans.forEach((data, index) => {
          if(change.loan.id == data.id){
            this.accountabilityReceivedLoans.splice(index, 1);
            if(this.accountabilityReceivedLoans.length == 0){
              this.noneLoansReceived = true;
            }
          }
        });
      }
    } else if (change.type == 'CONFIRM'){
      this.cardChangesLoans.emit('loanChange');
    }
  }

  openLoanModal() {
    this.routeSub = this.route.params.subscribe(params => {
      this.projectId = params['projectId'];

      const config: ModalOptions = {
        class: 'modal-dialog-centered modal-sm',
        initialState : {
          projectId : this.projectId
        }
      };
  
      this.modalRef = this.modalService.show(
        AccountabilityLoanFormComponent,
        config
      );
    });

    this.modalRef.content.onSave.subscribe(event => {
      if(event.originProject == this.projectId){
        event.cardType = 'GivenLoans';
        this.accountabilityGivenLoans.push(event);
        this.cardChangesLoans.emit('loanChange');
        this.noneLoansGiven = false;
      } else {
        event.cardType = 'ReceivedLoans';
        this.accountabilityGivenLoans.push(event);
        this.cardChangesLoans.emit('loanChange');
        this.noneLoansReceived = false;
      }
      
    });

  }
}
