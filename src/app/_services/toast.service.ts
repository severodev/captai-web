import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  public accessTokenSubject: Subject<{ title: string, message: string, color: string, fontColor: String, timer: number }>;

  constructor() {
    this.accessTokenSubject = new Subject<{ title: string, message: string, color: string, fontColor: String, timer: number }>();
  }

  private showToast(title: string, message: string, color: string, fontColor:string, timer: number) {
    this.accessTokenSubject.next({ title: title, message: message, color: color, fontColor: fontColor, timer: timer });
  }

  success(title: string, message: string, timer: number = undefined) {
    this.showToast(title, message, '#ebf4ed', '#308c47',timer);
  }

  error(title: string, message: string, timer: number = undefined) {
    this.showToast(title, message, '#fbe6e5', '#be3f3f',timer);
  }

  info(title: string, message: string, timer: number = undefined) {
    this.showToast(title, message, '#a8d8ff', '#006ac1',timer);
  }

}
