import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AccountabilityContributionFormComponent } from '../accountability-contribution-form/accountability-contribution-form.component';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { AccountabilityContribuition } from 'src/app/_models/accountability-contribuition';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ContributionService } from 'src/app/_services/contribution.service';
import { LoanService } from 'src/app/_services/loan.service';
import { ToastService } from 'src/app/_services/toast.service';
import { AccountabilityLoan } from 'src/app/_models/accountability-loan';

@Component({
  selector: 'app-accountability-contribution-grid',
  templateUrl: './accountability-contribution-grid.component.html',
  styleUrls: ['./accountability-contribution-grid.component.scss'],
})
export class AccountabilityContributionGridComponent implements OnInit, OnDestroy {
  public accountabilityContribuitions: AccountabilityContribuition[] = [];
  @Output() cardChangesContributions = new EventEmitter<string>();
  public modalRef: BsModalRef;
  private routeSub: Subscription;
  private projectId : number;
  public noneContributions : boolean;
  constructor(
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private contributionService : ContributionService,
    private ts: ToastService
    ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.projectId = params['projectId'];
    });

    this.contributionService.findContributionsByProjectId(this.projectId).subscribe((data) => {

      if(data.length == 0){
        this.noneContributions = true;
      } else {
        data.forEach(element => {
          this.accountabilityContribuitions.push({
            id : element.id,
            amount : element.amount,
            receiptDate : element.receiptDate,
            confirmationOfReceive : element.confirmationOfReceive
          });
        });
  
        this.noneContributions = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  cardChanges(change : any) {
    if(change.type == 'UPDATE'){
      this.cardChangesContributions.emit('contributionChange');
      this.accountabilityContribuitions.forEach((data, index) => {
        if(change.contribution.id == data.id){
          this.accountabilityContribuitions[index].amount = change.contribution.amount;
          this.accountabilityContribuitions[index].receiptDate = change.contribution.receiptDate;
        }
      });
    } else if (change.type == 'DELETE'){
      this.cardChangesContributions.emit('contributionChange');
      this.accountabilityContribuitions.forEach((data, index) => {
        if(change.contribution.id == data.id){
          this.accountabilityContribuitions.splice(index, 1);
          if(this.accountabilityContribuitions.length == 0){
            this.noneContributions = true;
          }
        }
      });
    } else if (change.type == 'CONFIRM'){
      this.cardChangesContributions.emit('contributionChange');
    }
  } 

  openContributionModal() {
    this.routeSub = this.route.params.subscribe(params => {
      this.projectId = params['projectId'];

      const config: ModalOptions = {
        class: 'modal-dialog-centered modal-sm',
        initialState : {
          projectId : this.projectId
        }
      };
  
      this.modalRef = this.modalService.show(
        AccountabilityContributionFormComponent,
        config
      );

    });
    
    this.modalRef.content.onSave.subscribe(event => {
      this.accountabilityContribuitions.push(event);
      this.cardChangesContributions.emit('contributionChange');
      this.noneContributions = false;
    });
    
  }
}
