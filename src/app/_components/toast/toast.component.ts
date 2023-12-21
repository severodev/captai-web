import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/_services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  
  public isShow: boolean = false;

  public title: string = '';
  public message: string = '';
  public color: string;

  public timeout;

  constructor(
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.toastService.accessTokenSubject.subscribe((data: {title: string, message: string, color: string, timer: number}) => {
      this.showToast(data.title, data.message, data.color, data.timer);
    });
  }

  showToast(title: string, message: string, color: string, timer: number) {
    this.title = title;
    this.message = message;

    if(this.isShow) {
      clearTimeout(this.timeout);
      document.getElementById("alertSystem").classList.remove('fadeOut');
    }

    this.isShow = true;
    this.color = color;

    this.timeout = setTimeout(() => {
      this.close();
    }, timer ? timer : 4000);
  }

  close() {
    document.getElementById("alertSystem").classList.add('fadeOut');
    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      this.isShow = false;
    }, 950);
  }

}
