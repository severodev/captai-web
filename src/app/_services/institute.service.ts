import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Institute } from '../_models/institute';

@Injectable({
  providedIn: 'root'
})
export class InstituteService {

  constructor(private http: HttpClient) { }

  private convertResponseToInstituteDropdown(data: any): Institute {
    let institute = new Institute();
    institute.id = data.id;
    institute.abbreviation = data.abbreviation;
    institute.name = data.name;

    return institute;
  }

  getInstitutesDropdown() {
    let url = `${environment.apiUrl}/institutes/dropdown`;

    return this.http.get(url).pipe(map((data: any) => {
      return data.map(d => this.convertResponseToInstituteDropdown(d));
    }));
  }
}
