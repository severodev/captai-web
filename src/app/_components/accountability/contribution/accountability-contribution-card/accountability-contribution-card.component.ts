import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { AccountabilityContributionFormComponent } from '../accountability-contribution-form/accountability-contribution-form.component';
import { ConfirmAlertService } from 'src/app/_services/confirm-alert.service';
import { AccountabilityContribuition } from 'src/app/_models/accountability-contribuition';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ContributionService } from 'src/app/_services/contribution.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-accountability-contribution-card',
  templateUrl: './accountability-contribution-card.component.html',
  styleUrls: ['./accountability-contribution-card.component.scss'],
})
export class AccountabilityContributionCardComponent implements OnInit {
  @Input() accountabilityContribuition: AccountabilityContribuition;
  @Output() cardChanges = new EventEmitter<object>();
  dateInfo : string[];
  dateFormated : string;
  modalRef: BsModalRef;

  private routeSub: Subscription;
  private projectId : number;

  constructor(
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private confirmAlertService: ConfirmAlertService,
    private contributionService : ContributionService
  ) {}

  ngOnInit(): void {
    if(new Date(String(this.accountabilityContribuition.receiptDate)).toJSON().slice(0,10).includes('-')){
      this.formatDate(this.accountabilityContribuition);
    }
  }

  formatDate(accountabilityContribuition : AccountabilityContribuition) {
    this.dateInfo = new Date(String(accountabilityContribuition.receiptDate)).toJSON().slice(0,10).split('-');
    this.dateFormated = `${this.dateInfo[2]}/${this.dateInfo[1]}/${this.dateInfo[0]}`
  }

  openContributionModal() {
    this.routeSub = this.route.params.subscribe(params => {
      this.projectId = params['projectId'];

      const config: ModalOptions = {
        class: 'modal-dialog-centered modal-sm',
        initialState: {
          projectId : this.projectId,
          accountabilityContribuition: this.accountabilityContribuition
        }
      };

      this.modalRef = this.modalService.show(
        AccountabilityContributionFormComponent,
        config
      );
    });

    this.modalRef.content.onSave.subscribe(event => {
      this.formatDate(event);
      this.cardChanges.emit({
        type : 'UPDATE',
        contribution : this.accountabilityContribuition
      });
    });
  }

  confirmDelete() {

    this.confirmAlertService
      .initAlert('Essa ação irá remover o aporte.')
      .subscribe((event) => {
        if (event) {
          this.cardChanges.emit({
            type : 'DELETE',
            contribution : this.accountabilityContribuition
          });
          this.contributionService.deleteContribution(this.accountabilityContribuition.id).subscribe((data) => {
            this.confirmAlertService.reset();
          });
        }
      });
  }

  confirmReceipt(): void {
    if(this.accountabilityContribuition.confirmationOfReceive == false){
      this.confirmAlertService
      .initAlert('Essa ação irá confirmar o recebimento do aporte.')
      .subscribe((event) => {
        if(event){
          this.contributionService.confirmContribution(this.accountabilityContribuition.id).subscribe((data) => {
            this.cardChanges.emit({
              type : 'CONFIRM',
              contribution : this.accountabilityContribuition
            });
          });
          this.accountabilityContribuition.confirmationOfReceive = true;
          this.confirmAlertService.reset();
        }
      })
    }
  }
}
