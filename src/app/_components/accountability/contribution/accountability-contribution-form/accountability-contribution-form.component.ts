import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { AccountabilityContribuition } from 'src/app/_models/accountability-contribuition';
import { BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { ContributionService } from 'src/app/_services/contribution.service';

@Component({
  selector: 'app-accountability-contribution-form',
  templateUrl: './accountability-contribution-form.component.html',
  styleUrls: ['./accountability-contribution-form.component.scss'],
})
export class AccountabilityContributionFormComponent implements OnInit {
  public accountabilityContribuition: AccountabilityContribuition = null;
  @ViewChild('accountabilityContribuitionForm') accountabilityContribuitionForm: any;

  @Output() onSave: EventEmitter<AccountabilityContribuition> = new EventEmitter();

  private projectId : any = 0;
  public editConfiguration : boolean;
  dateString : string;
  originalAmount : number;
  originalDate : Date;

  constructor(
    public bsModalRef: BsModalRef,
    private contributionService : ContributionService,
    public options: ModalOptions
  ) {
    this.projectId = this.options.initialState['projectId'];
  }

  ngOnInit(): void {

    if (!this.accountabilityContribuition){
      this.editConfiguration = false;
      this.init();
    }
    else{
      this.originalAmount = this.accountabilityContribuition.amount;
      this.dateString = new Date(this.accountabilityContribuition.receiptDate).toJSON().slice(0,10);
      this.originalDate = this.accountabilityContribuition.receiptDate;
      this.editConfiguration = true;
    }
  }

  update(){
      const { id, amount, receiptDate } = this.accountabilityContribuition;

      this.contributionService.updateContribution(id, {
        amount,
        project : this.projectId,
        receiptDate : receiptDate
      }).subscribe();

      this.onSave.emit(this.accountabilityContribuition);
      this.bsModalRef.hide();
  }

  cancel(){
    this.accountabilityContribuition.amount = this.originalAmount;
    this.accountabilityContribuition.receiptDate = this.originalDate;
    this.bsModalRef.hide();
  }

  async save() {

    const { amount, receiptDate } = this.accountabilityContribuition;
    this.contributionService.createContribution(
      {
        amount: amount,
        project: this.projectId,
        receiptDate: receiptDate
      }
    ).subscribe((data) => {
      this.onSave.emit(data);
    });

    
    this.bsModalRef.hide();
  }

  init(): void {
    this.accountabilityContribuition = {
      id: null,
      amount: null,
      receiptDate: null,
      confirmationOfReceive: false,
    };
  }
}
