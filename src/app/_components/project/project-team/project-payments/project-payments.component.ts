import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import * as moment from 'moment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Project } from '../../../../_models/project';
import { CollaboratorService } from '../../../../_services/collaborator.service';
import { ToastService } from '../../../../_services/toast.service';

@Component({
  selector: 'app-project-payments',
  templateUrl: './project-payments.component.html',
  styleUrls: ['./project-payments.component.scss'],
})
export class ProjectPaymentsComponent implements OnInit, OnChanges {
  @Input() activeMonth: string = '';

  @Input() public project: Project;

  @Output()
  showMonth = new EventEmitter<string>();

  hrPayments: any;
  selectedMonthPayments: any[];
  selectedMonthSummary: Map<string, number>;
  selectedPayment: any;
  
  isAllPaymentsUpdate: boolean;  
  isAllPaymentsPaid: boolean;

  confirmPaymentModalRef: BsModalRef;
  allPaymentsNextState: boolean;

  baseTableColumns = ['Salário', 'Encargos'];
  currentTableColumns: string[];

  constructor(
    private collaboratorService: CollaboratorService,
    private modalService: BsModalService,
    private ts: ToastService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.project) {
      this.buildPaymentsMap();
    }
  }

  buildPaymentsMap() {
    const monthRef = moment(this.project.start, 'dd/MM/yyyy').date(1);
    const endRef = moment(this.project.end, 'dd/MM/yyyy').endOf('month');

    const monthsList = new Map<string, any>();
    while (monthRef.isBefore(endRef)) {
      const currentMonthKey = monthRef.format('MMM/YY').toUpperCase();
      monthsList.set(currentMonthKey, []);
      monthRef.add(1, 'month');
    }

    for (const e of this.project.hrPayments) {
      const currentPaymentKey = moment(`25/${e.month}/${e.year}`, 'dd/MM/yyyy')
        .format('MMM/YY')
        .toUpperCase();
      const currentMonth = monthsList.get(currentPaymentKey);
      if (currentMonth) {
        currentMonth.push(e);
      }
    }

    this.hrPayments = Array.from(monthsList.keys()).map((key) => ({
      header: key,
      list: monthsList.get(key),
    }));
    this.setShowMonth(monthsList.keys().next().value);
  }

  setShowMonth(tag) {
    this.activeMonth = tag;
    this.selectedMonthPayments = this.hrPayments.find(
      (item) => item.header == tag
    ).list;

    const benefitsHeaderSet = new Set<string>();
    this.selectedMonthSummary = new Map<string, number>();
    this.isAllPaymentsPaid = true;
    this.selectedMonthPayments.forEach((payment) => {
      payment.components.forEach((component) => {
        if (!this.baseTableColumns.includes(component.description)) {
          benefitsHeaderSet.add(component.description);
        }
        const currentCategoryValue = this.selectedMonthSummary.get(
          component.description
        );
        this.selectedMonthSummary.set(
          component.description,
          currentCategoryValue
            ? currentCategoryValue + component.value
            : component.value
        );
      });
      if (!payment.paid) {
        this.isAllPaymentsPaid = false;
      }
    });

    this.currentTableColumns = [
      ...this.baseTableColumns,
      ...Array.from(benefitsHeaderSet.values()).sort(),
    ];

    if (this.selectedMonthPayments) {
      this.selectedMonthPayments.sort(
        (e1, e2) => e1.collaborator.name - e2.collaborator.name
      );
    }

    this.showMonth.emit(tag);
  }

  componentValue(payment: any, key: string) {
    const component = payment.components?.find((c) => c.description == key);
    return component ? component.value : null;
  }

  summaryTotal() {
    const total = Array.from(this.selectedMonthSummary.values()).reduce(
      (soma, item) => soma + item,
      0
    );
    return total;
  }

  showConfirmPaymentModal(event:any, modal: any, payment: any, allPaymentsUpdate: boolean) {
    event.preventDefault();
    this.isAllPaymentsUpdate = allPaymentsUpdate;
    if(this.isAllPaymentsUpdate){
      this.allPaymentsNextState = !this.selectedMonthPayments.every((p) => p.paid == true);
    } else {
      this.selectedPayment = payment;      
    }
    this.confirmPaymentModalRef = this.modalService.show(modal);
  }

  confirmHRPayment(modal: any): void {
    if (this.isAllPaymentsUpdate) {
      this.collaboratorService
        .confirmAllHRPayments(
          this.allPaymentsNextState,
          this.selectedMonthPayments.map((p) => +p.id)
        )
        .subscribe((result: boolean) => {
          this.selectedMonthPayments.forEach((p) => (p.paid = result));
          this.isAllPaymentsPaid = result;

          this.ts.success(
            'Ação concluída!',
            `${result ? 'Confirmação' : 'Cancelamento'} de pagamentos ${
              result ? 'realizada' : 'realizado'
            } com sucesso.`
          ); // TODO: trazer chave de i18n
        });
    } else {
      const collaboratorId = this.selectedPayment.collaborator.id;
      const paymentId = this.selectedPayment.id;

      this.collaboratorService
        .confirmHRPayment(collaboratorId, paymentId)
        .subscribe((result: boolean) => {
          const selectedPayment = this.selectedMonthPayments.find(
            (p) => p.id == paymentId
          );
          selectedPayment.paid = result;

          this.isAllPaymentsPaid = this.selectedMonthPayments.every(
            (i) => i.paid == true
          );

          this.ts.success(
            'Ação concluída!',
            `${
              selectedPayment.paid ? 'Confirmação' : 'Cancelamento'
            } de pagamento ${
              selectedPayment.paid ? 'realizada' : 'realizado'
            } com sucesso.`
          ); // TODO: trazer chave de i18n
        });
    }
    this.confirmPaymentModalRef.hide();
  }

}
