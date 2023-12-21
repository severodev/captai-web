import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { Collaborator } from 'src/app/_models/collaborator';
import { CollaboratorService } from '../../../_services/collaborator.service';
import { ToastService } from '../../../_services/toast.service';

@Component({
  selector: 'app-collaborator-info',
  templateUrl: './collaborator-info.component.html',
  styleUrls: ['./collaborator-info.component.scss']
})
export class CollaboratorInfoComponent implements OnInit {

  @Input()
  collaborator: Collaborator;

  @Input()
  addProjectMode: boolean = false;

  activeForm: string;
  canEdit: boolean = false;

  @ViewChild('appInfo') appInfo: any;

  @Output() paymentsEvent = new EventEmitter<any>();

  constructor(
    private ts: ToastService,
    private collaboratorService: CollaboratorService 
  ) { }

  ngOnInit(): void {
    this.showPersonalForm();

    if(this.addProjectMode) {
      this.showRemunerationForm();
      this.canEdit = true;
    }
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

  showDependentForm() {
    this.activeForm = 'dependent';
  }

  showDocsForm() {
    this.activeForm = 'docs';
  }

  save() {
    this.collaboratorService.updateCollaborator(this.collaborator).subscribe(res => {
      this.paymentsEvent.emit(res);
      this.ts.success('Ação concluída!', 'Alterações salvas com sucesso!');
      this.canEdit = false;
    });
  }
}
