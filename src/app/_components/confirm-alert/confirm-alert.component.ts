import { Component, OnDestroy, OnInit } from '@angular/core';

import { ConfirmAlertService } from 'src/app/_services/confirm-alert.service';

@Component({
  selector: 'app-confirm-alert',
  templateUrl: './confirm-alert.component.html',
  styleUrls: ['./confirm-alert.component.scss']
})
export class ConfirmAlertComponent implements OnInit, OnDestroy {

  constructor(
    public confirmAlertService: ConfirmAlertService
  ) { }

  ngOnInit(): void {
  }
  
  send() {
    this.confirmAlertService.emitConfirmAlertEvent();
  }

  cancel() {
    document.getElementById("confirmAlert").classList.add('fadeOut');

    setTimeout(() => {
      this.confirmAlertService.showAlert = false;
      this.confirmAlertService.reset();
    }, 950);
  }

  ngOnDestroy() {
    this.confirmAlertService.reset();
  }

}
