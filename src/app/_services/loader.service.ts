import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  public isLoading = new BehaviorSubject(false);
  public customLoadig = new Subject<boolean>();

  show() {
    this.customLoadig.next(true);
  }

  hide() {
    this.customLoadig.next(false);
  }
  constructor() { }
}
