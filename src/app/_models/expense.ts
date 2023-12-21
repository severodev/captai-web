import { Project } from "./project";
import { ExpenseInstallment } from "./../_models/expense-installment";
import { BudgetCategory } from "./budget-category";
import { Supplier } from "./supplier";

export class Expense {
  id?:               number;
  supplierId?:       number;
  supplierName?:     string;
  supplier?:         Supplier;
  cnpj?:             string;
  description?:      string;
  requestDate?:      string;
  dueDate?:          string;
  paymentDate?:      string;
  deliveryDate?:     string;
  value?:            number;
  status?:           string;
  budgetCategoryId?: number;
  budgetCategory?:   BudgetCategory;
  costShare?:        CostShare[];
  documents?:        number[];
  tripDetails?:      TripDetails;
  installments?:     ExpenseInstallment[];
}

export interface CostShare {
  projectId?:   number;
  project?:     Project;
  value?:       number;
  selected?:    boolean;
}

export interface TripDetails {
  passengerName?:        string;
  passengerCpf?:         string;
  ticketValue?:          number;
  hostingValue?:         number;
  dailyAllowanceValue?:  number;
}