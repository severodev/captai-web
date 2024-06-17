import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Institution } from '../_models/institution';

@Injectable({
  providedIn: 'root'
})
export class InstitutionService {

  constructor(private http: HttpClient) { }

  private convertResponseToInstitutionDropdown(data: any): Institution {
    let institute = new Institution();
    institute.id = data.id;
    institute.abbreviation = data.abbreviation;
    institute.name = data.name;

    return institute;
  }

  getInstitutionsDropdown() {
    let url = `${environment.apiUrl}/institutions/dropdown`;

    return this.http.get(url).pipe(map((data: any) => {
      return data.map(d => this.convertResponseToInstitutionDropdown(d));
    }));
  }
}
