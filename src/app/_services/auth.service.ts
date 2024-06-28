import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/_models/user';
import { jwtDecode } from 'jwt-decode';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: User;

  public recomendations: any;

  private accessTokenSubject: BehaviorSubject<string>;
  private refreshTokenSubject: BehaviorSubject<string>;

  public accessToken: Observable<string>;
  public refreshToken: Observable<string>;

  constructor(private http: HttpClient) {
    if (localStorage.getItem('accessToken')) {
      this.loadTokensFromLocalStorage();
    } else {
      this.loadTokensFromSessionStorage();
    }
    this.accessToken = this.accessTokenSubject.asObservable();
    this.refreshToken = this.refreshTokenSubject.asObservable();
  }

  private loadTokensFromLocalStorage() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.accessTokenSubject = new BehaviorSubject<string>(JSON.parse(localStorage.getItem('accessToken')));
    this.refreshTokenSubject = new BehaviorSubject<string>(JSON.parse(localStorage.getItem('refreshToken')));
  }

  private loadTokensFromSessionStorage() {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.accessTokenSubject = new BehaviorSubject<string>(JSON.parse(sessionStorage.getItem('accessToken')));
    this.refreshTokenSubject = new BehaviorSubject<string>(JSON.parse(sessionStorage.getItem('refreshToken')));
  }

  public get accessTokenValue(): string {
    return this.accessTokenSubject.value;
  }

  public get refreshTokenValue(): string {
    return this.refreshTokenSubject.value;
  }

  login(username: string, password: string, keepConnected?: boolean) {
    let body = {
      username: username,
      password: password
    };

    return this.http.post(`${environment.apiUrl}/auth/login`, body)
      .pipe(map((res: any) => {
        if (!res.message) {
          this.user = jwtDecode(res.access_token);
        if(this.user.name)
          this.user.name = this.user.name.toLowerCase().replace(/(?:^|\s)\S/g, (a) => a.toUpperCase());

        this.accessTokenSubject.next(res.access_token);
        this.refreshTokenSubject.next(res.refresh_token);
        if (keepConnected) {
          localStorage.setItem('user', JSON.stringify(this.user));
          localStorage.setItem('accessToken', JSON.stringify(res.access_token));
          localStorage.setItem('refreshToken', JSON.stringify(res.refresh_token));
        } else {
          sessionStorage.setItem('user', JSON.stringify(this.user));
          sessionStorage.setItem('accessToken', JSON.stringify(res.access_token));
          sessionStorage.setItem('refreshToken', JSON.stringify(res.refresh_token));
        }
      } else {
        return res.message;
      }
      }));
  }

  recoverPassword(username: string) {
    return this.http.post(`${environment.apiUrl}/auth/recoverPassword`,
      {username: username}
    );
  }

  logout() {
    this.accessTokenSubject.next(null);
    this.accessTokenSubject.next(null);

    localStorage.removeItem('accessToken');
    sessionStorage.removeItem('accessToken');

    localStorage.removeItem('refreshToken');
    sessionStorage.removeItem('refreshToken');
  }

  manualTokenRefresh() {
    this.http.post(`${environment.apiUrl}/auth/refreshToken`,
      { email: this.user.email, refreshToken: this.refreshTokenValue }
    ).subscribe({
      next: (res:any) => {
        this.user = jwtDecode(res.access_token);
        this.accessTokenSubject.next(res.access_token);
        this.refreshTokenSubject.next(res.refresh_token);
        localStorage.setItem('user', JSON.stringify(this.user));
        localStorage.setItem('accessToken', JSON.stringify(res.access_token));
        localStorage.setItem('refreshToken', JSON.stringify(res.refresh_token));
      },
      error: (err) => {
        console.log('Falha ao atualizar token do usuário');
      }
    });
  }

}
