import { Component, OnInit } from '@angular/core';3

import { Breadcrumb } from 'src/app/_interfaces/breadcrumb';
import { Institute } from 'src/app/_models/institute';
import { ProjectService } from 'src/app/_services/project.service';

@Component({
  selector: 'app-accountability',
  templateUrl: './accountability.component.html',
  styleUrls: ['./accountability.component.scss']
})
export class AccountabilityComponent implements OnInit {

  public breadcrumbPages: Breadcrumb[];

  public institutes: Institute[];
  
  public search: string = '';
  public desc: number = 0;
  public orderby: string = 'name';

  public showInputSearch: boolean = false;

  constructor(
    public projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.initBreadcrumb();
    this.loadInstitutes();
  }

  initBreadcrumb() {
    this.breadcrumbPages = [
      { label: 'Início', route: '/home' },
      { label: 'Prestação de Contas', route: '/accountability', active: true }
    ];
  }

  loadInstitutes() {
    this.projectService.getProjectsGroupedCards(this.search, this.desc, this.orderby).subscribe(res => {
      this.institutes = res;
    });
  }

  toggleChev(attrId) {
    if (document.getElementById(attrId).classList.contains('ic-chev-down')) {
      document.getElementById(attrId).classList.remove('ic-chev-down');
      document.getElementById(attrId).classList.add('ic-chev-up');
    } else {
      document.getElementById(attrId).classList.remove('ic-chev-up');
      document.getElementById(attrId).classList.add('ic-chev-down');
    }
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
    this.loadInstitutes();
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
    this.loadInstitutes();
  }

}
