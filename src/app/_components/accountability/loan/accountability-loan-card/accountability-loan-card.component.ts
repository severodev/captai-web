import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AccountabilityLoanFormComponent } from '../accountability-loan-form/accountability-loan-form.component';
import { AccountabilityLoan } from 'src/app/_models/accountability-loan';
import { ConfirmAlertService } from 'src/app/_services/confirm-alert.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { LoanService } from 'src/app/_services/loan.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-accountability-loan-card',
  templateUrl: './accountability-loan-card.component.html',
  styleUrls: ['./accountability-loan-card.component.scss'],
})
export class AccountabilityLoanCardComponent implements OnInit {
  @Input() accountabilityLoan: AccountabilityLoan;
  @Output() cardChanges = new EventEmitter<object>();
  formattedDate : boolean = false;
  dateInfoReceipt : string[];
  dateReceiptFormated : string;
  dateInfoReturn : string[];
  dateReturnFormated : string;
  modalRef: BsModalRef;

  private routeSub: Subscription;
  private projectId : number;

  constructor(
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private confirmAlertService: ConfirmAlertService,
    private loanServive: LoanService
  ) {}

  ngOnInit(): void {
    
    if(new Date(String(this.accountabilityLoan.receiptDate)).toJSON().slice(0,10).includes('-') || new Date(String(this.accountabilityLoan.returnDate)).toJSON().slice(0,10).includes('-')){
      this.formatDate(this.accountabilityLoan);
      this.formattedDate = true;
    } else {
      this.formattedDate = false;
    }
  }

  formatDate(accountabilityLoan : AccountabilityLoan) {
    if(accountabilityLoan.receiptDate != null){
      this.dateInfoReceipt = new Date(String(accountabilityLoan.receiptDate)).toJSON().slice(0,10).split('-');
      this.dateReceiptFormated = `${this.dateInfoReceipt[2]}/${this.dateInfoReceipt[1]}/${this.dateInfoReceipt[0]}`;
    }
    
    if(accountabilityLoan.returnDate != null){
      this.dateInfoReturn = new Date(String(accountabilityLoan.returnDate)).toJSON().slice(0,10).split('-');
      this.dateReturnFormated = `${this.dateInfoReturn[2]}/${this.dateInfoReturn[1]}/${this.dateInfoReturn[0]}`;
    }
  }

  openLoanModal() {
    this.routeSub = this.route.params.subscribe(params => {
      this.projectId = params['projectId'];
      let config : ModalOptions = {};
      if(this.accountabilityLoan.originProject != this.projectId){
        config = {
          class: 'modal-dialog-centered modal-sm',
          initialState: {
            projectId : this.projectId,
            accountabilityLoan: this.accountabilityLoan,
          }
        };
      } else {
        config = {
          class: 'modal-dialog-centered modal-sm',
          initialState: {
            projectId : this.accountabilityLoan.targetProject,
            accountabilityLoan: this.accountabilityLoan,
          }
        };
      }

      this.modalRef = this.modalService.show(
        AccountabilityLoanFormComponent,
        config
      );

      this.modalRef.content.onSave.subscribe(event => {
        this.formatDate(event);
        this.cardChanges.emit({
          type : 'UPDATE',
          loan : this.accountabilityLoan
        });
      });
    });
  }

  confirmDelete() {
    this.confirmAlertService
      .initAlert('Essa ação irá remover o empréstimo.')
      .subscribe((event) => {
        if (event) {
          this.cardChanges.emit({
            type : 'DELETE',
            loan : this.accountabilityLoan
          })
          this.loanServive.deleteLoan(this.accountabilityLoan.id).subscribe((data) => {
            this.confirmAlertService.reset();
          });
        }
      });
  }

  confirmReceipt(): void {
    if(this.accountabilityLoan.confirmationOfReceive == false){
      this.confirmAlertService
      .initAlert('Essa ação irá confirmar o recebimento deste empréstimo.')
      .subscribe((event) => {
        if(event){
          this.loanServive.confirmLoan(this.accountabilityLoan.id).subscribe((data) => {
            this.cardChanges.emit({
              type : 'CONFIRM',
            });
          })
          this.accountabilityLoan.confirmationOfReceive = true;
          this.confirmAlertService.reset();
        }
      })
    }
  }

  returnLoan(): void {
    if(this.accountabilityLoan.confirmationOfDevolution == false){
      this.confirmAlertService
      .initAlert('Esta ação irá devolver o empréstimo.')
      .subscribe((event) => {
        if(event){
          this.cardChanges.emit({
            type : 'CONFIRM',
          });
          this.loanServive.returnLoan(this.accountabilityLoan.id).subscribe();
          this.accountabilityLoan.confirmationOfDevolution = true;
          this.confirmAlertService.reset();
        }
      })
    }
  }

}
