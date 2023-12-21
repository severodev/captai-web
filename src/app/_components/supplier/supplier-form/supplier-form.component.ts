import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { Supplier } from 'src/app/_models/supplier';
import { BudgetCategory } from 'src/app/_models/budget-category';

import { SupplierService } from 'src/app/_services/supplier.service';
import { BankService } from 'src/app/_services/bank.service';
import { LocationService } from 'src/app/_services/location.service';
import { Bank } from 'src/app/_models/bank';
import { State } from 'src/app/_models/state';
import { City } from 'src/app/_models/city';

@Component({
  selector: 'app-supplier-form',
  templateUrl: './supplier-form.component.html',
  styleUrls: ['./supplier-form.component.scss']
})
export class SupplierFormComponent implements OnInit {

  private _supplier: Supplier;

  @Input()
  set supplier(supplier: Supplier) {
    this._supplier = supplier;
    if(supplier && supplier.state)
      this.loadCitiesDropdown(supplier.state.toString());
  }
  
  get supplier(): Supplier {
    return this._supplier;
  };

  @Input()
  canEdit: boolean = true;

  budgetCategories: BudgetCategory[];
  banksDropdown: Bank[];
  statesDropdown: State[];
  citiesDropdown: City[];

  @ViewChild("supplierForm") supplierForm: any;

  constructor(
    private supplierService: SupplierService,
    private bankService: BankService,
    private locationService: LocationService
  ) { }

  ngOnInit(): void {
    this.loadBudgetCategories();
    this.loadBanksDropdown();
    this.loadStatesDropdown();
  }

  loadBudgetCategories() {
    this.supplierService.getBudgetCategoriesDropdown().subscribe( res => {
      this.budgetCategories = res;
    });
  }

  loadBanksDropdown() {
    this.bankService.getBanksDropdown().subscribe( res => {
      this.banksDropdown = res;
    });
  }

  loadStatesDropdown() {
    this.locationService.getStatesDropdown().subscribe( res => {
      this.statesDropdown = res;
    });
  }

  loadCitiesDropdown(stateId: string) {
    this.locationService.getCitiesDropdown(stateId).subscribe( res => {
      this.citiesDropdown = res;
    });
  }

}
