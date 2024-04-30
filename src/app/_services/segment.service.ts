import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { PageRequest, SegmentFilter } from '../_interfaces';
import { createParams } from '../_helpers/utils';

@Injectable({
  providedIn: 'root'
})
export class SegmentService {

  constructor(private http: HttpClient) { }

  getAll( filter: SegmentFilter, pageRequest: PageRequest ): Observable<any> {
    return this.http.get(`${environment.apiUrl}/segment`, {
      params: createParams([filter, pageRequest])
    });
  }
}