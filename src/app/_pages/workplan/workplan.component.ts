import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Observer, of } from 'rxjs';
import { Breadcrumb } from 'src/app/_interfaces/breadcrumb';
import { InfoValuesContributions } from 'src/app/_models/info-values-contributions';
import { Project } from 'src/app/_models/project';
import { WorkplanItem } from 'src/app/_models/workplan-item';
import { ConfirmAlertService } from 'src/app/_services/confirm-alert.service';
import { ContributionService } from 'src/app/_services/contribution.service';
import { ProjectService } from 'src/app/_services/project.service';
import { WorkplanService } from 'src/app/_services/workplan.service';

@Component({
  selector: 'app-workplan',
  templateUrl: './workplan.component.html',
  styleUrls: ['./workplan.component.scss']
})
export class WorkplanComponent implements OnInit {

  breadcrumbPages: Breadcrumb[];

  activeTab: string = 'addCost';
  projectId: number;
  public project: Project;
  public infoValues : InfoValuesContributions;
  projectWorkplanItems: WorkplanItem[];

  constructor(
    private workplanService: WorkplanService,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private contributionService : ContributionService,
    private confirmAlertService: ConfirmAlertService
  ) { }

  ngOnInit(): void {
    this.projectId = Number(this.route.snapshot.paramMap.get('projectId'));
    this.loadProject();
    this.loadProjectWorkplan();
  }

  initBreadcrumb(project? : Project) {
    if (project) {
      this.breadcrumbPages = [
        { label: 'Início', route: '/home' },
        { label: 'Projetos', route: '/projects' },
        { label: project.name, route: '/project-details', params: {projectId : project.id } },
        { label: 'Plano de Trabalho', route: '/workplan', active: true }
      ];
    } else {
      this.breadcrumbPages = [
        { label: 'Início', route: '/home' },
        { label: 'Plano de Trabalho', route: '/workplan' }
      ];
    }
  }

  loadProjectWorkplan() {
    this.workplanService.getProjectWorkplan(this.projectId).subscribe((res) => {
      this.projectWorkplanItems = res;
    });
  }

  loadProject(){
    this.projectService.getProjectDetailed(this.projectId).subscribe((res) => {
      this.project = res;
      this.initBreadcrumb(res);
      this.contributionService.informationAboutContributions(this.projectId).subscribe(data => {
        this.infoValues = data
      });
    });
  }

  save() {

  }

  delete() {

  }

  saveAsDraft() {

  }

  showAddCostTab() {
    this.activeTab = 'addCost';
  }

  showAllCostsTab() {
    this.activeTab = 'allCosts';
  }

  canDeactivate(): Observable<boolean> {
    return new Observable((observer: Observer<boolean>) => {
      this.confirmAlertService.initAlert('Você irá perder todo o progresso feito.')
      .subscribe(
        (event) => {
          if (event) {
            this.confirmAlertService.reset();
            return of(observer.next(true));
          }
        }
      );
    });
  }
}
