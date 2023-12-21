import { BenefitType } from "./benefit-type";

export class Benefit {
  id?: number;
  benefitType?: BenefitType
  name?: string;
  description?: string;
  amountValue?: number;
  amountType?: string;
  deductionValue?: number;
  deductionType?: string;
  comments?: string;
  hint?: string;

  selected: boolean = false;
}
