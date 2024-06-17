import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Observer, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from 'src/app/_models/user';
import { emailEqualityValidator } from "src/app/_pages/users/equality.validator";
import { ConfirmAlertService } from 'src/app/_services/confirm-alert.service';
import { ToastService } from 'src/app/_services/toast.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-create-user-form',
  templateUrl: './create-user-form.component.html',
  styleUrls: ['./create-user-form.component.scss']
})
export class CreateUserFormComponent implements OnInit {

  roles$: any
  collaborator$: any

  createUserForm;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private ts: ToastService,
    private router: Router,
    private confirmAlertService: ConfirmAlertService) {
      this.createUserForm = this.fb.group({
        fullname: ['', Validators.required],
        username: ['', Validators.required],
        role: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        emailConfirmation: ['', [Validators.required, Validators.email]]
      }, {
        validators: [emailEqualityValidator()],
      });
    }

  ngOnInit(): void {
    this.getRoles()
  }

  getRoles() {
    this.roles$ = this.userService.getRoles()
  }

  createUser() {
    let user: User = {
    /*   username: this.createUserForm.controls['username'].value,
      fullname: this.createUserForm.controls['fullname'].value,
      email: this.createUserForm.controls['email'].value,
      role: this.createUserForm.controls['role'].value,
      collaborator: this.collaborator$ ? this.collaborator$.id : null, */
    }

    this.userService.createUser(user).pipe(
      catchError(err => {
        console.error(err);
        this.ts.error('Ops!', 'Houve algum erro na sua solicitação!')
        return throwError(err)
      })
    ).subscribe(
      data => {
        if (data) {
        this.ts.success('Ação concluída!', 'Usuário cadastrado com sucesso! :D')
        this.router.navigate(['/users'])
      }
  })
  }

  canDeactivate(): Observable<boolean> {
    return new Observable((observer: Observer<boolean>) => {
      this.confirmAlertService.initAlert('Você irá perder todo o progresso feito.')
      .subscribe(
        (event) => {
          if (event) {
            this.confirmAlertService.reset();
            return of(observer.next(true));
          }
        }
      );
    });
  }
}
