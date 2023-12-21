import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private http: HttpClient) { }

  getPermissions(): Observable<any> {
    let url = `${environment.apiUrl}/permissions`;
    return this.http.get(url)
  }

}
