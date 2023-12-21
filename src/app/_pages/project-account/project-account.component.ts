import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Breadcrumb } from 'src/app/_interfaces/breadcrumb';
import { InfoValuesContributions } from 'src/app/_models/info-values-contributions';
import { Project } from 'src/app/_models/project';
import { ContributionService } from 'src/app/_services/contribution.service';
import { ProjectService } from 'src/app/_services/project.service';
import { ToastService } from 'src/app/_services/toast.service';

@Component({
  selector: 'app-project-account',
  templateUrl: './project-account.component.html',
  styleUrls: ['./project-account.component.scss']
})
export class ProjectAccountComponent implements OnInit {
  public projectId: number;
  public project: Project;

  public breadcrumbPages: Breadcrumb[];
  public infoValues : InfoValuesContributions;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private ts: ToastService,
    private contributionService : ContributionService,
  ) { }

  ngOnInit(): void {
    this.projectId = Number(this.route.snapshot.paramMap.get('projectId'));
    this.loadProject();
    this.initBreadcrumb();
  }

  loadProject(){
    this.projectService.getProjectDetailed(this.projectId).subscribe((res) => {
      this.project = res;
      this.contributionService.informationAboutContributions(this.projectId).subscribe(data => {
        this.infoValues = data;
      });
    });
  }

  public toggleChev(attrId) {
    if (document.getElementById(attrId).classList.contains('ic-chev-down')) {
      document.getElementById(attrId).classList.remove('ic-chev-down');
      document.getElementById(attrId).classList.add('ic-chev-up');
    } else {
      document.getElementById(attrId).classList.remove('ic-chev-up');
      document.getElementById(attrId).classList.add('ic-chev-down');
    }
  }

  cardChangesContributions(change : any){
    this.contributionService.informationAboutContributions(this.projectId).subscribe(data => {
      this.infoValues = data;
    });
  }

  private initBreadcrumb(): void {
    this.breadcrumbPages = [
      { label: 'Início', route: '/home' },
      { label: 'Prestação de Contas', route: '/accountability' },
      { label: 'Prestação de Contas do Projeto', route: '/project-account', active: true }
    ];
  }
}
