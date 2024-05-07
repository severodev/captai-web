import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.scss'
})
export class ConfirmModal {

  @Output() close: EventEmitter<void> = new EventEmitter();
  @Output() accepted: EventEmitter<void> = new EventEmitter();


  public title = '';
  public message = '';

  onClose() {
    this.close.next();
  }
  onAccepted() {
    this.accepted.next();
  }
}