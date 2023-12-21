import { Component, OnInit } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';

import { Collaborator } from 'src/app/_models/collaborator';
import { CollaboratorService } from 'src/app/_services/collaborator.service';

@Component({
  selector: 'app-removed-collaborators',
  templateUrl: './removed-collaborators.component.html',
  styleUrls: ['./removed-collaborators.component.scss']
})
export class RemovedCollaboratorsComponent implements OnInit {

  removedCollaborators: Collaborator[];

  public collaboratorsPaginationcConfig: PaginationInstance = {
    id: 'removed-collaborators-pagination',
    itemsPerPage: 5,
    currentPage: 1,
  };

  constructor(private collaboratorService: CollaboratorService) { }

  ngOnInit(): void {
    this.loadRemovedCollaboratorsMetadata();
  }

  loadRemovedCollaboratorsMetadata() {
    this.collaboratorService.getCollaboratorsPaginationMetadata(this.collaboratorsPaginationcConfig.itemsPerPage, '', false)
    .subscribe((res: any) => {
      this.collaboratorsPaginationcConfig.totalItems = res.totalItems;
      this.loadRemovedCollaborators('', 1, this.collaboratorsPaginationcConfig.itemsPerPage, this.collaboratorsPaginationcConfig.currentPage);
    });
  }

  loadRemovedCollaborators(search: string, desc: number, itemsPerPage: number, page: number) {
    this.collaboratorService.getCollaboratorsCards(search, desc, itemsPerPage, page, '', false)
    .subscribe((res: Collaborator[]) => {
      this.removedCollaborators = res;
    })
  }

  changePage(pageNumber: number) {
    this.collaboratorsPaginationcConfig.currentPage = pageNumber;
    this.loadRemovedCollaborators('', 1, this.collaboratorsPaginationcConfig.itemsPerPage, this.collaboratorsPaginationcConfig.currentPage);
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
