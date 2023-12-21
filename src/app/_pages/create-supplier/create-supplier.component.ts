import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Breadcrumb } from 'src/app/_interfaces/breadcrumb';
import { Supplier } from 'src/app/_models/supplier';
import { SpaceValidatorService } from 'src/app/_services/space-validator.service';
import { SupplierService } from 'src/app/_services/supplier.service';
import { ToastService } from 'src/app/_services/toast.service';
import { Observable, Observer, of } from 'rxjs';
import { ConfirmAlertService } from 'src/app/_services/confirm-alert.service';

@Component({
  selector: 'app-create-supplier',
  templateUrl: './create-supplier.component.html',
  styleUrls: ['./create-supplier.component.scss']
})
export class CreateSupplierComponent implements OnInit {

  breadcrumbPages: Breadcrumb[];
  supplier: Supplier;

  @ViewChild('appSupplier') appSupplier: any;

  constructor(
    private supplierService: SupplierService,
    private router: Router,
    private spaceValidatorService : SpaceValidatorService,
    private ts: ToastService,
    private confirmAlertService: ConfirmAlertService) { }

  ngOnInit(): void {
    this.initBreadcrumb();
    this.initSupplier();
  }

  initBreadcrumb() {
    this.breadcrumbPages = [
      { label: 'Início', route: '/home' },
      { label: 'Fornecedores', route: '/suppliers', active: false },
      { label: 'Novo Fornecedor', route: '/create-supplier', active: true }
    ];
  }

  initSupplier() {
    this.supplier = new Supplier();
  }

  createSupplier() {
    if(this.spaceValidatorService.noWhitespaceValidator(this.supplier.website)){
      this.ts.error('Existem campos vazios ou com apenas espaços.', 'Houve uma falha ao adicionar Fornecedor.')
      delete this.supplier.website;
    }else{
      this.supplierService.createSupplier(this.supplier).subscribe(res => {
        this.initSupplier();
        this.router.navigate(['/suppliers']);
        this.ts.success('Ação concluída!', 'Fornecedor cadastrado com sucesso! :D');
      }), (err) => {
        this.ts.error('Ops!', 'Houve algum erro na sua solicitação!');
      };
    }    
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
