import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
    return this.http.get(url)
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

  createUser(body: User): Observable<any> {
    let url = `${environment.apiUrl}/users`;
    return this.http.post(url, body);
  }

  createUserGuester(body: User): Observable<any> {
    return this.http.post(`${environment.apiUrl}/users/create-guester`, body);
  }

  editUSer(id: number, changes: Partial<User>): Observable<any> {
    let url = `${environment.apiUrl}/users/${id}`;
    return this.http.put(url, changes);
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

  updateUserProfileImage(userId: number, file:any, fileName: string): Observable<string> {

    if(!file){
      return null;
    }

    let url = `${environment.apiUrl}/imagekit/updateProfileImage`;
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', fileName);
    formData.append('userId', userId.toString());
    
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('enctype', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    
    return this.http.post<string>(url, formData, { headers });

  }

  checkAvaliabilityEmail(email: string): Observable<any> {
    let url = `${environment.apiUrl}/users/check-availability-email?email=${email}`;
    return this.http.get(url);
  }

  checkAvaliabilityCpfCnpj(cpfCnpj: string): Observable<any> {
    let url = `${environment.apiUrl}/users/check-availability-cpf-cnpj?cpfCnpj=${cpfCnpj}`;
    return this.http.get(url);
  }

}
