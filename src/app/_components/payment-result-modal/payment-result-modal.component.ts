import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-payment-result-modal',
  templateUrl: './payment-result-modal.component.html',
  styleUrl: './payment-result-modal.component.scss'
})
export class PaymentResultModalComponent {

  public icon = '';
  public title = '';
  public message = '';
  public buttonLabel = '';

  @Output() close: EventEmitter<void> = new EventEmitter();

  buttonHandler() {
    this.close.next();
  }

}