import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class FirstAccessService {

    constructor(private http: HttpClient) { }

    createPassword(data: any) {
        let url = `${environment.apiUrl}/users/firstAccess`;
        return this.http.post(url, data);
    }
}