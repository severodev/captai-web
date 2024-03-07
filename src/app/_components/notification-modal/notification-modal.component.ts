import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-notification-modal',
  templateUrl: './notification-modal.component.html',
  styleUrl: './notification-modal.component.scss'
})
export class NotificationModalComponent {
  @Output() onSubmit: EventEmitter<void> = new EventEmitter();
  public title = '';
  public message = '';
  submit() {
    console.log('click')
    this.onSubmit.next();
  }
}