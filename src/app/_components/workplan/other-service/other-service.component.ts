import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, throttleTime } from 'rxjs/operators';
import { WorkplanCategory } from 'src/app/_enums/worplan-category.enum';
import { WorkplanItem } from 'src/app/_models/workplan-item';
import { ToastService } from 'src/app/_services/toast.service';
import { WorkplanService } from 'src/app/_services/workplan.service';

@Component({
  selector: 'app-other-service',
  templateUrl: './other-service.component.html',
  styleUrls: ['./other-service.component.scss']
})
export class OtherServiceComponent implements OnInit {

  @Input()
  projectId: number;

  @Input()
  workplanItem: WorkplanItem;

  @Output()
  finishEdition = new EventEmitter<any>();

  isEdition: boolean = false;

  @ViewChild("appFunds") appFunds: any;

  constructor(
    private workplanService: WorkplanService,
    private ts: ToastService
  ) { }

  ngOnInit(): void {
    if (!this.workplanItem) {
      this.resetWorkplan();
    } else {
      this.isEdition = true;
    }
  }

  resetWorkplan() {
    this.workplanItem = new WorkplanItem();
    // this.workplanItem.category = WorkplanCategory.SERVICE_OTHER;
    this.workplanItem.idProject = this.projectId;
  }

  addWorkplan() {
    this.workplanService.addWorkplanItem(this.workplanItem)
    .pipe(
      throttleTime(500),
      catchError(err => {
        console.error(err)
        this.ts.error('Ocorreu um erro!', err)
        return throwError(err)
    }))
    .subscribe((res) => {
      this.ts.success('Ação concluída!', 'O gasto foi salvo com sucesso.');
      this.resetWorkplan();
      this.finishEdition.emit();
    });
  }

  updateWorkplanItem() {
    this.workplanService.editWorkplanItem(this.workplanItem).subscribe((res) => {
      this.ts.success('Ação concluída!', 'Os dados foram salvos com sucesso.');
      this.finishEdition.emit();
    });
  }

  cancel() {
    this.finishEdition.emit();
  }

}
