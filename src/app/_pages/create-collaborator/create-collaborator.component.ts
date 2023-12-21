import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Breadcrumb } from 'src/app/_interfaces/breadcrumb';
import { Collaborator } from 'src/app/_models/collaborator';
import { CollaboratorService } from 'src/app/_services/collaborator.service';
import { ToastService } from 'src/app/_services/toast.service';
import { ConfirmAlertService } from '../../_services/confirm-alert.service';
import { Observable, Observer, of } from 'rxjs';

@Component({
  selector: 'app-create-collaborator',
  templateUrl: './create-collaborator.component.html',
  styleUrls: ['./create-collaborator.component.scss']
})
export class CreateCollaboratorComponent implements OnInit {

  breadcrumbPages: Breadcrumb[];

  activeForm: string;
  completedSteps: string[];

  collaborator: Collaborator;

  @ViewChild('appPersonal') appPersonal: any;
  @ViewChild('appRemuneration') appRemuneration: any;

  constructor(
    private collaboratorService: CollaboratorService, 
    private router: Router,
    private ts: ToastService,
    private confirmAlertService: ConfirmAlertService,
    ) {
  }

  ngOnInit(): void {
    this.initBreadcrumb();
    this.showPersonalForm();
    this.initCollaborator();
  }

  initCollaborator() {
    this.collaborator = new Collaborator();
    this.collaborator.dependents = [];
    this.collaborator.documents = [];
    this.collaborator.terms = [];
    // this.collaborator.benefits = [];
    this.collaborator.payments = [];
    this.collaborator.maritalStatus = '';
  }

  initBreadcrumb() {
    this.breadcrumbPages = [
      { label: 'Início', route: '/home' },
      { label: 'Novo Colaborador', route: '/create-collaborator', active: true }
    ];
  }

  showPersonalForm() {
    this.activeForm = 'personal';
  }

  showAdministrativeForm() {
    this.activeForm = 'administrative';
  }

  showRemunerationForm() {
    this.activeForm = 'remuneration';
  }

  showBenefitsForm() {
    this.activeForm = 'benefits';
  }

  showDocsForm() {
    this.activeForm = 'docs';
  }

  next() {
    if (this.activeForm === 'personal') {
      this.activeForm = 'administrative';

    } else if (this.activeForm === 'administrative') {
      this.activeForm = 'remuneration'

    } else if (this.activeForm === 'remuneration') {
      this.activeForm = 'benefits'

    } else if (this.activeForm === 'benefits') {
      this.activeForm = 'docs';
      
    } else if (this.activeForm === 'docs') {

    }
  }

  back() {
    if (this.activeForm === 'personal') {
      this.activeForm = 'personal';

    } else if (this.activeForm === 'administrative') {
      this.activeForm = 'personal'

    } else if (this.activeForm === 'remuneration') {
      this.activeForm = 'administrative'

    } else if (this.activeForm === 'benefits') {
      this.activeForm = 'remuneration';
      
    } else if (this.activeForm === 'docs') {
      this.activeForm = 'benefits';
    }
  }

  confirmCancel(){
    this.confirmAlertService
      .initAlert('Você irá perder todo o progresso feito.')
      .subscribe((event) => {
        if (event) {
          this.confirmAlertService.reset();
          this.router.navigate(['/collaborators']);
        }
      });
  }

  createCollaborator () {

    // Validation
    const invalid = [];
    const personalControls = this.appPersonal.personalForm.controls;
    for (const name in personalControls) {
        if (personalControls[name].invalid) {
            invalid.push(personalControls[name].getAttribute("placeholder"));
        }
    }
    if(invalid && invalid.length > 0){
      this.ts.error('Campos Não Preenchidos',invalid.toString());
      return;
    }

    this.collaborator.documents.push(...this.collaborator.terms);
    this.collaboratorService.createCollaborator(this.collaborator).subscribe((res: any) => {
      this.initCollaborator();
      this.router.navigate(['/home']);
      this.ts.success('Ação concluída!', 'Colaborador cadastrado com sucesso! :D');
    },
    (err) => {
      this.ts.error('Ops!', 'Houve algum erro na sua solicitação!');
      if(err == 'Bad Request'){
        this.ts.error('','Colaborador já cadastrado! Por favor, verifique na lista de colaboradores cadastrados.');
      }
    });
  }

  saveDraftCollaborator() {
    this.ts.info('Ops!', 'Essa funcionalidade ainda tá sendo implementada! :D');
    console.table(this.collaborator);
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
