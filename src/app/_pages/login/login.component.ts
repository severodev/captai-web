import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/_services/auth.service';
import { CustomValidator } from 'src/app/_helpers/custom-validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  credentials: {
    username: string;
    password: string;
  }

  isInvalidCredentials: boolean;
  keepConnected: boolean;

  private validator: CustomValidator;

  constructor(private router: Router,
    private authService: AuthService) {
    // redirect to home if already logged in
    if (this.authService.accessTokenValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.credentials = {
      username: null,
      password: null
    };
    this.validator = new CustomValidator();
    this.isInvalidCredentials = false;
    this.keepConnected = false;
  }

  login() {
    if (!this.validator.isEmpty(this.credentials.username) &&
        !this.validator.isEmpty(this.credentials.password)) {

      this.authService.login(this.credentials.username, this.credentials.password, this.keepConnected)
        .subscribe((res) => {
          this.router.navigate(['/home']);
        }, (err) => {
          console.error(err);
          this.isInvalidCredentials = true;
        });
    }
  }

}
