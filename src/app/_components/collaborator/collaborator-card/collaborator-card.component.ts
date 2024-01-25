import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Collaborator } from 'src/app/_models/collaborator';

import { CollaboratorService } from 'src/app/_services/collaborator.service';
import { ConfirmAlertService } from 'src/app/_services/confirm-alert.service';
import { ToastService } from 'src/app/_services/toast.service';

@Component({
  selector: 'app-collaborator-card',
  templateUrl: './collaborator-card.component.html',
  styleUrls: ['./collaborator-card.component.scss']
})
export class CollaboratorCardComponent implements OnInit {

  @Input()
  collaborator: Collaborator;

  @Input()
  isActive: boolean = true;

  @Output()
  public restoreEvent = new EventEmitter<any>();

  constructor(
    private collaboratorService: CollaboratorService,
    private ts: ToastService,
    private router: Router,
    private confirmAlertService: ConfirmAlertService
  ) { }

  ngOnInit(): void { }

  confirmDelete() {
    this.confirmAlertService.initAlert("Isso implica no fim do contrato desse colaborador.").subscribe(event => {
      if(event) {
        this.delete();
        this.confirmAlertService.reset();
      }
    });
  }

  delete() {
    this.collaboratorService.deleteCollaborator(this.collaborator.id).subscribe(res => {
      this.ts.success('Ação concluída!', 'Colaborador removido com sucesso.');
      location.reload();
    });
  }

  addInProject() {
    this.router.navigate(['/collaborator-details', { collaboratorId: this.collaborator.id, addMode: true }]);
  }

  goToDetails() {
    this.router.navigate(['/collaborator-details', { collaboratorId: this.collaborator.id }]);
  }

  loadImage() {
    if (this.collaborator.image === null || this.collaborator.image === undefined) {
      if (this.collaborator.gender === 'M') {
        return '../../../../assets/images/man.png';
      } else {
        return '../../../../assets/images/woman.png';
      }
    } else {
      return this.collaborator.image;
    }
  }

  restore() {
    this.collaboratorService.restoreCollaborator(this.collaborator.id).subscribe(res => {
      this.ts.success('Ação concluída!', 'Colaborador restaurado com sucesso! :D');
      this.restoreEvent.emit();
    });
  }

}
