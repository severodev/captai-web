import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EmploymentRelationship } from 'src/app/_models/employment-relationship';
import { Institute } from 'src/app/_models/institute';
import { Project } from 'src/app/_models/project';
import { CollaboratorService } from 'src/app/_services/collaborator.service';
import { InstituteService } from 'src/app/_services/institute.service';
import { ProjectService } from 'src/app/_services/project.service';

@Component({
  selector: 'app-collaborator-filter-options',
  templateUrl: './collaborator-filter-options.component.html',
  styleUrls: ['./collaborator-filter-options.component.scss']
})
export class CollaboratorFilterOptionsComponent implements OnInit {

  @Output()
  public applyFilterEvent = new EventEmitter<any>();


  public employmentRelationshipsDropdown: EmploymentRelationship[];
  public institutesDropdown: Institute[];
  public projectsDropdown: Project[];

  public filters: {
    category: string;
    categoryCode: string;
    options: { value: any; name: string; }[];
  }[];

  selectedFilters = {};

  constructor(private projectService: ProjectService,
    private instituteService: InstituteService,
    private collaboratorService: CollaboratorService) { }

  ngOnInit(): void {
    this.loadFilters();
  }

  async loadFilters() {
    await this.loadInstitutes();
    await this.loadProjects();
    await this.loadEmploymentRelationship();

    this.filters = [
      {
        category: 'Estado',
        categoryCode: 'isActive',
        options: [
          { value: true, name: 'Colaboradores Ativos' },
          { value: false, name: 'Colaboradores Inativos' }
        ]
      },
      {
        category: 'Vínculo',
        categoryCode: 'er',
        options: this.employmentRelationshipsDropdown.map((item => {
          return {value: item.id, name: item.name};
        }))
      },
      {
        category: 'Instituto',
        categoryCode: 'institute',
        options: this.institutesDropdown.map((item => {
          return {value: item.id, name: item.name};
        }))
      },
      {
        category: 'Projeto',
        categoryCode: 'project',
        options: this.projectsDropdown.map((item => {
          return {value: item.id, name: item.name};
        }))
      },
    ]
  }

  async loadProjects() {
    this.projectsDropdown = await this.projectService.getProjectsDropdown().toPromise();
  }

  async loadInstitutes() {
    this.institutesDropdown = await this.instituteService.getInstitutesDropdown().toPromise();
  }

  async loadEmploymentRelationship() {
    this.employmentRelationshipsDropdown = await this.collaboratorService.getEmploymentRelationshipDropdown().toPromise();
  }

  updateFilters(categoryCode: string, option: any) {
    if (this.selectedFilters[categoryCode] && Array.isArray(this.selectedFilters[categoryCode])) {
      if (this.selectedFilters[categoryCode].includes(option.value)) {
        const idx = this.selectedFilters[categoryCode].indexOf(option.value);
        return this.selectedFilters[categoryCode].splice(idx, 1);
      } else {
        this.selectedFilters[categoryCode].push(option.value) //todo: não está removendo o filtro
      }
    } else {
      this.selectedFilters[categoryCode] = [option.value]
    }
  }

  applyFilter() {
    this.applyFilterEvent.emit(this.selectedFilters);
  }

}
