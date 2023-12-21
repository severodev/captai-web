import { Component, OnInit } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';

import { CollaboratorService } from 'src/app/_services/collaborator.service';

@Component({
  selector: 'app-collaborators-small-list',
  templateUrl: './collaborators-small-list.component.html',
  styleUrls: ['./collaborators-small-list.component.scss']
})
export class CollaboratorsSmallListComponent implements OnInit {

  public collaborators = [];

  public config: PaginationInstance = {
    id: 'collaborators-small-pagination',
    itemsPerPage: 6,
    currentPage: 1,
  };

  constructor(private collaboratorService: CollaboratorService) {}

  ngOnInit(): void {
    this.loadCollaboratoratorsPaginationMetadata();
  }

  loadCollaboratoratorsPaginationMetadata() {
    this.collaboratorService
    .getCollaboratorsPaginationMetadata(this.config.itemsPerPage, '')
    .subscribe((res: any) => {
      this.config.totalItems = res.totalItems;
      this.loadCollaborators();
    });
  }

  loadCollaborators() {
    this.collaboratorService
    .getCollaboratorsCards('', 1, this.config.itemsPerPage, this.config.currentPage, '')
    .subscribe((res) => {
      this.collaborators = res;
    });
  }

  changePage(pageNumber: number) {
    this.config.currentPage = pageNumber;
    this.loadCollaborators();
  }

}
