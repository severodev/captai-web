import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  public accessTokenSubject: Subject<{ title: string, message: string, color: string, timer: number }>;

  constructor() {
    this.accessTokenSubject = new Subject<{ title: string, message: string, color: string, timer: number }>();
  }

  private showToast(title: string, message: string, color: string, timer: number) {
    this.accessTokenSubject.next({ title: title, message: message, color: color, timer: timer });
  }

  success(title: string, message: string, timer: number = undefined) {
    this.showToast(title, message, '#6EA204', timer);
  }

  error(title: string, message: string, timer: number = undefined) {
    this.showToast(title, message, '#CE1126', timer);
  }

  info(title: string, message: string, timer: number = undefined) {
    this.showToast(title, message, '#007DB8', timer);
  }

}
