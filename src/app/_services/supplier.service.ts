import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { SupplierDto } from '../_dtos/supplier-dto';
import { Supplier } from '../_models/supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  private supplierDto = new SupplierDto();

  constructor(private http: HttpClient) { }

  getSuppliersPaginationMetadata(itemsPerPage: number, isActive: boolean=true) {
    let url = `${environment.apiUrl}/suppliers/pagination`;

    let params = new HttpParams()
    .set('itemsPerPage', itemsPerPage.toString())
    .set('isActive', isActive.toString());

    return this.http.get(url, {params});
  }

  getBudgetCategoriesDropdown() {
    let url = `${environment.apiUrl}/budgetCategory/dropdown`;

    return this.http.get(url).pipe(map((data: any) => {
      return data.map(d => this.supplierDto.convertResponseToBudgetCategory(d));
    }));
  }

  createSupplier(supplier: Supplier) {
    const jsonSupplier = this.supplierDto.convertSupplierToJSON(supplier);

    let url = `${environment.apiUrl}/suppliers`;

    return this.http.post(url, jsonSupplier);
  }

  getSuppliers(search: string, desc: number, orderby: string) {
    let url = `${environment.apiUrl}/suppliers/cards`;

    const params = new HttpParams()
    .set('search', search)
    .set('desc', desc.toString())
    .set('itemsPerPage', '1000')
    .set('orderby', orderby);

    return this.http.get(url, {params}).pipe(map((data: any) => {
      return data.map(d => this.supplierDto.convertResponseToSupplier(d));
    }));
  }

  getSuppliersPagination(search: string, desc: number, itemsPerPage: number | string,
    page: number | string, orderby: string, isActive: boolean=true) {
    let url = `${environment.apiUrl}/suppliers/cards`;

    const params = new HttpParams()
    .set('search', search)
    .set('desc', desc.toString())
    .set('itemsPerPage', itemsPerPage.toString())
    .set('page', page.toString())
    .set('orderby', orderby)
    .set('isActive', isActive.toString());

    return this.http.get(url, {params}).pipe(map((data: any) => {
      return data.map(d => this.supplierDto.convertResponseToSupplier(d));
    }));
  }

  getSupplier(id: number) {
    let url = `${environment.apiUrl}/suppliers/${id}`;

    return this.http.get(url).pipe(map((data: any) => {
      return this.supplierDto.convertResponseToSupplier(data);
    }));
  }

  updateSupplier(supplier: Supplier) {
    let url = `${environment.apiUrl}/suppliers`;
    const jsonSupplier = this.supplierDto.convertSupplierToJSON(supplier);

    return this.http.put(url, jsonSupplier);
  }

  deleteSupplier(id: number) {
    let url = `${environment.apiUrl}/suppliers/${id}`;

    return this.http.delete(url);
  }

  restoreSupplier(id) {
    let url = `${environment.apiUrl}/suppliers/${id}/activate`;

    let json = JSON.stringify({id: id});

    return this.http.post(url, json);
  }

  getSuppliersDropdown() {
    let url = `${environment.apiUrl}/suppliers/dropdown`;

    return this.http.get(url).pipe(map((data: any) => {
      return data.map(d => this.supplierDto.convertResponseToSupplierDropdown(d));
    }));
  }
}
