import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Breadcrumb } from 'src/app/_interfaces/breadcrumb';
import { ConfirmAlertService } from 'src/app/_services/confirm-alert.service';
import { Observable, Observer, of } from 'rxjs';

@Component({
  selector: 'app-supplier-expense',
  templateUrl: './supplier-expense.component.html',
  styleUrls: ['./supplier-expense.component.scss']
})
export class SupplierExpenseComponent implements OnInit {

  public breadcrumbPages: Breadcrumb[];

  public supplierId: number;

  constructor(
    private route : ActivatedRoute,
    private router: Router,
    private confirmAlertService: ConfirmAlertService
  ) { }

  ngOnInit(): void {
    this.supplierId = Number(this.route.snapshot.paramMap.get('supplierId'));
    this.initBreadcrumb();
  }

  initBreadcrumb() {
    this.breadcrumbPages = [
      { label: 'Início', route: '/home' },
      { label: 'Fornecedores', route: '/suppliers' },
      { label: 'Incluir Gasto', route: '/supplier-expense', active: true }
    ];
  }

  cancel() {
    this.router.navigate(['/suppliers']);
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
