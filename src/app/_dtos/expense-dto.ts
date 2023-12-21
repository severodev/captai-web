import { CostShare, Expense } from '../_models/expense';
import { ExpenseInstallment } from '../_models/expense-installment';
import { formatDateMoment } from '../_helpers/utils';

export class ExpenseDto {
  convertExpenseObjectToJSON(expense: Expense) {
    const aux = <Expense>{
      id:               expense.id ? +expense.id : null,
      supplierId:       +expense.supplierId,
      supplier:         { id: +expense.supplierId },
      description:      expense.description,
      requestDate:      this.convertDateInputToDateJSON(expense.requestDate),
      // dueDate:          this.convertDateInputToDateJSON(expense.dueDate),
      value:            expense.costShare.reduce(
        (accumulator, currentValue) => accumulator + (+currentValue.value), 0),
      budgetCategoryId: +expense.budgetCategoryId,
      budgetCategory:   expense.budgetCategory,
      costShare:        expense.costShare.map(
        (cs: CostShare) => { return this.convertCostShareObjectToJSON(cs) }),
      documents:        expense.documents,
      status:           expense.status,
      installments:     expense.installments?.map(
        (i: ExpenseInstallment) => { return this.convertInstallmentObjectToJSON(i) }),
    }
    return aux;
  }

  convertTripExpenseObjectToJSON(tripExpense: Expense) {
    const dtAux = new Date();
    let dtJson = dtAux.getFullYear() + '-' + (dtAux.getMonth() + 1) + '-' + dtAux.getDate();
    const aux = {
      id:                     tripExpense.id ? +tripExpense.id : null,
      requestDate:            dtJson,
      description:            tripExpense.description,
      budgetCategoryId:       +tripExpense.budgetCategoryId,
      budgetCategory:         tripExpense.budgetCategory,
      supplier:               tripExpense.supplier,
      costShare:              tripExpense.costShare.map(
        (cs: CostShare) => { return this.convertCostShareObjectToJSON(cs) }),
      value:                  tripExpense.costShare.reduce(
        (accumulator, currentValue) => accumulator + (+currentValue.value), 0),
      documents:              tripExpense.documents,
      tripDetails: {
        passengerName:        tripExpense.tripDetails.passengerName,
        passengerCpf:         tripExpense.tripDetails.passengerCpf,
        ticketValue:          +tripExpense.tripDetails.ticketValue,
        hostingValue:         +tripExpense.tripDetails.hostingValue,
        dailyAllowanceValue: + tripExpense.tripDetails.dailyAllowanceValue
      },
      installments:     tripExpense.installments?.map(
        (i: ExpenseInstallment) => { return this.convertInstallmentObjectToJSON(i) }),
    }
    return aux;
  }

  convertCostShareObjectToJSON(costShare: CostShare) {
    return {
      projectId: costShare.projectId ?? costShare.project.id,
      project: costShare.project,
      value: +costShare.value,
    }
  }

  convertInstallmentObjectToJSON(installment: ExpenseInstallment) {
    return {
      order: installment.order,
      description: installment.description,
      paymentDate: installment.paymentDate,
      str_date: formatDateMoment(installment.paymentDate),
      month: +installment.month,
      year: +installment.year,
      value: +installment.value,
      isPaid: installment.isPaid ?? false,
      // projetcId: installment.projectId,
      project: installment.project
    }
  }

  convertDateInputToDateJSON(dt: string) {
    let aux = dt.split('/');
    let dtAux = new Date(Number(aux[2]), (Number(aux[1]) - 1), Number(aux[0]));
    let dtJson = dtAux.getFullYear() + '-' + (dtAux.getMonth() + 1) + '-' + dtAux.getDate();
    return dtJson;
  }
}
