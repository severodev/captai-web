import { Component, OnInit } from '@angular/core';

import { Breadcrumb } from 'src/app/_interfaces/breadcrumb';
import { Institute } from 'src/app/_models/institute';
import { ProjectService } from 'src/app/_services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  breadcrumbPages: Breadcrumb[];

  institutes: Institute[];

  showInputSearch: boolean = false;

  orderby: string = 'name';
  desc: number = 0;
  search: string = '';

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.initBreadcrumb();
    this.loadInstitutes();
  }

  initBreadcrumb() {
    this.breadcrumbPages = [
      { label: 'Início', route: '/home' },
      { label: 'Projetos', route: '/projects', active: true }
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
