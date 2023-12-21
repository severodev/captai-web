import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Supplier } from 'src/app/_models/supplier';

import { SupplierService } from 'src/app/_services/supplier.service';
import { ToastService } from 'src/app/_services/toast.service';

@Component({
  selector: 'app-supplier-card',
  templateUrl: './supplier-card.component.html',
  styleUrls: ['./supplier-card.component.scss']
})
export class SupplierCardComponent implements OnInit {

  @Input()
  supplier: Supplier;

  @Input()
  isActive: boolean = true;

  @Output()
  public restoreEvent = new EventEmitter<any>();

  constructor(
    private ts: ToastService,
    private router: Router,
    private supplierService: SupplierService
  ) { }

  ngOnInit(): void {
    console.table(this.supplier);
  }

  addExpense() {
    this.router.navigate(['/supplier-expense', { supplierId: this.supplier.id }]);
  }

  goToDetails() {
    this.router.navigate(['/supplier-details', {supplierId: this.supplier.id }]);
  }

  restore() {
    this.supplierService.restoreSupplier(this.supplier.id).subscribe(res => {
      this.ts.success('Ação concluída!', 'Fornecedor restaurado com sucesso! :D');
      this.restoreEvent.emit();
    });
  }

}
