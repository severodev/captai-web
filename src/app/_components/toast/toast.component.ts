import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
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
  public fontColor: string;

  public timeout;

  public accessToken: string;

  constructor(
    private toastService: ToastService,
    private authService: AuthService
  ) {
    this.authService.accessToken.subscribe(token => {
      this.accessToken = token;
    });
  }

  ngOnInit(): void {
    this.toastService.accessTokenSubject.subscribe((data: {title: string, message: string, color: string, fontColor: string, timer: number}) => {
      this.showToast(data.title, data.message, data.color, data.fontColor, data.timer);
    });
  }

  showToast(title: string, message: string, color: string, fontColor: string, timer: number) {
    this.title = title;
    this.message = message;

    if(this.isShow) {
      clearTimeout(this.timeout);
      document.getElementById("alertSystem").classList.remove('fadeOut');
    }

    this.isShow = true;
    this.color = color;
    this.fontColor = fontColor;

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
