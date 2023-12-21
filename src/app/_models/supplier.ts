import { City } from "./city";
import { State } from "./state";

export class Supplier {
  id?: number;
  name?: string;
  companyName?: string;
  cnpj?: string;
  email?: string;
  website?: string;
  phoneMain?: string;
  phoneSecondary?: string;
  address?: string;
  postalCode?: string;
  state?: State;
  city?: City;
  bank?: number;
  bankAgency?: string;
  bankAccount?: string;
  budgetCategory?: number;
  budgetCategoryLabel?: string;
  notes?: string;
}
