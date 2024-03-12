import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  public optionIndex = 1;
  accessToken: string;

  constructor(
    private router: Router, 
    private authService: AuthService
  ) {
    this.authService.accessToken.subscribe(token => {
      this.accessToken = token;
    });
  }

  setSelectedButton(index: number) {
    this.optionIndex = index;
  }

  logout() {
    this.authService.logout();
    this.accessToken = null;
    this.router.navigate(['/login']);
  }
}
