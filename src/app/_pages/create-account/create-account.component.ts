import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NotificationModalComponent } from 'src/app/_components/notification-modal/notification-modal.component';
import { TermsOfUseModalComponent } from 'src/app/_components/terms-of-use-modal/terms-of-use-modal.component';
import { createPasswordStrengthValidator, emailValidator } from 'src/app/_helpers/utils';
import { ToastService } from 'src/app/_services/toast.service';
import { UserService } from 'src/app/_services/user.service';


@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  public userForm: FormGroup;
  public passwordFieldVisible = false;
  public passwordConfirmationFieldVisible = false;
  public cpfInput = true;
  public showErrors = false;
  
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    public bsModalRef: BsModalRef,
    private modalService: BsModalService,
    private router: Router,
    private toastService: ToastService
  ) {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [null, [Validators.required, emailValidator()]],
      emailConfirmation: ['', [Validators.required, emailValidator()]],
      cpf_cnpj: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      password: ['', [Validators.required, createPasswordStrengthValidator()]],
      passwordConfirm: ['', Validators.required],
      acceptedTermsOfUse: [false, Validators.required],
      acceptedPrivacyPolicy: [false,  Validators.required],
      segment: [null],
      activities: [null],
      abrangency: [null],
    });
   }

  ngOnInit(): void {}

  toglePasswordField() {
    this.passwordFieldVisible = !this.passwordFieldVisible;
  }

  toglePasswordConfirmField() {
    this.passwordConfirmationFieldVisible = !this.passwordConfirmationFieldVisible;
  }

  showTermsOffUse() {
   const initialState : any = {
      termsText: 'TERMOS DE USO Nossas políticas de uso visam estabelecer diretrizes claras para a utilização de nossos serviços, garantindo uma experiência segura, ética e satisfatória para todos os usuários.Nossas políticas de uso visam estabelecer diretrizes claras para a utilização de nossos serviços, garantindo uma experiência segura, ética e satisfatória para todos os usuários.Nossas políticas de uso visam estabelecer diretrizes claras para a utilização de nossos serviços, garantindo uma experiência segura, ética e satisfatória para todos os usuários.Nossas políticas de uso visam estabelecer diretrizes claras para a utilização de nossos serviços, garantindo uma experiência segura, ética e satisfatória para todos os usuários.Nossas políticas de uso visam estabelecer diretrizes claras para a utilização de nossos serviços, garantindo uma experiência segura, ética e satisfatória para todos os usuários.Nossas políticas de uso visam estabelecer diretrizes claras para a utilização de nossos serviços, garantindo uma experiência segura, ética e satisfatória para todos os usuários.Nossas políticas de uso visam estabelecer diretrizes claras para a utilização de nossos serviços, garantindo uma experiência segura, ética e satisfatória para todos os usuários.'
    };
    let modalRef = this.modalService.show(TermsOfUseModalComponent, {
      initialState,
      class: 'modal-d0ialog modal-dialog-centered modal-lg'
    });
    modalRef.content.close.subscribe(() => {
      modalRef.hide();
    });
  }

  showPrivacyPolice() {
    const initialState : any = {
      termsText: 'POLITICAS DE PRIVACIDADE Coletamos informações pessoais dos usuários apenas quando fornecidas voluntariamente durante o registro ou utilização de nossos serviços. Essas informações podem incluir, mas não se limitam a, nome, endereço de e-mail, informações de contato e dados de pagamento.Coletamos informações pessoais dos usuários apenas quando fornecidas voluntariamente durante o registro ou utilização de nossos serviços. Essas informações podem incluir, mas não se limitam a, nome, endereço de e-mail, informações de contato e dados de pagamento.Coletamos informações pessoais dos usuários apenas quando fornecidas voluntariamente durante o registro ou utilização de nossos serviços. Essas informações podem incluir, mas não se limitam a, nome, endereço de e-mail, informações de contato e dados de pagamento.Coletamos informações pessoais dos usuários apenas quando fornecidas voluntariamente durante o registro ou utilização de nossos serviços. Essas informações podem incluir, mas não se limitam a, nome, endereço de e-mail, informações de contato e dados de pagamento.'
    };
    let modalRef = this.modalService.show(TermsOfUseModalComponent, {
      initialState,
      class: 'modal-d0ialog modal-dialog-centered modal-lg'
    });
    modalRef.content.close.subscribe(() => {
      modalRef.hide();
    });
  }

  togleCpfCnpj(value: boolean) {
    this.userForm.controls['cpf_cnpj'].reset(),
    this.cpfInput = value;
  }

  createUser() {
    if (this.userForm.invalid || !this.userForm.get('acceptedTermsOfUse').value || !this.userForm.get('acceptedPrivacyPolicy').value) {
      this.showErrors = true;
    } else {
      if (this.userForm.get('emailConfirmation').value == this.userForm.get('email').value && 
      this.userForm.get('passwordConfirm').value == this.userForm.get('password').value &&
      this.userForm.valid) {
        let userDTO: any = {
          name: this.userForm.controls['name'].value,
          lastName: this.userForm.controls['lastName'].value,
          email: this.userForm.controls['email'].value,
          cpfCnpj: this.userForm.controls['cpf_cnpj'].value,
          password: this.userForm.controls['password'].value,
          acceptedTermsOfUse: this.userForm.controls['acceptedTermsOfUse'].value,
          acceptedPrivacyPolicy: this.userForm.controls['acceptedPrivacyPolicy'].value,
          profile: 'ADMIN',
          role: 1
        }
        this.userService.createUser(userDTO).subscribe((resp) => {
          console.log(resp)
          const initialState : any = {
            title: 'Sua conta foi criada!',
            message: 'Estamos empolgados por tê-lo(a) conosco. Para garantir a segurança da sua conta e proporcionar a melhor expreriência possível, é nescessário validar suas informações no e-mail cadastrado.'
          };
          let modalRef = this.modalService.show(NotificationModalComponent, {
            class: 'modal-d0ialog modal-dialog-centered',
            ignoreBackdropClick: true,
            initialState
          });
          modalRef.content.onSubmit.subscribe(() => {
            this.router.navigate(['/login']);
            modalRef.hide();
            this.showErrors = false;
            this.userForm.reset();
          })
        }, error => {
          console.log(error)
          this.toastService.error('Ocorreu um erro!', error);
        })
      } else {
        console.log('error')
        this.toastService.error('Erro', 'O formulario precisa está válido para prosseguir com esse cadastro!');
      }
    }
  }
}