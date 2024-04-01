import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/_models/user';
import { environment } from 'src/environments/environment';
import { map, retry, shareReplay } from 'rxjs/operators';

import { UserDto } from 'src/app/_dtos/user-dto';
import { createParams } from '../_helpers/utils';
import { PageRequest, UserFilter } from '../_interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userDto = new UserDto();

  constructor(private http: HttpClient) { }

  userFormSubject = new BehaviorSubject<string>('EDIT')
  currentSelectedUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('user')))

  getRoles(): Observable<any> {
    let url = `${environment.apiUrl}/roles`;
    return this.http.get(url).pipe(
      map(roles => (roles)),
      retry(1),
      shareReplay()
    )

  }

  getUsers(filter: UserFilter, pageRequest: PageRequest): Observable<any> {
    return this.http.get(`${environment.apiUrl}/users`, {
      params: createParams([filter, pageRequest])
    });
  }

  getUserPaginationMetadata(itemsPerPage: number, search: string,
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
  }

}
