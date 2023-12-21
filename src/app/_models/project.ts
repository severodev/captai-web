import { Institute } from './institute';
import { ProjectMember } from './project-member';
import { DocumentFile } from './document-file';

export class Project {
  id?: number;
  name?: string;
  headerTotalExpenses?: number;
  description?: string;
  start?: string;
  end?: string;
  notes?: string;
  progress?: number;
  remainingBudget?: number;
  budget?: string;
  amendmentTerm?: string;

  instituteAbbreviation?: string;
  instituteId?: string;
  institute?: Institute;

  bankName?: string;
  bankId?: string;
  bankAgency?: string;
  bankAccount?: string;

  paymentOrder?: string;
  projectManager?: string;
  projectCoordinator?: string;

  bank?: {
    id: number;
    name: string;
  }

  projectMembers?: ProjectMember[];
  documents?: number[];
  documentFiles?: DocumentFile[];

  expenses?: any[];
  hrExpenses?: any[];
  hrPayments?: any[];
  
  expensesGrid?: any;
  marginsGrid?: any;
  financeGrid?: any[];
  workplan?: any[];
  workplanComplete?: boolean;

  utilizedFundsPercentage?: Number;
  totalExpensives?: Number;
}
