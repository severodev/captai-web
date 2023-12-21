import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Project } from 'src/app/_models/project';
import { WorkplanItem } from 'src/app/_models/workplan-item';
import { ProjectService } from 'src/app/_services/project.service';
import { ToastService } from 'src/app/_services/toast.service';
import { WorkplanService } from 'src/app/_services/workplan.service';

@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.scss']
})
export class ProjectInfoComponent implements AfterViewInit {

  @Input()
  project: Project;

  @Input()
  public activeForm: string;

  @Output()
  showForm = new EventEmitter<string>();

  @Output() emitEditToDetails: EventEmitter<number> = new EventEmitter();
  @Output() emitDeleteToDetails: EventEmitter<number> = new EventEmitter();

  public projectWorkplanItems: WorkplanItem[];

  public canEdit: boolean = false;

  @Input()
  public editExpense: (expenseId: number) => void;

  @Input()
  public deleteExpense: (expenseId: number) => void;

  @ViewChild('appInfo') appInfo: any;

  constructor(
    private projectService: ProjectService,
    private workplanService: WorkplanService,
    private ts: ToastService,
    private cdRef : ChangeDetectorRef
  ) {
  }
  
  ngAfterViewInit(): void {
    this.loadProjectWorkplan();
  }

  setShowForm(tag) {
    this.activeForm = tag;
    this.showForm.emit(tag);
  }

  loadProjectWorkplan() {
    if (this.project) {
      this.workplanService.getProjectWorkplan(this.project.id).subscribe((res) => {
        this.projectWorkplanItems = res;
      });
    }
    this.cdRef.detectChanges();
  }

  saveEditions() {
    this.canEdit = false;
    this.projectService.updateProject(this.project).subscribe((res) => {
      this.ts.success('Ação concluída!', 'Alterações salvas com sucesso!');
    });
  }

}
