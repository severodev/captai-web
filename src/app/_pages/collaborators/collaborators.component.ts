import { Component, OnInit } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';

import { Collaborator } from 'src/app/_models/collaborator';
import { Breadcrumb } from 'src/app/_interfaces/breadcrumb';
import { CollaboratorService } from 'src/app/_services/collaborator.service';
import { ToastService } from 'src/app/_services/toast.service';

@Component({
  selector: 'app-collaborators',
  templateUrl: './collaborators.component.html',
  styleUrls: ['./collaborators.component.scss']
})
export class CollaboratorsComponent implements OnInit {

  breadcrumbPages: Breadcrumb[];

  collaborators: Collaborator[];

  showInputSearch: boolean = false;

  orderby: string = 'name';
  viewSort: string = 'grid';
  desc: number = 0;
  search: string = '';
  isActive: boolean = true;
  filter = {
    institute: '',
    project: '',
    er: '',
  };

  public config: PaginationInstance = {
    id: 'collaborators-pagination',
    itemsPerPage: 36,
    currentPage: 1,
  };

  constructor(private collaboratorService: CollaboratorService, private ts: ToastService) { }

  ngOnInit(): void {
    this.initBreadcrumb();
    this.loadCollaboratoratorsPaginationMetadata();
  }

  initBreadcrumb() {
    this.breadcrumbPages = [
      { label: 'Início', route: '/home' },
      { label: 'Colaboradores', route: '/collaborators', active: true }
    ];
  }

  loadCollaboratoratorsPaginationMetadata() {
    this.collaboratorService
    .getCollaboratorsPaginationMetadata(
      this.config.itemsPerPage,
      this.search,
      this.isActive,
      this.filter)
    .subscribe((res: any) => {
      this.config.totalItems = res.totalItems;
      this.loadCollaborators();
    });
  }

  loadCollaborators() {
    this.collaboratorService
    .getCollaboratorsCards(
      this.search,
      this.desc,
      this.config.itemsPerPage,
      this.config.currentPage,
      this.orderby,
      this.isActive,
      this.filter )
    .subscribe((res) => {
      this.collaborators = res;
    });
  }

  loadCollaboratorsFiltered() {
    this.config.currentPage = 1;
    this.loadCollaboratoratorsPaginationMetadata();
  }

  changePage(pageNumber: number) {
    this.config.currentPage = pageNumber;
    this.loadCollaborators();
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
    this.loadCollaboratoratorsPaginationMetadata();
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
    this.loadCollaboratoratorsPaginationMetadata();
  }

  toggleViewSort() {
    if (document.getElementById('icon-view').classList.contains('ic-view-sort-list')) {
      this.viewSort = 'list';
      document.getElementById('icon-view').classList.remove('ic-view-sort-list');
      document.getElementById('icon-view').classList.add('ic-view-sort-grid');
    } else {
      this.viewSort = 'grid';
      document.getElementById('icon-view').classList.remove('ic-view-sort-grid');
      document.getElementById('icon-view').classList.add('ic-view-sort-list');
    }
  }

  download() {
    this.collaboratorService.getCollaboratorsCSV(this.search, this.desc, this.config.itemsPerPage,
      this.config.currentPage, this.orderby, this.isActive, this.filter).subscribe(
        (data: any) => {
          let downloadLink = document.createElement('a');
          downloadLink.href = window.URL.createObjectURL(new Blob([data], { type: 'text/csv' }));
          downloadLink.setAttribute('download', 'colaboradores.csv');
          document.body.appendChild(downloadLink);
          downloadLink.click();
        }
      );
  }

  applyFilter(filters: any) {
    const keys = Object.keys(filters);
    this.config.currentPage = 1;

    if (keys.includes('institute')) {
      this.filter.institute = filters.institute.toLocaleString();
    }
    if (keys.includes('project')) {
      this.filter.project = filters.project.toLocaleString();
    }
    if (keys.includes('er')) {
      this.filter.er = filters.er.toLocaleString();
    }
    if (keys.includes('isActive')) {
      this.isActive = filters.isActive;
    }
    this.loadCollaboratoratorsPaginationMetadata();
  }

}
