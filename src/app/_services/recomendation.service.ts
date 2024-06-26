import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RecomendationService {
  
  constructor(private http: HttpClient) { }

  getEditalByUserAfinity(userAfinity: any) : Observable<any> {
    return this.http.post(`${environment.recomendationApiUrl}/captia/recomendation`, userAfinity);
  }
}