import { Component, OnInit } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';

import { ProjectService } from 'src/app/_services/project.service';

@Component({
  selector: 'app-projects-small-list',
  templateUrl: './projects-small-list.component.html',
  styleUrls: ['./projects-small-list.component.scss']
})
export class ProjectsSmallListComponent implements OnInit {

  public projects = [];

  public config: PaginationInstance = {
    id: 'projects-small-pagination',
    itemsPerPage: 4,
    currentPage: 1,
  };

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.loadProjectsPaginationMetadata();
  }

  loadProjectsPaginationMetadata() {
    this.projectService.getProjectsPaginationMetadata(this.config.itemsPerPage)
      .subscribe((res: any) => {
        this.config.totalItems = res.totalItems;
        this.loadProjects('', 1, this.config.itemsPerPage, this.config.currentPage);
      });
  }

  loadProjects(search: string, desc: number, itemsPerPage: number, page: number) {
    this.projectService.getProjectsCards(search, desc, itemsPerPage, page)
      .subscribe((res) => {
        this.projects = res;
      });
  }

  changePage(pageNumber: number) {
    this.config.currentPage = pageNumber;
    this.loadProjects('', 1, this.config.itemsPerPage, this.config.currentPage);
  }

}
