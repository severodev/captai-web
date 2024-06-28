import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NotificationModalComponent } from 'src/app/_components/notification-modal/notification-modal.component';
import { PaymentResultModalComponent } from 'src/app/_components/payment-result-modal/payment-result-modal.component';
import { TermsOfUseModalComponent } from 'src/app/_components/terms-of-use-modal/terms-of-use-modal.component';
import { createPasswordStrengthValidator, emailValidator } from 'src/app/_helpers/utils';
import { SubscriptionPlan } from 'src/app/_interfaces/subscription-plan';
import { ActiviteService } from 'src/app/_services/activite.service';
import { LocationService } from 'src/app/_services/location.service';
import { SegmentService } from 'src/app/_services/segment.service';
import { ToastService } from 'src/app/_services/toast.service';
import { UserService } from 'src/app/_services/user.service';
import { CpfCnpjAvailabilityValidator } from './validators/CpfCnpjAvailabilityValidator';
import { EmailAvailabilityValidator } from './validators/EmailAvailabilityValidator';
import { InstitutionService} from './../../_services/institution.service';

import { loadMercadoPago } from "@mercadopago/sdk-js";
import { environment } from 'src/environments/environment';
import { Institution } from 'src/app/_models/institution';

enum RegistrationSteps {
  STEP_USER_DATA,
  STEP_SERVICE_DATA,
  STEP_PLAN_SELECTION,
  STEP_PAYMENT,
  STEP_FINISH
}

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  private formRegistrationStep = RegistrationSteps.STEP_USER_DATA;

  public userForm: FormGroup;
  public serviceForm: FormGroup;

  private userDto: any;

  @ViewChild("area-pagamento") areaPagamentoDiv: ElementRef;

  public availablePlans: SubscriptionPlan[];
  public selectedPlan: SubscriptionPlan;
  public showPaymentArea = false;

  private paymentBrickController: any;

  public passwordFieldVisible = false;
  public passwordConfirmationFieldVisible = false;
  public cpfInput = true;
  public showErrors = false;

  public segments: Array<{ id, name }>;
  public states: Array<{ id, abbreviation, name }> = [];
  public abrangencyStates: Array<{ id, abbreviation, name }> = [];
  public activities: Array<{ id, name }>;
  public institutions: Institution[];

  private allStatesItem = { id: 0, abbreviation: null, name: 'Todos' };

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    public bsModalRef: BsModalRef,
    private modalService: BsModalService,
    private router: Router,
    private toastService: ToastService,
    private segmentService: SegmentService,
    private activiteService: ActiviteService,
    private locationService: LocationService,
    private institutionsService: InstitutionService,
    private window: Window,
  ) {
    this.initForms();
    this.initSubscriptionPlans();
    this.initMercadoPago();
  }

  initForms() {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [null, [Validators.required, emailValidator()], [EmailAvailabilityValidator.checkEmail(this.userService)]],
      emailConfirmation: ['', [Validators.required, emailValidator()]],
      cpf_cnpj: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(14)], [CpfCnpjAvailabilityValidator.checkCpfCnpj(this.userService)]],
      password: ['', [Validators.required, createPasswordStrengthValidator()]],
      passwordConfirm: ['', Validators.required],
      state: [null, Validators.required],
      background: [null, Validators.required],
    });

    this.serviceForm = this.formBuilder.group({
      segment: [null, Validators.required],
      activities: [null, Validators.required],
      abrangency: [null, Validators.required],
      targetValue: [null, Validators.required],
      institutions: [null],
      acceptedTermsOfUse: [false, Validators.required],
      acceptedPrivacyPolicy: [false, Validators.required],
    });
  }

  initSubscriptionPlans() {
    this.availablePlans = [
      {
        id: 1,
        nome: "Plano Pessoa Física",
        descricao: "O melhor para o profissional e sua equipe.",
        valor: 49.9,
        diasGratis: 1,
        itensCobertos: ["Pesquisar"],
        itensNaoCobertos: ["Captar (EM BREVE)", "Categorizar (EM BREVE)", "Priorizar (EM BREVE)", "Gerenciar tarefas (EM BREVE)", "Dashboard pessoal (EM BREVE)"],
        ativo: true
      },
      // {
      //   id: 2,
      //   nome: "Plano Pessoa Jurídica",
      //   descricao: "O melhor para o profissional e sua equipe.",
      //   valor: 59.90,
      //   diasGratis: 1,
      //   itensCobertos: ["Pesquisar"],
      //   itensNaoCobertos: ["Captar (EM BREVE)", "Categorizar (EM BREVE)", "Priorizar (EM BREVE)", "Gerenciar tarefas (EM BREVE)", "Dashboard pessoal (EM BREVE)"],
      //   ativo: false
      // }
    ];
  }

  async initMercadoPago(): Promise<void> {
    await loadMercadoPago();
    const mp = new (this.window as any).MercadoPago(environment.mercadoPagoKey, {
      locale: "pt-BR",
    });
  }

  ngOnInit(): void {
    this.segmentService.getAll({}, { itemsPerPage: 9999 }).subscribe((segments) => {
      this.segments = segments;
    });
    this.activiteService.getAll({}, { itemsPerPage: 9999 }).subscribe((activity) => {
      this.activities = activity;
    });
    this.locationService.getAll({}, { itemsPerPage: 9999 }).subscribe((states) => {
      this.states = [];
      this.states.push(...states);

      this.abrangencyStates = [];
      this.abrangencyStates.push(this.allStatesItem);
      this.abrangencyStates.push(...states);
    });
    this.institutionsService.getInstitutionsDropdown().subscribe((institution) => {
      this.institutions = institution;
    });
  }

  toglePasswordField() {
    this.passwordFieldVisible = !this.passwordFieldVisible;
  }

  toglePasswordConfirmField() {
    this.passwordConfirmationFieldVisible = !this.passwordConfirmationFieldVisible;
  }

  showTermsOffUse() {
    const initialState: any = {
      termsText: 'TERMOS DE USO Nossas políticas de uso visam estabelecer diretrizes claras para a utilização de nossos serviços, garantindo uma experiência segura, ética e satisfatória para todos os usuários.Nossas políticas de uso visam estabelecer diretrizes claras para a utilização de nossos serviços, garantindo uma experiência segura, ética e satisfatória para todos os usuários.Nossas políticas de uso visam estabelecer diretrizes claras para a utilização de nossos serviços, garantindo uma experiência segura, ética e satisfatória para todos os usuários.Nossas políticas de uso visam estabelecer diretrizes claras para a utilização de nossos serviços, garantindo uma experiência segura, ética e satisfatória para todos os usuários.Nossas políticas de uso visam estabelecer diretrizes claras para a utilização de nossos serviços, garantindo uma experiência segura, ética e satisfatória para todos os usuários.Nossas políticas de uso visam estabelecer diretrizes claras para a utilização de nossos serviços, garantindo uma experiência segura, ética e satisfatória para todos os usuários.Nossas políticas de uso visam estabelecer diretrizes claras para a utilização de nossos serviços, garantindo uma experiência segura, ética e satisfatória para todos os usuários.'
    };
    let modalRef = this.modalService.show(TermsOfUseModalComponent, {
      initialState,
      class: 'modal-dialog modal-dialog-centered modal-lg'
    });
    modalRef.content.close.subscribe(() => {
      modalRef.hide();
    });
  }

  showPrivacyPolice() {
    const initialState: any = {
      termsText: 'POLITICAS DE PRIVACIDADE Coletamos informações pessoais dos usuários apenas quando fornecidas voluntariamente durante o registro ou utilização de nossos serviços. Essas informações podem incluir, mas não se limitam a, nome, endereço de e-mail, informações de contato e dados de pagamento.Coletamos informações pessoais dos usuários apenas quando fornecidas voluntariamente durante o registro ou utilização de nossos serviços. Essas informações podem incluir, mas não se limitam a, nome, endereço de e-mail, informações de contato e dados de pagamento.Coletamos informações pessoais dos usuários apenas quando fornecidas voluntariamente durante o registro ou utilização de nossos serviços. Essas informações podem incluir, mas não se limitam a, nome, endereço de e-mail, informações de contato e dados de pagamento.Coletamos informações pessoais dos usuários apenas quando fornecidas voluntariamente durante o registro ou utilização de nossos serviços. Essas informações podem incluir, mas não se limitam a, nome, endereço de e-mail, informações de contato e dados de pagamento.'
    };
    let modalRef = this.modalService.show(TermsOfUseModalComponent, {
      initialState,
      class: 'modal-dialog modal-dialog-centered modal-lg'
    });
    modalRef.content.close.subscribe(() => {
      modalRef.hide();
    });
  }

  togleCpfCnpj(value: boolean) {
    this.userForm.controls['cpf_cnpj'].reset(),
      this.cpfInput = value;
  }

  async saveUserData() {

    if (this.userForm.invalid) {
      this.showErrors = true;
    } else {
      if (this.userForm.get('emailConfirmation').value == this.userForm.get('email').value &&
        this.userForm.get('passwordConfirm').value == this.userForm.get('password').value &&
        this.userForm.valid) {
        this.userDto = {
          // Parte Um
          role: 2,
          name: this.userForm.controls['name'].value,
          lastName: this.userForm.controls['lastName'].value,
          email: this.userForm.controls['email'].value,
          cpfCnpj: this.userForm.controls['cpf_cnpj'].value,
          password: this.userForm.controls['password'].value,
          state: this.userForm.controls['state'].value.id,
          background: this.userForm.controls['background'].value,
        }

        this.goToServiceData();

      } else {
        console.log('error')
        this.toastService.error('Erro', 'O formulario precisa está válido para prosseguir com esse cadastro!');
      }
    }
  }

  async saveServiceData() {

    console.log(this.serviceForm.controls['targetValue'].value);

    if (this.serviceForm.invalid || !this.serviceForm.get('acceptedTermsOfUse').value || !this.serviceForm.get('acceptedPrivacyPolicy').value) {
      this.showErrors = true;
    } else {
      if (this.serviceForm.valid) {

        this.userDto.segment = this.serviceForm.controls['segment'].value.id;
        this.userDto.activite = this.serviceForm.controls['activities'].value.map((item) => item.id);
        this.userDto.abrangency = this.serviceForm.controls['abrangency'].value.map((item) => item.id);
        this.userDto.targetValue = this.serviceForm.controls['targetValue'].value;
        this.userDto.institutions = this.serviceForm.controls['institutions'].value.map((item) => item.id);

        this.userDto.acceptedTermsOfUse = this.serviceForm.controls['acceptedTermsOfUse'].value;
        this.userDto.acceptedPrivacyPolicy = this.serviceForm.controls['acceptedPrivacyPolicy'].value;

        this.goToPlanSelection();

      } else {
        console.log('error')
        this.toastService.error('Erro', 'O formulario precisa está válido para prosseguir com esse cadastro!');
      }
    }
  }

  public goToUserData(): void {
    this.formRegistrationStep = RegistrationSteps.STEP_USER_DATA;
  }

  public isUserDataStep() {
    return this.registrationStep === RegistrationSteps.STEP_USER_DATA;
  }

  public goToServiceData(): void {
    this.formRegistrationStep = RegistrationSteps.STEP_SERVICE_DATA;
  }

  public isServiceDataStep() {
    return this.registrationStep === RegistrationSteps.STEP_SERVICE_DATA;
  }

  public goToPlanSelection(): void {
    this.formRegistrationStep = RegistrationSteps.STEP_PLAN_SELECTION;
  }

  public isSelectionPlanStep() {
    return this.registrationStep === RegistrationSteps.STEP_PLAN_SELECTION;
  }

  public goToPayment(planoSelecionado: SubscriptionPlan): void {
    setTimeout(() => {
      this.selectedPlan = planoSelecionado;
      if (this.showPaymentArea) {
        const valorAtualizado = planoSelecionado.valor;
        this.paymentBrickController.update({ valorAtualizado });
        this.focarAreaPagamento();
      } else {
        this.showPaymentArea = true;
        this.inicializarMercadoPago();
      }
    }, 500);
  }

  public isPaymentStep() {
    return this.registrationStep === RegistrationSteps.STEP_PAYMENT;
  }

  public goToFinish(): void {
    this.formRegistrationStep = RegistrationSteps.STEP_FINISH;
  }

  get registrationStep() {
    return this.formRegistrationStep;
  }

  async inicializarMercadoPago() {

    const mp = new (window as any).MercadoPago(`${environment.mercadoPagoKey}`, {
      locale: "pt-BR",
    });
    const bricksBuilder = mp.bricks();

    const cardPaymentBrick = async (bricksBuilder) => {

      const settings = {
        initialization: {
          amount: this.selectedPlan.valor, //value of the payment to be processed
        },
        customization: {
          visual: {
            style: {
              customVariables: {
                theme: 'default',
                baseColor: "#308c47"
              },
            },
            texts: {
              formSubmit: "Finalizar"
            }
          },
          paymentMethods: {
            creditCard: "all",
            maxInstallments: 6,
          },
        },
        callbacks: {
          onSubmit: (cardFormData) => {
            return new Promise((resolve, reject) => {
              fetch(`${environment.apiUrl}/mp/subscription/register/${this.selectedPlan.id}`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(cardFormData),
              })
                .then((response) => response.json())
                .then((response) => {
                  console.log('Pagamento processado .. avaliando resultado');
                  console.log(response);
                  if (response.id && response.id != '' && response.status == 'authorized') {
                    this.userDto.subscriptionId = response.id;
                    this.userService.createUser(this.userDto).subscribe(
                      {
                        complete: () => {
                          this.modalSucessoPagamento();
                        },
                        error: (err) => {
                          console.error(err);
                          this.modalFalhaPagamento();
                        }
                      }
                    );
                    return;
                  } else {
                    console.error('Retorno da criação de assinatura: ERRO');
                    this.modalFalhaPagamento();
                  }
                })
                .catch((error) => {
                  console.error('Pagamento não processado ..');
                  this.modalFalhaPagamento();
                });
            });
          },
          onReady: () => {
            this.focarAreaPagamento();
          },
          onError: (error) => {
            console.log('Erro ao montar formulário');
            console.error(error);
          }
        }
      }

      this.paymentBrickController = await bricksBuilder.create(
        "cardPayment",
        "area-pagamento",
        settings
      );

      (this.window as any).paymentBrickController = this.paymentBrickController;

    };

    cardPaymentBrick(bricksBuilder);
  }

  modalSucessoPagamento() {
    this.showPaymentArea = false;
    const initialState: any = {
      icon: 'success-payment-modal-icon.svg',
      title: 'Sua conta foi criada!',
      message: `Estamos empolgados em tê-lo(a) conosco.\n
      Para garantir a segurança da sua conta e proprcionar a melhor\n
      experiência possível, é necessário validar suas informações no\n
      e-mail cadastrado.`,
      buttonLabel: 'Entendi'
    };

    let modalRef = this.modalService.show(PaymentResultModalComponent, {
      initialState,
      class: 'modal-dialog modal-dialog-centered modal-lg'
    });
    modalRef.content.close.subscribe(() => {
      modalRef.hide();
      this.router.navigate(['/login']);
    });

  }

  modalFalhaPagamento() {
    let buttons = document.getElementsByClassName('loading-35pL-7');
    [].forEach.call(buttons, function (el) {
      el.classList.remove("loading-35pL-7");
    });

    const initialState: any = {
      icon: '381599_error_icon.svg',
      title: 'Ocorreu um erro durante o pagamento',
      message: `Por favor, verifique seus dados no formulário de pagamento.`,
      buttonLabel: 'Vou verificar'
    };

    let modalRef = this.modalService.show(PaymentResultModalComponent, {
      initialState,
      class: 'modal-dialog modal-dialog-centered modal-lg'
    });
    modalRef.content.close.subscribe(() => {
      modalRef.hide();
    });

  }

  focarAreaPagamento() {
    setTimeout(() => {
      document.getElementById("marcador-final-pagamento").scrollIntoView();
    }, 300);
  }

  abrangencyChange() {
    if(this.serviceForm.controls['abrangency'].value){
      const items = [...this.serviceForm.controls['abrangency'].value];
      if(items.includes(this.allStatesItem)){
        this.serviceForm.controls['abrangency'].setValue([this.allStatesItem]);
      }
    }
  }

}