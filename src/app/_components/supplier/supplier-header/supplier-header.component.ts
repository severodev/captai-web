import { Component, Input, OnInit } from '@angular/core';
import { Supplier } from 'src/app/_models/supplier';

@Component({
  selector: 'app-supplier-header',
  templateUrl: './supplier-header.component.html',
  styleUrls: ['./supplier-header.component.scss']
})
export class SupplierHeaderComponent implements OnInit {

  @Input()
  supplier: Supplier;

  constructor() { }

  ngOnInit(): void {
  }

}
