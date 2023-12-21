import { Benefit } from "./benefit";
import { BudgetCategory } from "./budget-category";
import { EmploymentRelationship } from "./employment-relationship";
import { Institute } from "./institute";
import { Project } from "./project";

export class PaymentInformation {
  id?: number;
  active?: boolean;
  jobTitle?: string;
  admission?: string;
  dismissal?: string;
  idInstitute?: string;
  idEmploymentRelationship?: string;
  idBudgetCategory?: string;
  idProject?: string;
  salary?: number;
  workload?: number;
  selected?: boolean;

  benefits?: Benefit[];

  employmentRelationship?: EmploymentRelationship;
  institute?: Institute;
  project?: Project;
  budgetCategory?: BudgetCategory;
}
