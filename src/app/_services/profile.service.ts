import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  getProfiles(): Observable<any> {
    let url = `${environment.apiUrl}/profiles`;
    return this.http.get(url)
  }

  savePermissions(idProfile: any, permissions: any): Observable<any> {
    let url = `${environment.apiUrl}/profiles/${idProfile}/permissions`;
    return this.http.put(url, permissions);
  }
  
}
