import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from 'src/app/_models/user';
import { ToastService } from 'src/app/_services/toast.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-user-profile-form',
  templateUrl: './user-profile-form.component.html',
  styleUrls: ['./user-profile-form.component.scss']
})
export class UserProfileFormComponent implements OnInit {

  user$; 

  editUserForm: FormGroup;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private ts: ToastService,
    private router: Router) {
      this.user$ = this.userService.currentSelectedUserSubject
    }
    
    ngOnInit(): void {
    this.editUserForm = this.fb.group({
      username: [this.user$.value.username],
      email: [this.user$.value.email, Validators.email],
      language: ['pt_BR']
    }) 
  }

  editUser() {
    this.userService.editUSer(this.user$.value.id, this.editUserForm.value).pipe(
      catchError(err => {
        console.log(err);
        this.ts.error('Ops!', 'Houve algum erro na sua solicitação!')
        return throwError(err)
      }),
    ).subscribe(
      data => {
        if (data) this.ts.success('Ação concluída!', 'Usuário editado com sucesso! :D')
        this.user$.next(JSON.parse(sessionStorage.getItem('user')))
        this.router.navigate(['/users'])
      }
    )
  }
}
