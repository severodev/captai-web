import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Contribution } from 'src/app/_models/contribution';
import { transfer } from 'src/app/_interfaces/transfer';


@Injectable({
  providedIn: 'root'
})
export class ContributionService {

  private url = `${environment.apiUrl}/contributions`;

  constructor(private http: HttpClient) { }

  contributionsReceivedInTableStyle(projectId : number) : Observable<any> {
    return this.http.get<any>(this.url + `/contributionsReceivedInTableStyle/${projectId}`);
  }

  findContributionsByProjectId(projectId : number) : Observable<any> {
    return this.http.get<any>(this.url + `/project/${projectId}`);
  }

  informationAboutContributions(projectId : number): Observable<any> {
    return this.http.get<any>(this.url + `/informationAboutContributions/${projectId}`);
  }

  confirmContribution(contributionId : number) : Observable<any> {
    return this.http.get<any>(this.url + `/confirmContribution/${contributionId}`);
  }

  createContribution(contribution : Contribution) : Observable<any> {
    return this.http.post<any>(this.url, contribution);
  }

  deleteContribution(contributionId : number) : Observable<any> {
    return this.http.delete<any>(this.url + `/${contributionId}`);
  }

  updateContribution(contributionId : number, updateContribution) : Observable<any> {
    return this.http.patch<any>(this.url + `/${contributionId}`, updateContribution);
  }

  createTransfer(body: transfer): Observable<any> {
    return this.http.put(this.url + '/transfer', body)
  }

}