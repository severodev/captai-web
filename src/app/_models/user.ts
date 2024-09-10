export class Segment {
  id?: number;
  name?: string;
}
export class User {
  id?: number;
  name?: string;
  lastName?: string;
  email?: string;
  cpfCnpj?: string;
  role?: string;
  roleId?: number;
  language?: string;
  profileImageId?: string;
  profileImageUrl?: string;
  segment?: Segment;
  abrangency?: [];
  activite?: [];
  state?: any;
  background?: string;
  savedEditais?: number[];
  customerId?: string;
  subscriptionId?: string;
  cardId?: string;
}
