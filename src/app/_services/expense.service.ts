import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Expense } from '../_models/expense';
import { ExpenseDto } from '../_dtos/expense-dto';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private expenseDto = new ExpenseDto();

  constructor(private http: HttpClient) { }

  saveExpense(expense: Expense) {
    const body = this.expenseDto.convertExpenseObjectToJSON(expense);
    let url = `${environment.apiUrl}/expenses`;
    return expense.id ? this.http.put(url, body) : this.http.post(url, body);
  }

  saveTripExpense(expense: Expense) {
    const body = this.expenseDto.convertTripExpenseObjectToJSON(expense);
    let url = `${environment.apiUrl}/expenses`;
    return expense.id ? this.http.put(url, body) : this.http.post(url, body);
  }

  getProjectExpenses(projectId: number) {
    let url = `${environment.apiUrl}/expenses/project/${projectId}`
    return this.http.get(url);
  }

  confirmExpensePayment(expenseId: number, expenseInstallmentId: number) {
    const body = {
      id: expenseId,
      expenseInstallmentId: expenseInstallmentId
    };
    let url = `${environment.apiUrl}/expenses/${expenseId}/confirmPayment/${expenseInstallmentId}`;
    return this.http.put(url, body );
  }

  delete(expenseId: number) {
    let url = `${environment.apiUrl}/expenses/${expenseId}`;
    return this.http.delete(url );
  }

}
