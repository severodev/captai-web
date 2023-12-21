import { Component, OnInit } from '@angular/core';
import { Breadcrumb } from 'src/app/_interfaces/breadcrumb';

@Component({
  selector: 'app-garbage',
  templateUrl: './garbage.component.html',
  styleUrls: ['./garbage.component.scss']
})
export class GarbageComponent implements OnInit {

  breadcrumbPages: Breadcrumb[];

  constructor() { }

  ngOnInit(): void {
    this.initBreadcrumb();
  }

  initBreadcrumb() {
    this.breadcrumbPages = [
      { label: 'Início', route: '/home' },
      { label: 'Lixeira', route: '/garbage', active: true }
    ];
  }

}
