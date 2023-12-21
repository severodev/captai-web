import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { Supplier } from 'src/app/_models/supplier';
import { SupplierService } from 'src/app/_services/supplier.service';

import { ToastService } from 'src/app/_services/toast.service';

@Component({
  selector: 'app-supplier-info',
  templateUrl: './supplier-info.component.html',
  styleUrls: ['./supplier-info.component.scss']
})
export class SupplierInfoComponent implements OnInit {

  @Input()
  supplier: Supplier;

  canEdit: boolean = false;

  @ViewChild('appSupplier') appSupplier: any;

  constructor(
    private ts: ToastService,
    private supplierService: SupplierService
  ) { }

  ngOnInit(): void {
  }

  saveSupplier() {
    this.appSupplier;
    this.supplierService.updateSupplier(this.supplier).subscribe((res) => {
      this.ts.success('Ação concluída!', 'Alterações salvas com sucesso!');
      this.canEdit = false;
    });
  }

}
