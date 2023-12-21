import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Collaborator } from 'src/app/_models/collaborator';
import { Benefit } from '../../../_models/benefit';
import { PaymentInformation } from '../../../_models/payment-information';
import { CollaboratorService } from '../../../_services/collaborator.service';

@Component({
  selector: 'app-benefits-form',
  templateUrl: './benefits-form.component.html',
  styleUrls: ['./benefits-form.component.scss']
})
export class BenefitsFormComponent implements OnInit {

  @Input()
  collaborator: Collaborator;

  @Input()
  canEdit: boolean = true;

  selectBenefitsModalRef: BsModalRef;

  editBenefitModalRef: BsModalRef;

  selectedPayment: PaymentInformation;

  availableBenefits: Benefit[];

  selectedBenefit: Benefit;

  constructor(private modalService: BsModalService, private collaboratorService: CollaboratorService) { }

  ngOnInit(): void {
  }

  showSelectBenefitsModal(modal: any, payment: any) {
    this.selectBenefitsModalRef = this.modalService.show(modal);    
    this.selectedPayment = payment;
    this.loadAvailableBenefits();
  }

  loadAvailableBenefits(){
    this.collaboratorService
      .getAvaliableBenefits(
        this.selectedPayment.employmentRelationship.id,
        this.selectedPayment.institute.id,
        this.selectedPayment.id
      )
      .subscribe((res: Benefit[]) => {
        this.availableBenefits = res.filter( r => !this.selectedPayment.benefits.some(b => b.benefitType.id == r.benefitType.id));
      });
  }

  editBenefit(index: number, modal: any){
    this.selectedBenefit = this.availableBenefits[index];
    this.selectBenefitsModalRef.hide();
    this.editBenefitModalRef = this.modalService.show(modal);
  }

  anyBenefitSelected(): boolean {
    return this.availableBenefits?.filter((benefit) => {
      return benefit.selected == true;
    }).every(benefit => benefit.amountValue != 0) && this.availableBenefits?.filter((benefit) => {
      return benefit.selected == true;
    }).length != 0
  }

  setSelectedBenefitAmountType(type: string): void {
    this.selectedBenefit.amountType = type;
  }

  setSelectedBenefitDeductionType(type: string): void {
    this.selectedBenefit.deductionType = type;
  }

  saveBenefitChanges(modal: any): void {    
    this.editBenefitModalRef.hide();
    this.selectBenefitsModalRef = this.modalService.show(modal);
  }

  addBenefits(): void {
    const seletedBenefits = this.availableBenefits.filter(b => b.selected == true);
    this.selectedPayment.benefits.push(...seletedBenefits);
    this.selectBenefitsModalRef.hide();
  }

  removeBenefit(paymentIndex: number, benefitIndex: number): void {
    this.collaborator.payments[paymentIndex]?.benefits?.splice(benefitIndex, 1);
  }

}
