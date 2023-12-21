import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FirstAccessService } from 'src/app/_services/first-access.service';
import { ToastService } from 'src/app/_services/toast.service';

@Component({
  selector: 'app-first-access',
  templateUrl: './first-access.component.html',
  styleUrls: ['./first-access.component.scss']
})
export class FirstAccessComponent implements OnInit {
  form: FormGroup;

  isInvalidForm: boolean = false;
  isInvalidPassword: boolean = false;
  isError: boolean = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly ts: ToastService,
    private readonly firstAccessService: FirstAccessService,
  ) {
    this.form = this.formBuilder.group({
      token: [{ value: null, disabled: true }, Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
      confPassword: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit(): void {
    this.getToken();
  }

  getToken() {
    const token = this.activatedRoute.snapshot.params['token'];

    if (token) {
      this.form.get('token').setValue(token);
    } else {
      this.router.navigate(['/login']);
    }
  }

  createPassword() {
    if (this.validForm()) {
      const data = {
        token: this.form.get('token')?.value,
        password: this.form.get('password')?.value,
      }

      this.firstAccessService.createPassword(data).subscribe(
        (data: any) => {
          this.ts.success('Ação concluída!', 'Senha criada com sucesso!');
          this.router.navigate(['/login']);
        },
        (err: any) => {
          this.isError = true;
        }
      );
    }
  }

  validForm() {
    this.isError = false;
    this.isInvalidForm = false;
    this.isInvalidPassword = false;

    if (this.form.valid) {
      const password = this.form.get("password")?.value;
      const confPassword = this.form.get("confPassword")?.value;

      if (password != confPassword) {
        this.isInvalidPassword = true;
        return false
      }

      return true;
    } else {
     this.isInvalidForm = true;
    }

    return false;
  }
}
