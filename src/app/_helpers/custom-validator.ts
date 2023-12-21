import { Project } from '../_models/project';
import { Collaborator } from '../_models/collaborator';
import { PaymentInformation } from '../_models/payment-information';

export class CustomValidator {

  isEmpty(value: string): boolean {
    if (value === null || value === undefined) {
      return true;
    } else {
      if (value === '' || value.trim() === '') {
        return true;
      } else {
        return false;
      }
    }
  }

  isValidRemunerationCollaboratorForm(payment: PaymentInformation): boolean {
    if ( this.isEmpty(payment.jobTitle) || this.isEmpty(payment.admission) ||
    this.isEmpty(payment.idProject) || this.isEmpty(payment.idInstitute) ||
    this.isEmpty(payment.idEmploymentRelationship) || this.isEmpty(payment.workload.toString())) {
      return false;
    } else {
      return true;
    }
  }
}
