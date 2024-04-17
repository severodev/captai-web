import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ImagekitService {

  constructor(private http: HttpClient) { }

  getFileUrl(fileId: string): any {
    const params = new HttpParams()
    .set('fileId', fileId)
    .set('thumbnail', 'true');
    return this.http.get(`${environment.apiUrl}/imagekit/fileUrl`, { params });
  }
}