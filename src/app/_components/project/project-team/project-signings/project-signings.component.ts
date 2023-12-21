import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { formatDate } from 'src/app/_helpers/utils';
import { ProjectMember } from 'src/app/_models/project-member';

@Component({
  selector: 'app-project-signings',
  templateUrl: './project-signings.component.html',
  styleUrls: ['./project-signings.component.scss'],
})
export class ProjectSigningsComponent {
  @Input() signings: any[];

  tableColumns = ['Nome', 'Vínculo', 'Início', 'Fim', 'Remuneração'];

  constructor(private datePipe: DatePipe) {}

  get directInterns() {
    return this.signings
      .map((pm) => {
        pm.collaborator.payments = pm.collaborator.payRoll;
        return pm;
      })
      .filter(
        (pm: ProjectMember) =>
          pm.collaborator.payments[0].budgetCategory.code == 'RH_DIRECT' &&
          pm.collaborator.payments[0].employmentRelationship.name
            .toLowerCase()
            .startsWith('bolsista')
      );
  }

  get directCLT() {
    return this.signings
      .map((pm) => {
        pm.collaborator.payments = pm.collaborator.payRoll;
        return pm;
      })
      .filter(
        (pm: ProjectMember) =>
          pm.collaborator.payments[0].budgetCategory.code == 'RH_DIRECT' &&
          pm.collaborator.payments[0].employmentRelationship.name
            .toLowerCase()
            .startsWith('clt')
      );
  }

  get indirect() {
    return this.signings
      .map((pm) => {
        pm.collaborator.payments = pm.collaborator.payRoll;
        return pm;
      })
      .filter(
        (pm: ProjectMember) =>
          pm.collaborator.payments[0].budgetCategory.code == 'RH_INDIRECT'
      );
  }

  dismissal(pm) {
    const date = Date.parse(formatDate(pm.collaborator.payments[0].dismissal));

    if (!isNaN(date)) {
      return this.datePipe.transform(
        pm.collaborator.payments[0].dismissal,
        'dd/MM/yyyy'
      );
    }

    return 'N/A';
  }
}
