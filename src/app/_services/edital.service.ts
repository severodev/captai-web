import { Injectable } from '@angular/core';
import { HttpClient,} from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { createParams } from '../_helpers/utils';
import { EditalFilter, PageRequest } from '../_interfaces';

@Injectable({
  providedIn: 'root'
})
export class EditalService {

  constructor(private http: HttpClient) { }

  getEditais(filter: EditalFilter, pageRequest: PageRequest): Observable<any> {
    return this.http.get(`${environment.apiUrl}/edital`, {
      params: createParams([filter, pageRequest])
    });
  }

  getById(id : any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/edital/${id}`);
  }

  /* getUserPaginationMetadata(itemsPerPage: number, search: string,
    isActive: boolean=true,): Observable<any> {
    let url = `${environment.apiUrl}/users/pagination`;
    let params = new HttpParams()
    .set('itemsPerPage', itemsPerPage.toString())
    .set('search', search)
    .set('isActive', isActive.toString())

    return this.http.get(url, {params})
  }

  createUser(body: User): Observable<User> {
    let url = `${environment.apiUrl}/users`;
    
    return this.http.post(url, body)
  }

  editUSer(id: number, changes: Partial<User>): Observable<any> {
    let url = `${environment.apiUrl}/users/${id}`;

    return this.http.put(url, changes)
  }

  requestChangePassword(usernameValue: string): Observable<any> {
    let obj = {username: usernameValue};
    return this.http.put(`${environment.apiUrl}/users/ChangePassword`, obj);
  }

  validateEmail(tokenValue: string): Observable<any> {
    let obj = {token: tokenValue};
    return this.http.post(`${environment.apiUrl}/users/validate-email`, obj);
  }

  deleteUser(id: number): Observable<Object> {
    let url = `${environment.apiUrl}/users/delete/${id}`;

    return this.http.put(url, null)
  } */

}