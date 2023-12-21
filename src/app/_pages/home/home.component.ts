import { Component, OnInit } from '@angular/core';

import { Breadcrumb } from 'src/app/_interfaces/breadcrumb';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  breadcrumbPages: Breadcrumb[];

  constructor() { }

  ngOnInit(): void {
    this.initBreadcrumb();
  }

  initBreadcrumb() {
    this.breadcrumbPages = [
      { label: 'Início', route: '/home' }
    ];
  }

}
