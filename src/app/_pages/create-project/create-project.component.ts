import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Breadcrumb } from 'src/app/_interfaces/breadcrumb';
import { Project } from 'src/app/_models/project';
import { ProjectService } from 'src/app/_services/project.service';
import { ToastService } from 'src/app/_services/toast.service';
import { CustomValidator } from 'src/app/_helpers/custom-validator';

import { SpaceValidatorService } from 'src/app/_services/space-validator.service';

import { formatDate } from 'src/app/_helpers/utils'
import { ConfirmAlertService } from 'src/app/_services/confirm-alert.service';
import { Observable, Observer, of } from 'rxjs';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {

  breadcrumbPages: Breadcrumb[];

  activeForm: string;
  completedSteps: string[];

  project: Project;

  customValidator: CustomValidator;

  @ViewChild('appInformations') appInformations: any;

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private ts: ToastService,
    private confirmAlertService: ConfirmAlertService,
    private spaceValidatorService : SpaceValidatorService) { }

  ngOnInit(): void {
    this.initBreadcrumb();
    this.showInfoForm();
    this.customValidator = new CustomValidator();
    this.initProject();
  }

  canDeactivate(): Observable<boolean> {
    if (this.appInformations.informationForm.form.dirty) {
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
  } else {
      return of(true);
    }
  }

  initBreadcrumb() {
    this.breadcrumbPages = [
      { label: 'Início', route: '/home' },
      { label: 'Novo Projeto', route: '/create-projects', active: true }
    ];
  }

  initProject() {
    if (this.hasDraftProject()) {
      this.loadDraftProject();
    } else {
      this.project = new Project();
      this.project.bankId = '';
      this.project.instituteId = '';
      this.project.paymentOrder = '';
      this.project.projectManager = '';
      this.project.projectCoordinator = '';
      this.project.projectMembers = [];
      this.project.documents = [];
      this.project.documentFiles = [];
    }
  }

  showInfoForm() {
    this.activeForm = 'informations';
  }

  // showTeamForm() {
  //   this.activeForm = 'team';
  // }

  showDocsForm() {
    this.activeForm = 'docs';
  }

  next() {
    if (this.activeForm === 'informations') {
      this.activeForm = 'docs';

    } else if (this.activeForm === 'docs') { }
  }

  back() {
    if (this.activeForm === 'informations') {
      this.activeForm = 'informations';

    } else if (this.activeForm === 'docs') {
      this.activeForm = 'informations'

    }
  }

  cancel() {
    this.confirmAlertService
      .initAlert('Você irá perder todo o progresso feito.')
      .subscribe((event) => {
        if (event) {
          this.confirmAlertService.reset();
          this.router.navigate(['/home']);
          this.projectService.clearDraftProject();
        }
      })
  }

  createProject() {

    if(this.spaceValidatorService.noWhitespaceValidator(this.project.name, this.project.amendmentTerm)){
      this.ts.error('Existem campos vazios ou com apenas espaços.', 'Houve uma falha ao adicionar o projeto.')
    } else if(Date.parse(formatDate(this.project?.start)) > Date.parse(formatDate(this.project?.end))){
      this.ts.error('Ops!', 'Datas estão inconsistentes!');
    }else {
      this.projectService.createProject(this.project).subscribe((res: any) => {
        this.ts.success('Ação concluída!', 'Projeto cadastrado com sucesso! :D');
        this.projectService.clearDraftProject();
        this.initProject();
        this.router.navigate(['/home']);
      }, (err) => {
        this.ts.error('Ops!', 'Houve algum erro na sua solicitação!');
      });
    }
  }

  hasDraftProject(): boolean {
    return this.projectService.hasDraftProject();
  }

  saveAsDraft() {
    this.projectService.saveProjectLocal(this.project);
    this.ts.success('','Rascunho salvo com sucesso')
  }

  loadDraftProject() {
    this.project = this.projectService.getDraftProject();
  }

}
