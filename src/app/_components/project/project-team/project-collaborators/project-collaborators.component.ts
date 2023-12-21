import { Component, Input } from '@angular/core';
import { ProjectMember } from 'src/app/_models/project-member';

@Component({
  selector: 'app-project-collaborators',
  templateUrl: './project-collaborators.component.html',
  styleUrls: ['./project-collaborators.component.scss'],
})
export class ProjectCollaboratorsComponent {
  @Input() members: ProjectMember[];
  @Input() viewSort;

  constructor() {}
}
