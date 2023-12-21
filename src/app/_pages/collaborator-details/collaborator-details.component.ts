import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Breadcrumb } from 'src/app/_interfaces/breadcrumb';
import { Collaborator } from 'src/app/_models/collaborator';

import { ToastService } from 'src/app/_services/toast.service';
import { CollaboratorService } from 'src/app/_services/collaborator.service';
import { ConfirmAlertService } from 'src/app/_services/confirm-alert.service';
import { Observable, Observer, of } from 'rxjs';

@Component({
  selector: 'app-collaborator-details',
  templateUrl: './collaborator-details.component.html',
  styleUrls: ['./collaborator-details.component.scss']
})
export class CollaboratorDetailsComponent implements OnInit {

  collaboratorId: number;
  collaborator: Collaborator;
  breadcrumbPages: Breadcrumb[];

  addProjectMode = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private collaboratorService: CollaboratorService,
    private ts: ToastService,
    private confirmAlertService: ConfirmAlertService
  ) { }

  ngOnInit(): void {
    this.collaboratorId = Number(this.route.snapshot.paramMap.get('collaboratorId'));
    this.loadCollaborator();
    this.initBreadcrumb();

    this.addProjectMode = Boolean(this.route.snapshot.paramMap.get('addMode'));
  }

  paymentsEvent(e: any){
    this.loadCollaborator();
  }

  initBreadcrumb() {
    if (this.collaborator) {
      this.breadcrumbPages = [
        { label: 'Início', route: '/home' },
        { label: 'Colaboradores', route: '/collaborators' },
        { label: this.collaborator.name, route: '/collaborator-details', active: true }
      ];
    } else {
      this.breadcrumbPages = [
        { label: 'Início', route: '/home' },
        { label: 'Colaboradores', route: '/collaborators' }
      ];
    }
  }

  loadCollaborator() {
    this.collaborator = new Collaborator();
    this.collaboratorService.getCollaborator(this.collaboratorId).subscribe((data: Collaborator) => {
      this.collaborator = data;  
      if(this.collaborator.active == true){
        this.collaborator.payments = this.collaborator.payments?.filter((payment) => {
          return payment.active == true
        })  
      }  
      this.initBreadcrumb();
    });

    
  }

  confirmDelete() {
    this.confirmAlertService.initAlert("Isso implica no fim do contrato desse colaborador.").subscribe(event => {
      if(event) {
        this.delete();
        this.confirmAlertService.reset();
      }
    });
  }

  delete() {
    this.collaboratorService.deleteCollaborator(this.collaboratorId).subscribe(data => {
      this.ts.success('Ação concluída!', 'Colaborador removido com sucesso.');
      this.router.navigate(['/collaborators']);
    });
  }

  download() {
    this.ts.info('Ops!', 'Funcionalidade ainda não implementada.');
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
