import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Breadcrumb } from 'src/app/_interfaces/breadcrumb';

import { Project } from 'src/app/_models/project';
import { ProjectService } from 'src/app/_services/project.service';
import { ToastService } from 'src/app/_services/toast.service';
import { Expense } from '../../_models/expense';
import { InfoValuesContributions } from '../../_models/info-values-contributions';
import { ConfirmAlertService } from '../../_services/confirm-alert.service';
import { ContributionService } from '../../_services/contribution.service';
import { ExpenseService } from '../../_services/expense.service';
import { Observable, Observer, of } from 'rxjs';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

  public project: Project;
  public selectedExpense: Expense;
  
  public modeParam: string;
  public projectIdParam: number;
  public expenseIdParam: number;

  public breadcrumbPages: Breadcrumb[];
  public infoValues : InfoValuesContributions;
  public toShow: string = 'projectInfo';

  public showForm = 'info';

  constructor(
    private projectService: ProjectService,
    private expenseService: ExpenseService,
    private ts: ToastService,
    private route: ActivatedRoute,
    private router: Router,
    private confirmAlertService: ConfirmAlertService,
    private contributionService : ContributionService,
  ) { }

  ngOnInit(): void {
    this.modeParam = String(this.route.snapshot.paramMap.get('mode'));
    this.projectIdParam = Number(this.route.snapshot.paramMap.get('projectId'));
    this.expenseIdParam = Number(this.route.snapshot.paramMap.get('expenseId'));
    
    this.loadProject();
  }

  initBreadcrumb(project? : Project) {
    if (project) {
      this.breadcrumbPages = [
        { label: 'Início', route: '/home' },
        { label: 'Projetos', route: '/projects' },
        { label: project.name, route: '/project-details', active: true }
      ];
    } else {
      this.breadcrumbPages = [
        { label: 'Início', route: '/home' },
        { label: 'Projetos', route: '/projects' }
      ];
    }
  }

  setShowForm(event) {
    this.showForm = event;
  }

  loadProject(){
    this.projectService.getProjectDetailed(this.projectIdParam).subscribe((res) => {
      this.project = res;
      this.initBreadcrumb(res);
      this.contributionService.informationAboutContributions(this.projectIdParam).subscribe(data => {
        this.infoValues = data
      });
    });
  }

  delete() {
    this.confirmAlertService.initAlert("Isso implica na deleção do projeto em questão.").subscribe(event => {
      if(event) {
        this.projectService.deleteProject(this.project).subscribe((res) => {
          this.router.navigate(['/projects']);
          this.confirmAlertService.reset();
          this.ts.success('Ação concluída!', 'Projeto excluído com sucesso!');
        });
      }
    });
  }

  showProjectInfo() {
    this.toShow = 'projectInfo';
    this.selectedExpense = undefined;
    this.loadProject();
  }

  addTravel() {
    this.toShow = 'addTravel';
  }

  addExpense() {
    this.toShow = 'addExpense';
  }

  editExpense(expenseId: number): void {
    this.selectedExpense = this.project.expenses?.find(e => e.id == expenseId);
    if(!this.selectedExpense) {
      this.ts.success('Erro', 'Não foi possível editar o gasto.');
      this.selectedExpense = undefined;
      return;
    }
    if(this.selectedExpense?.budgetCategory?.code.includes('TRIP')){
      this.addTravel();
    } else {
      this.addExpense();
    }
  }

  deleteExpense(expenseId: number) {
    this.selectedExpense = this.project.expenses?.find(e => e.id == expenseId);
    if(!this.selectedExpense) {
      this.ts.success('Erro', 'Não foi possível excluir o gasto.');
      this.selectedExpense = undefined;
      return;
    }
    this.confirmAlertService.initAlert("Não será possível desfazer essa ação.").subscribe(event => {
      if(event) {
        this.expenseService.delete(this.selectedExpense.id).subscribe((res) => {
          if(!res){
            this.ts.success('Erro', 'Não foi possível excluir o gasto.');
            return;
          }
          this.loadProject();
          this.ts.success('Ação concluída!', 'Gasto excluído com sucesso!');
          this.selectedExpense = undefined;
          this.confirmAlertService.reset();
        });
      }
    });
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
