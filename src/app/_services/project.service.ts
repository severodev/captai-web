import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { ProjectDto } from '../_dtos/project-dto';
import { Project } from '../_models/project';
import { ProjectMember } from '../_models/project-member';
import { Expense } from '../_models/expense';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private projectDto = new ProjectDto();

  private draftProjectKey = 'draft-project';

  constructor(private http: HttpClient) { }

  getProjectsPaginationMetadata(itemsPerPage: number, isActive: boolean=true) {
    let url = `${environment.apiUrl}/projects/pagination`;

    const params = new HttpParams()
    .set('itemsPerPage', itemsPerPage.toString())
    .set('isActive', isActive.toString());

    return this.http.get(url, {params});
  }

  getProjectsCards(search: string, desc: number, itemsPerPage: number, page: number, isActive: boolean=true) {
    let url = `${environment.apiUrl}/projects/cards`;

    const params = new HttpParams()
    .set('search', search)
    .set('desc', desc.toString())
    .set('itemsPerPage', itemsPerPage.toString())
    .set('page', page.toString())
    .set('isActive', isActive.toString());

    return this.http.get(url, {params}).pipe(map((data: any) => {
      return data.map(d => this.projectDto.convertResponseToProjectCard(d));
    }));
  }

  getProjectsGroupedCards(search: string, desc: number, orderby: string) {
    let url = `${environment.apiUrl}/projects/groupedCards`;

    const params = new HttpParams()
    .set('search', search)
    .set('desc', desc.toString())
    .set('orderby', orderby);

    return this.http.get(url, {params}).pipe(map((data: any) => {
      return data.map(d => this.projectDto.convertResponseToInstituteProjectCards(d));
    }));
  }

  getProjectsDropdown(projectId: number = undefined) {
    let url = `${environment.apiUrl}/projects/dropdown`;

    let params = new HttpParams();
    if(projectId)
      params = params.set("filters[institute]", projectId.toString());

    return this.http.get(url, { params }).pipe(map((data: any) => {
      return data.map(d => this.projectDto.convertResponseToProjectDropdown(d));
    }));
  }

  getProjectDetailed(projectId: number, expenseStatus?: String) {
    let url = `${environment.apiUrl}/projects/${projectId}/${expenseStatus}`;

    return this.http.get(url).pipe(map((data: any) => {
      return data && this.projectDto.convertResponseToProject(data);
    }));
  }

  createProject(project: Project) {
    let url = `${environment.apiUrl}/projects`;
    const jsonProject = this.projectDto.convertProjectToJSON(project);

    return this.http.post(url, jsonProject);
  }

  saveProjectLocal(project: Project) {
    return localStorage.setItem(this.draftProjectKey, JSON.stringify(project));
  }

  getDraftProject(): Project {
    const data = JSON.parse(localStorage.getItem(this.draftProjectKey));
    return this.projectDto.convertDraftToProject(data);
  }

  clearDraftProject() {
    return localStorage.removeItem(this.draftProjectKey);
  }

  hasDraftProject(): boolean {
    return (localStorage.getItem(this.draftProjectKey) !== null);
  }

  deleteFromProject(project: Project, member: ProjectMember) {
    let url = `${environment.apiUrl}/projects/${project.id}/member/${member.collaboratorId}`;
    return this.http.delete(url);
  }

  restoreProject(id) {
    let url = `${environment.apiUrl}/projects/${id}/activate`;
    let json = JSON.stringify({id: id});

    return this.http.post(url, json);
  }

  updateProject(project: Project) {
    let url = `${environment.apiUrl}/projects/${project.id}`;
    const jsonProject = this.projectDto.convertProjectToJSON(project);

    return this.http.put(url, jsonProject);
  }

  deleteProject(project: Project) {
    let url = `${environment.apiUrl}/projects/${project.id}`;
    return this.http.delete(url);
  }

  findInstituteByProjectId(id: number) {
    let url = `${environment.apiUrl}/projects/findInstituteByProjectId/${id}`;
    return this.http.get(url);
  }

}
