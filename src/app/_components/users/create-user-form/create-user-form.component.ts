import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ToastService } from 'src/app/_services/toast.service';
import { UserService } from 'src/app/_services/user.service';
import { emailEqualityValidator } from "src/app/_pages/users/equality.validator";
import { CollaboratorService } from 'src/app/_services/collaborator.service';
import { User } from 'src/app/_models/user';
import { Router } from '@angular/router';
import { Observable, Observer, of } from 'rxjs';
import { ConfirmAlertService } from 'src/app/_services/confirm-alert.service';

@Component({
  selector: 'app-create-user-form',
  templateUrl: './create-user-form.component.html',
  styleUrls: ['./create-user-form.component.scss']
})
export class CreateUserFormComponent implements OnInit {

  roles$: any
  collaborator$: any

  createUserForm = this.fb.group({
    fullname: ['', Validators.required],
    username: ['', Validators.required],
    role: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    emailConfirmation: ['', [Validators.required, Validators.email]]
  }, {
    validators: [emailEqualityValidator()],
  })

  constructor(
    private userService: UserService,
    private collaboratorService: CollaboratorService,
    private fb: FormBuilder,
    private ts: ToastService,
    private router: Router,
    private confirmAlertService: ConfirmAlertService) { }

  ngOnInit(): void {
    this.getRoles()
  }

  getRoles() {
    this.roles$ = this.userService.getRoles()
  }

  checkCollaborator(name: string) {
    this.collaboratorService.getCollaboratorByName(name).subscribe(
      data => {
        data ? this.collaborator$ = data : this.collaborator$ = null
      })
  }


  createUser() {
    let user: User = {
      username: this.createUserForm.controls['username'].value,
      fullname: this.createUserForm.controls['fullname'].value,
      email: this.createUserForm.controls['email'].value,
      role: this.createUserForm.controls['role'].value,
      collaborator: this.collaborator$ ? this.collaborator$.id : null,
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
