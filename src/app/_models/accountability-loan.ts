type CardType = 'ReceivedLoans' | 'GivenLoans';

export class AccountabilityLoan {
  id?: number;
  amount?: number;
  receiptDate: Date;
  returnDate?: Date;
  confirmationOfReceive?: boolean;
  confirmationOfDevolution?: boolean;
  originProject?: number;
  originProjectName?: string;
  targetProject?: string;
  targetProjectName?: string;
  cardType? : CardType;
}
