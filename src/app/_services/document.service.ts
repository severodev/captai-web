import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { DocType } from '../_models/doc-type';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private http: HttpClient) { }

  private convertResponseToDocumentTypeDropdown(data: any): DocType {
    let doctype = new DocType();
    doctype.id = data.id;
    doctype.name = data.name;

    doctype.docCategory = {
      id: data.category.id,
      name: data.category.name
    }

    return doctype;
  }

  getDocumentsTypeDropdown(category) {
    let url = `${environment.apiUrl}/documents/type/dropdown`;

    const params = new HttpParams()
    .set('category', category.toString());

    return this.http.get(url, {params}).pipe(map((data: any) => {
      return data.map(d => this.convertResponseToDocumentTypeDropdown(d));
    }));
  }

  sendProjectDocument(fileToUpload: File, doctype) {
    const url = `${environment.apiUrl}/documents/upload/type/${doctype}`;

    let formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    return this.http.post(url, formData);
  }

  sendDependentDocument(fileToUpload: File, doctype) {
    const url = `${environment.apiUrl}/documents/upload/type/${doctype}`;

    let formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    return this.http.post(url, formData);
  }

  sendTermDocument(fileToUpload: File, doctype) {
    const url = `${environment.apiUrl}/documents/upload/type/${doctype}`;

    let formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    return this.http.post(url, formData);
  }

  sendCollaboratorDocument(fileToUpload: File, doctype) {
    const url = `${environment.apiUrl}/documents/upload/type/${doctype}`;

    let formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    return this.http.post(url, formData);
  }

  getExpenseDocumentsTypeDropdown() {
    let url = `${environment.apiUrl}/documents/type/dropdown`;

    const params = new HttpParams()
    .set('category', '7');

    return this.http.get(url, {params}).pipe(map((data: any) => {
      return data.map(d => this.convertResponseToDocumentTypeDropdown(d));
    }));
  }

  sendExpenseDocument(fileToUpload: File, doctype) {
    const url = `${environment.apiUrl}/documents/upload/type/${doctype}`;

    let formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    return this.http.post(url, formData);
  }

}
