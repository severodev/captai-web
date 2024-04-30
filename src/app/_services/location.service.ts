import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { LocationDto } from '../_dtos/location-dto';
import { createParams } from '../_helpers/utils';
import { PageRequest, StateFilter } from '../_interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private locationDto = new LocationDto();

  constructor(
    private http: HttpClient
  ) { }

  getStatesDropdown() {
    let url = `${environment.apiUrl}/location/state/dropdown`;

    return this.http.get(url).pipe(map((data: any) => {
      return data.map(d => this.locationDto.convertResponseToStateDropdown(d));
    }));
  }

  getCitiesDropdown(stateId: string) {
    let url = `${environment.apiUrl}/location/city/dropdown`;

    const params = new HttpParams()
      .set('state', stateId);

    return this.http.get(url, {params}).pipe(map((data: any) => {
      return data.map(d => this.locationDto.convertResponseToCityDropdown(d));
    }));
  }

  //////// new content for Capti /////

  getAll( filter: StateFilter, pageRequest: PageRequest ): Observable<any> {
    return this.http.get(`${environment.apiUrl}/location`, {
      params: createParams([filter, pageRequest])
    });
  }

}
