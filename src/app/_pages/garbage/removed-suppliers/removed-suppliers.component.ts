import { Component, OnInit } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';

import { Supplier } from 'src/app/_models/supplier';
import { SupplierService } from 'src/app/_services/supplier.service';

@Component({
  selector: 'app-removed-suppliers',
  templateUrl: './removed-suppliers.component.html',
  styleUrls: ['./removed-suppliers.component.scss']
})
export class RemovedSuppliersComponent implements OnInit {

  removedSuppliers: Supplier[];

  public suppliersPaginationcConfig: PaginationInstance = {
    id: 'removed-suppliers-pagination',
    itemsPerPage: 4,
    currentPage: 1,
  };

  constructor(private supplierService: SupplierService) { }

  ngOnInit(): void {
    this.loadRemovedSuppliersMetadata();
  }

  loadRemovedSuppliersMetadata() {
    this.supplierService.getSuppliersPaginationMetadata(this.suppliersPaginationcConfig.itemsPerPage, false)
    .subscribe((res: any) => {
      this.suppliersPaginationcConfig.totalItems = res.totalItems;
      this.loadRemovedSuppliers('', 1, this.suppliersPaginationcConfig.itemsPerPage, this.suppliersPaginationcConfig.currentPage);
    });
  }

  loadRemovedSuppliers(search: string, desc: number, itemsPerPage: number, page: number) {
    this.supplierService.getSuppliersPagination(search, desc, itemsPerPage, page, '', false)
    .subscribe((res: Supplier[]) => {
      this.removedSuppliers = res;
    });
  }

  changePage(pageNumber: number) {
    this.suppliersPaginationcConfig.currentPage = pageNumber;
    this.loadRemovedSuppliers('', 1, this.suppliersPaginationcConfig.itemsPerPage, this.suppliersPaginationcConfig.currentPage);
  }

  toggleChev(attrId) {
    if (document.getElementById(attrId).classList.contains('ic-chev-down')) {
      document.getElementById(attrId).classList.remove('ic-chev-down');
      document.getElementById(attrId).classList.add('ic-chev-up');
    } else {
      document.getElementById(attrId).classList.remove('ic-chev-up');
      document.getElementById(attrId).classList.add('ic-chev-down');
    }
  }

}
