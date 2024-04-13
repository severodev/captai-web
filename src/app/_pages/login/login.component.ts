import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/_services/toast.service';
import { emailValidator } from 'src/app/_helpers/utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {

  public loginForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService) {
    this.loginForm = this.formBuilder.group({
      login: ['', [Validators.required, emailValidator()]],
      password: [null, Validators.required]
    });
    if (this.authService.accessTokenValue) {
      this.router.navigate(['/']);
    }
  }

  login() {
    if (this.loginForm.get('login').valid && this.loginForm.get('password').valid) {
      this.authService.login(
        this.loginForm.get('login').value,
        this.loginForm.get('password').value,
        false
      ).subscribe({
        next: (resp) => {
          if (resp) {
            this.toastService.error('Erro ao fazer login', resp, 6000);
          }
        },
        error: (err) => {
          this.toastService.error('Informações inválidas. ', err == 'Unauthorized' ? 'Verifique os campos e tente novamente.' : err, 6000);
        }
      });
    }
  }
}
