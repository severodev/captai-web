import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/_services/auth.service';
import { FirstAccessService } from 'src/app/_services/first-access.service';
import { UserService } from 'src/app/_services/user.service';
import { NotificationModalComponent } from '../notification-modal/notification-modal.component';
import { ToastService } from 'src/app/_services/toast.service';
import { createPasswordStrengthValidator, emailValidator } from 'src/app/_helpers/utils';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrl: './password-recovery.component.scss'
})
export class PasswordRecoveryComponent {

  public recoveryRequest: FormGroup;
  public recovery: FormGroup;

  public hasToken: boolean = false;

  public passwordConfirmationFieldVisible = false;
  public passwordFieldVisible = false;
  
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService,
    private modalService: BsModalService,
    private toastService: ToastService,
    private firstAccessService: FirstAccessService) {
      
      this.recoveryRequest = this.formBuilder.group({
        login: ['', [Validators.required, emailValidator()]]
      });

      this.recovery = this.formBuilder.group({
        token: [null, Validators.required],
        password: ['', [Validators.required, createPasswordStrengthValidator()]],
        confirmPassword: ['', Validators.required]
      });

      if (this.authService.accessTokenValue) {
        this.router.navigate(['/']);
      }
    }
   ngOnInit(): void {
    const token = this.activatedRoute.snapshot.params['token'];
    if (token) {
      this.recovery.get('token').setValue(token);
      this.hasToken = true;
    } else {
      this.hasToken = false;
    }
   }

   requestRecover() {
    if (this.recoveryRequest.get('login').valid) {
      this.userService.requestChangePassword(this.recoveryRequest.get('login').value).subscribe(() => {
        const initialState : any = {
          title: 'Alteração de senha solicitada',
          message: `Instruções de recuperação de senha foram enviados para o e-mail: ${this.recoveryRequest.get('login').value}`
        };
        let modalRef = this.modalService.show(NotificationModalComponent, {
          class: 'modal-dialog modal-dialog-centered',
          ignoreBackdropClick: true,
          initialState
        });
        modalRef.content.onSubmit.subscribe(() => {
          this.router.navigate(['/login']);
          modalRef.hide();
        })
      }, (err) => {
        this.toastService.error('Erro', err);
      });
    } else {
      this.toastService.error('Erro', 'Formulario está invalido. Por favor corrija e tente novamente.');
    }
  }

  recoverPassword() {
    if (this.recovery.get('password').value === this.recovery.get('confirmPassword').value && this.recovery.valid) {
      this.firstAccessService.createPassword({
        token: this.recovery.get('token').value,
        password: this.recovery.get('password').value
      }).subscribe(() => {
        const initialState : any = {
          title: 'Sucesso',
          message: 'Agora você pode usar sua nova senha para fazer login.'
        };
        let modalRef = this.modalService.show(NotificationModalComponent, {
          class: 'modal-dialog modal-dialog-centered',
          ignoreBackdropClick: true,
          initialState
        });
        modalRef.content.onSubmit.subscribe(() => {
          this.router.navigate(['/login']);
          modalRef.hide();
        })
        this.router.navigate(['/login']);
      }, (err) => {
        this.toastService.error('Erro', err);
      });
    } else {
      this.toastService.error('Erro', 'Forumulario inválido, por favor corrija e tente novamente.',1212121);
    }
  }

  toglePasswordField() {
    this.passwordFieldVisible = !this.passwordFieldVisible;
  }

  toglePasswordConfirmField() {
    this.passwordConfirmationFieldVisible = !this.passwordConfirmationFieldVisible;
  }
}
