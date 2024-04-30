import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ActiviteFilter, PageRequest } from '../_interfaces';
import { createParams } from '../_helpers/utils';

@Injectable({
  providedIn: 'root'
})
export class ActiviteService {

  constructor(private http: HttpClient) { }

  getAll( filter: ActiviteFilter, pageRequest: PageRequest ): Observable<any> {
    return this.http.get(`${environment.apiUrl}/activities`, {
      params: createParams([filter, pageRequest])
    });
  }
}