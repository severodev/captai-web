import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Bank } from '../_models/bank';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  constructor(private http: HttpClient) { }

  private convertResponseToBankDropdown(data: any): Bank {
    let bank = new Bank();
    bank.id = data.id;
    bank.name = data.name;

    return bank;
  }

  getBanksDropdown() {
    let url = `${environment.apiUrl}/bank/dropdown`;

    return this.http.get(url).pipe(map((data: any) => {
      return data.map(d => this.convertResponseToBankDropdown(d));
    }));
  }
}
