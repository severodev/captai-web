import { ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectMember } from 'src/app/_models/project-member';

@Component({
  selector: 'app-collaborator-short-card',
  templateUrl: './collaborator-short-card.component.html',
  styleUrls: ['./collaborator-short-card.component.scss']
})
export class CollaboratorShortCardComponent {

  @Input() member: ProjectMember;

  constructor(private router: Router) { }

  goToDetails(member: ProjectMember) {
    this.router.navigate(['/collaborator-details', { collaboratorId: member.collaboratorId }]);
  }

  loadImage(member: ProjectMember) {
    if (member.collaboratorImage === null || member.collaboratorImage === undefined) {
      return '../../../../assets/images/man.png';
    } else {
      return member.collaboratorImage;
    }
  }

}
