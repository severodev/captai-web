import { Component, OnInit } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';

import { Project } from 'src/app/_models/project';
import { ProjectService } from 'src/app/_services/project.service';

@Component({
  selector: 'app-removed-projects',
  templateUrl: './removed-projects.component.html',
  styleUrls: ['./removed-projects.component.scss']
})
export class RemovedProjectsComponent implements OnInit {

  removedProjects: Project[];

  public projectsPaginationcConfig: PaginationInstance = {
    id: 'removed-projects-pagination',
    itemsPerPage: 8,
    currentPage: 1,
  };

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.loadRemovedProjectsMetadata();
  }

  loadRemovedProjectsMetadata() {
    this.projectService.getProjectsPaginationMetadata(this.projectsPaginationcConfig.itemsPerPage, false)
    .subscribe((res: any) => {
      this.projectsPaginationcConfig.totalItems = res.totalItems;
      this.loadRemovedProjects('', 1, this.projectsPaginationcConfig.itemsPerPage, this.projectsPaginationcConfig.currentPage);
    });
  }

  loadRemovedProjects(search: string, desc: number, itemsPerPage: number, page: number) {
    this.projectService.getProjectsCards(search, desc, itemsPerPage, page, false)
    .subscribe((res: Project[]) => {
      this.removedProjects = res;
    });
  }

  changePage(pageNumber: number) {
    this.projectsPaginationcConfig.currentPage = pageNumber;
    this.loadRemovedProjects('', 1, this.projectsPaginationcConfig.itemsPerPage, this.projectsPaginationcConfig.currentPage);
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

}
