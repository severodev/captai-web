import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { emailValidator } from 'src/app/_helpers/utils';
import { EmailAvailabilityValidator } from 'src/app/_pages/create-account/validators/EmailAvailabilityValidator';
import { ToastService } from 'src/app/_services/toast.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-invite-modal',
  templateUrl: './invite-modal.component.html',
  styleUrl: './invite-modal.component.scss'
})
export class InviteModalComponent {

  public guester : any;
  public showErrors: boolean = false;

  @Output() close: EventEmitter<void> = new EventEmitter();
  
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private toastService: ToastService
  ) {
    this.guester = this.fb.group({
      name: [null],
      secondName: [null],
      email: [null, [Validators.required, emailValidator()], [EmailAvailabilityValidator.checkEmail(this.userService)]],
    });
   }

   save() {
    if (this.guester.valid) {
      this.userService.createUserGuester(
        { name: this.guester.controls['name'].value,
          lastName: this.guester.controls['secondName'].value,
          email: this.guester.controls['email'].value,
        }
      ).subscribe({
        complete: () => {
          this.toastService.success('Convite para usar o sistema foi enviado para o E-mail: ' + this.guester.controls['email'].value, '', 6000);
          this.guester.reset();
          this.showErrors = false;
          this.close.next();
        },
        error: (err) => {
          console.log('Não foi possível enviar convite: ', err)
          this.toastService.error('Não foi possível enviar convite para o E-mail: ' + this.guester.controls['email'].value, '', 6000);
        }
      })
    } else {
      this.showErrors = true;
    }
   }
}
