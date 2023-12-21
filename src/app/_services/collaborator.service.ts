import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Collaborator } from '../_models/collaborator';

import { CollaboratorDto } from 'src/app/_dtos/collaborator-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CollaboratorService {

  private collaboratorDto = new CollaboratorDto();

  private draftCollaboratorKey = 'draft-collaborator';

  constructor(private http: HttpClient) { }

  getCollaboratorsPaginationMetadata(itemsPerPage: number, search: string,
    isActive: boolean=true,
    filter: any={project: '', er: '', institute: ''}) {

    let url = `${environment.apiUrl}/collaborators/pagination`;
    let params = new HttpParams()
    .set('itemsPerPage', itemsPerPage.toString())
    .set('search', search)
    .set('isActive', isActive.toString())
    .set('filters[project]', filter.project)
    .set('filters[er]', filter.er)
    .set('filters[institute]', filter.institute);

    return this.http.get(url, {params});
  }

  getCollaboratorByName(name: string): Observable<Collaborator> {
    let url = `${environment.apiUrl}/collaborators`;
    const params = new HttpParams()
    .set('name', name)

    return this.http.get(url, {params})
  }
  
  getCollaboratorByCpf(cpf: string): Observable<Collaborator> {
    let url = `${environment.apiUrl}/collaborators/checkCpf`;
    const params = new HttpParams()
    .set('cpf', cpf)

    return this.http.get(url, {params})
  }

  getCollaboratorsCards(search: string, desc: number, itemsPerPage: number | string,
    page: number | string, orderby: string,
    isActive: boolean=true,
    filter: any={project: '', er: '', institute: ''}) {

    let url = `${environment.apiUrl}/collaborators/cards`;
    const params = new HttpParams()
    .set('search', search)
    .set('desc', desc.toString())
    .set('itemsPerPage', itemsPerPage.toString())
    .set('page', page.toString())
    .set('orderby', orderby)
    .set('isActive', isActive.toString())
    .set('filters[project]', filter.project)
    .set('filters[er]', filter.er)
    .set('filters[institute]', filter.institute);

    return this.http.get(url, {params}).pipe(map((data: any) => {
      return data.map(d => this.collaboratorDto.convertResponseToCollaboratorCard(d));
    }));
  }

  getCollaboratorsDropdown() {
    let url = `${environment.apiUrl}/collaborators/dropdown`;

    return this.http.get(url).pipe(map((data: any) => {
      return data.map(d => this.collaboratorDto.convertResponseToCollaboratorDropdown(d));
    }));
  }

  getCollaborator(id: number) {
    let url = `${environment.apiUrl}/collaborators/${id}`;

    return this.http.get(url).pipe(map((data: any) => {
      return this.collaboratorDto.convertResponseToCollaborator(data);
    }));
  }

  getCollaboratorsCSV(search: string, desc: number, itemsPerPage: number | string, page: number | string, orderby: string, isActive: boolean=true, filter?: any) {
    let url = `${environment.apiUrl}/collaborators/csv`;

    const params = new HttpParams()
    .set('search', search)
    .set('desc', desc.toString())
    .set('itemsPerPage', itemsPerPage.toString())
    .set('page', page.toString())
    .set('orderby', orderby)
    .set('isActive', isActive.toString())
    .set('filters[project]', filter.project)
    .set('filters[er]', filter.er)
    .set('filters[institute]', filter.institute);

    return this.http.get(url, {params: params, responseType: 'blob'});
  }

  updateCollaborator(collaborator: Collaborator) {
    let url = `${environment.apiUrl}/collaborators/${collaborator.id}`;
    const jsonCollaborator = this.collaboratorDto.convertCollaboratorToJSON(collaborator);

    return this.http.put(url, jsonCollaborator);
  }

  deleteCollaborator(id: number) {
    let url = `${environment.apiUrl}/collaborators/${id}`;

    return this.http.delete(url);
  }

  restoreCollaborator(id) {
    let url = `${environment.apiUrl}/collaborators/${id}/activate`;
    let json = JSON.stringify({id: id});

    return this.http.post(url, json);
  }

  getEmploymentRelationshipDropdown() {
    let url = `${environment.apiUrl}/employmentrelationship/dropdown`;

    return this.http.get(url).pipe(map((data: any) => {
      return data.map(d => this.collaboratorDto.convertResponseToEmploymentRelationshipDropdown(d));
    }));
  }

  getBenefitsDropdown() {
    let url = `${environment.apiUrl}/benefits/dropdown`;

    return this.http.get(url).pipe(map((data: any) => {
      return data.map(d => this.collaboratorDto.convertResponseToBenefitsDropdown(d));
    }));
  }

  createCollaborator(collaborator: Collaborator) {
    console.table(collaborator);
    const body = this.collaboratorDto.convertCollaboratorToJSON(collaborator);

    let url =  `${environment.apiUrl}/collaborators`;
    return this.http.post(url, body);
  }

  getAvaliableBenefits(employmentRelationshipId: number, instituteId: number, paymentInformationId: number) {
    let url = `${environment.apiUrl}/benefits/grantedBenefits`;

    const params = new HttpParams()
    .set('idER', employmentRelationshipId.toString())
    .set('idInstitute', instituteId.toString());
    if(paymentInformationId && paymentInformationId > 0){
      params.set('idPayroll', paymentInformationId?.toString());
    }

    return this.http.get(url, {params: params}).pipe(map((data: any) => {
      return data.map(d => this.collaboratorDto.convertResponseToPaymentBenefit(d));
    }));
  }

  confirmHRPayment(collaboratorId: number, paymentId: number) {
    let url =  `${environment.apiUrl}/collaborators/${collaboratorId}/confirmHRPayment/${paymentId}`;
    return this.http.put(url, {});
  }

  confirmAllHRPayments(status: boolean, paymentIds: number[]) {
    let url =  `${environment.apiUrl}/collaborators/confirmAllHRPayments`;
    return this.http.put(url, {
      status: status,
      paymentIds: paymentIds
    });
  }

}
