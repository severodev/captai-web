import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-terms-of-use-modal',
  templateUrl: './terms-of-use-modal.component.html',
  styleUrl: './terms-of-use-modal.component.scss'
})
export class TermsOfUseModalComponent {

  @Output() close: EventEmitter<void> = new EventEmitter();

  public termsText;

  onClose() {
    this.close.next();
  }
}