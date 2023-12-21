import { Component, OnInit } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';

import { Breadcrumb } from 'src/app/_interfaces/breadcrumb';
import { SupplierService } from 'src/app/_services/supplier.service';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss']
})
export class SuppliersComponent implements OnInit {

  breadcrumbPages: Breadcrumb[];

  showInputSearch: boolean = false;
  orderby: string = 'name';
  desc: number = 0;
  search: string = '';

  public config: PaginationInstance = {
    id: 'suppliers-pagination',
    itemsPerPage: 1000,
    currentPage: 1,
  };

  suppliers: any[];

  constructor(private supplierService: SupplierService) { }

  ngOnInit(): void {
    this.loadSuppliers();
    this.initBreadcrumb();
  }

  initBreadcrumb() {
    this.breadcrumbPages = [
      { label: 'Início', route: '/home' },
      { label: 'Fornecedores', route: '/suppliers', active: true }
    ];
  }

  loadSuppliersPaginationMetadata() {
    this.supplierService.getSuppliersPaginationMetadata(this.config.itemsPerPage)
      .subscribe((res: any) => {
        this.config.totalItems = res.totalItems;
        this.loadSuppliers();
      });
  }

  loadSuppliers() {
    this.supplierService.getSuppliersPagination(this.search, this.desc, 
        this.config.itemsPerPage, this.config.currentPage, 
        this.orderby, true).subscribe(res => {
      this.suppliers = res;
    });
  }

  toggleOrderByTime() {
    document.getElementById('icon-sort').classList.remove('ic-sort-A-Z');
    document.getElementById('icon-sort').classList.remove('ic-sort-Z-A');
    document.getElementById('icon-sort').classList.add('ic-sort-A-Z');

    if (document.getElementById('icon-clock').classList.contains('ic-clock-arrow-left')) {
      document.getElementById('icon-clock').classList.remove('ic-clock-arrow-left');
      document.getElementById('icon-clock').classList.add('ic-clock-arrow-right');
      this.desc = 1;
    } else {
      document.getElementById('icon-clock').classList.remove('ic-clock-arrow-right');
      document.getElementById('icon-clock').classList.add('ic-clock-arrow-left');
      this.desc = 0;
    }
    this.orderby = 'date';
    this.loadSuppliers();
  }

  toggleOrderByTitle() {
    document.getElementById('icon-clock').classList.remove('ic-clock-arrow-left');
    document.getElementById('icon-clock').classList.remove('ic-clock-arrow-right');
    document.getElementById('icon-clock').classList.add('ic-clock-arrow-left');

    if (document.getElementById('icon-sort').classList.contains('ic-sort-A-Z')) {
      document.getElementById('icon-sort').classList.remove('ic-sort-A-Z');
      document.getElementById('icon-sort').classList.add('ic-sort-Z-A');
      this.desc = 1;
    } else {
      document.getElementById('icon-sort').classList.remove('ic-sort-Z-A');
      document.getElementById('icon-sort').classList.add('ic-sort-A-Z');
      this.desc = 0;
    }
    this.orderby = 'name';
    this.loadSuppliers();
  }

  changePage(pageNumber: number) {
    this.config.currentPage = pageNumber;
    this.loadSuppliers();
  }
}
