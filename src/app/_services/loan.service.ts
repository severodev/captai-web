import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Loan } from 'src/app/_models/loan';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  private url = `${environment.apiUrl}/loans`;

  constructor(private http: HttpClient) { }

  findReceivedLoansByProductId(projectId : number) : Observable<any> {
    return this.http.get<any>(this.url + `/project/received/${projectId}`);
  }

  findGivenLoansByProductId(projectId : number) : Observable<any> {
    return this.http.get<any>(this.url + `/project/given/${projectId}`);
  }

  informationAboutLoans(projectId : number): Observable<any> {
    return this.http.get<any>(this.url + `/informationAboutLoans/${projectId}`);
  }

  confirmLoan(loanId : number) : Observable<any> {
    return this.http.get<any>(this.url + `/confirmLoan/${loanId}`);
  }

  returnLoan(loanId : number) : Observable<any> {
    return this.http.get<any>(this.url + `/returnLoan/${loanId}`);
  }

  createLoan(loan : Loan) : Observable<any>{
    return this.http.post<any>(this.url, loan);
  }

  deleteLoan(loanId : number) : Observable<any> {
    return this.http.delete<any>(this.url + `/${loanId}`);
  }

  updateLoan(loanId : number, updateLoan : Loan) : Observable<any> {
    return this.http.patch<any>(this.url + `/${loanId}`, updateLoan);
  }

}