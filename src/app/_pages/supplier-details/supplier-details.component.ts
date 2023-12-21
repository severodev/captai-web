import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Breadcrumb } from 'src/app/_interfaces/breadcrumb';
import { Supplier } from 'src/app/_models/supplier';
import { ConfirmAlertService } from 'src/app/_services/confirm-alert.service';
import { SupplierService } from 'src/app/_services/supplier.service';
import { ToastService } from 'src/app/_services/toast.service';
import { Observable, Observer, of } from 'rxjs';

@Component({
  selector: 'app-supplier-details',
  templateUrl: './supplier-details.component.html',
  styleUrls: ['./supplier-details.component.scss']
})
export class SupplierDetailsComponent implements OnInit {

  supplierId: number;
  supplier: Supplier;
  breadcrumbPages: Breadcrumb[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private supplierService: SupplierService,
    private ts: ToastService,
    private confirmAlertService: ConfirmAlertService

  ) { }

  ngOnInit(): void {
    this.supplierId = Number(this.route.snapshot.paramMap.get('supplierId'));
    this.loadSupplier();
    this.initBreadcrumb();
  }

  initBreadcrumb() {
    if (this.supplier) {
      this.breadcrumbPages = [
        { label: 'Início', route: '/home' },
        { label: 'Fornecedores', route: '/suppliers' },
        { label: this.supplier.name, route: '/supplier-details', active: true }
      ];
    } else {
      this.breadcrumbPages = [
        { label: 'Início', route: '/home' },
        { label: 'Fornecedores', route: '/suppliers' }
      ];
    }
  }

  loadSupplier() {
    this.supplierService.getSupplier(this.supplierId).subscribe(res => {
      this.supplier = res;
      this.initBreadcrumb();
    });
  }

  confirmDelete() {
    this.confirmAlertService.initAlert("Isso implica no fim do contrato desse fornecedor.").subscribe(event => {
      if(event) {
        this.delete();
        this.confirmAlertService.reset();
      }
    });
  }

  delete() {
    this.supplierService.deleteSupplier(this.supplierId).subscribe(res => {
      this.ts.success('Ação concluída!', 'Fornecedor removido com sucesso.');
      this.router.navigate(['/suppliers']);
    });
  }

  addExpense() {
    this.router.navigate(['/supplier-expense', {supplierId: this.supplier.id }]);
  }
  
  canDeactivate(): Observable<boolean> {
    return new Observable((observer: Observer<boolean>) => {
      this.confirmAlertService.initAlert('Você irá perder todo o progresso feito.')
      .subscribe(
        (event) => {
          if (event) {
            this.confirmAlertService.reset();
            return of(observer.next(true));
          }
        }
      );
    });
  }
}
