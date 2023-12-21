import { Supplier } from '../_models/supplier';
import { BudgetCategory } from '../_models/budget-category';

export class SupplierDto {

  convertResponseToSupplier(data: any): Supplier {
    let supplier = new Supplier();
    supplier.id = data.id;
    supplier.name = data.name;
    supplier.companyName = data.companyName;
    supplier.cnpj = data.cnpj;
    supplier.email = data.email;
    supplier.website = data.website;
    supplier.phoneMain = data.phoneMain;
    supplier.phoneSecondary = data.phoneSecondary;
    supplier.address = data.address;
    supplier.postalCode = data.postalCode;
    supplier.state = data.state;
    supplier.city = data.city;
    supplier.bank = data.bank;
    supplier.bankAgency = data.bankAgency;
    supplier.bankAccount = data.bankAccount;
    supplier.budgetCategory = data.budgetCategoryId;
    supplier.budgetCategoryLabel = data.budgetCategory;
    supplier.notes = data.notes;

    return supplier;
  }

  convertResponseToSupplierDropdown(data: any): Supplier {
    let supplier = new Supplier();
    supplier.id = data.id;
    supplier.name = data.name;
    supplier.budgetCategoryLabel = data.budgetCategory;
    supplier.cnpj = data.cnpj;

    return supplier;
  }

  convertSupplierToJSON(supplier: Supplier) {
    let body = {
      "id": supplier.id,
      "name": supplier.name,
      "companyName": supplier.companyName,
      "cnpj": supplier.cnpj,
      "email": supplier.email,
      "website": supplier.website,
      "phoneMain": supplier.phoneMain,
      "phoneSecondary": supplier.phoneSecondary,
      "address": supplier.address,
      "postalCode": supplier.postalCode,
      "state": supplier.state,
      "city": supplier.city,
      "bank": +(supplier.bank),
      "bankAgency": supplier.bankAgency,
      "bankAccount": supplier.bankAccount,
      "budgetCategory": +(supplier.budgetCategory),
      "notes": supplier.notes
    };

    return body;
  }

  convertResponseToBudgetCategory(data: any): BudgetCategory {
    let bc = new BudgetCategory();
    bc.id = data.id;
    bc.name = data.name;
    bc.code = data.code;

    return bc;
  }

}
