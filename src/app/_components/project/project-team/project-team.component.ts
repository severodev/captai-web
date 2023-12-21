import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Collaborator } from 'src/app/_models/collaborator';
import { Project } from 'src/app/_models/project';
import { ProjectMember } from 'src/app/_models/project-member';
import { CollaboratorService } from 'src/app/_services/collaborator.service';
import { ProjectService } from 'src/app/_services/project.service';

@Component({
  selector: 'app-project-team',
  templateUrl: './project-team.component.html',
  styleUrls: ['./project-team.component.scss']
})
export class ProjectTeamComponent implements OnInit {

  @Input()
  project: Project;

  @Input()
  canEdit: boolean = false;

  activeForm = "collaborators";

  public allCollaborators: Collaborator[];

  public selectedCollaborator: Collaborator;
  public jobTitle: string = '';

  public viewSort: string = 'grid';

  constructor(
    private router: Router,
    private collaboratorService: CollaboratorService,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.loadAllCollaborators();
  }

  loadAllCollaborators() {
    this.collaboratorService.getCollaboratorsDropdown().subscribe((res: Collaborator[]) => {
      this.allCollaborators = res;
    });
  }

  selectCollaborator(collaborator) {
    this.selectedCollaborator = collaborator;
  }

  addMember() {
    if (this.jobTitle.trim() !== '') {
      let projectMember = new ProjectMember();
      if (this.selectedCollaborator) {
        projectMember.collaboratorId = this.selectedCollaborator.id;
        projectMember.collaboratorName = this.selectedCollaborator.name;

        projectMember.jobTitle = this.jobTitle;
        this.project.projectMembers.push(projectMember);

        this.selectedCollaborator = null;
        this.jobTitle = '';
      }
    }
  }

  download() {
    let filter = { 
      project: this.project.id.toLocaleString(),
      er: '',
      institute: ''
    };

    this.collaboratorService.getCollaboratorsCSV('', 0, 500, 1, 'name', true, filter).subscribe(
      (data: any) => {
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob([data], { type: 'text/csv' }));
        downloadLink.setAttribute('download', 'colaboradores.csv');
        document.body.appendChild(downloadLink);
        downloadLink.click();
      }
    );
  }

  goToDetails(member: ProjectMember) {
    this.router.navigate(['/collaborator-details', { collaboratorId: member.collaboratorId }]);
  }

  removeFromProject(member: ProjectMember) {
    if(member.projectMemberId)
      this.projectService.deleteFromProject(this.project, member).subscribe((res: Collaborator[]) => {
        this.project.projectMembers.splice(this.project.projectMembers.indexOf(member), 1);
      });
    else
      this.project.projectMembers.splice(this.project.projectMembers.indexOf(member), 1);
  }

  loadImage(member: ProjectMember) {
    if (member.collaboratorImage === null || member.collaboratorImage === undefined) {
      return '../../../../assets/images/man.png';
    } else {
      return member.collaboratorImage;
    }
  }

  setShowForm(tag: string) {
    this.activeForm = tag;
  }

}
