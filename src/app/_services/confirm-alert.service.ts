import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmAlertService {

  public showAlert: boolean = false;

  public boldText: string = "Você tem certeza?";
  public text: string;
  public confirmButtonText: string = "Sim";

  private dataSource = new BehaviorSubject(false);
  datasourse$ = this.dataSource.asObservable();

  constructor() { }

  getValue() {
    return this.dataSource.getValue()
  }

  initAlert(text?: string) {
    this.showAlert = true;
    this.text = text ? text : "";
    
    return this.datasourse$
  }

  emitConfirmAlertEvent(){
    this.dataSource.next(true);
  }

  reset() {
    this.showAlert = false;
    this.boldText = "Você tem certeza?";
    this.text = undefined;
    this.confirmButtonText = "Sim";
    this.dataSource.next(false);
  }
  
}
