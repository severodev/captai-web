import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Project } from 'src/app/_models/project';
import { WorkplanItem } from 'src/app/_models/workplan-item';
import { ToastService } from 'src/app/_services/toast.service';
import { WorkplanService } from 'src/app/_services/workplan.service';

@Component({
  selector: 'app-all-costs',
  templateUrl: './all-costs.component.html',
  styleUrls: ['./all-costs.component.scss']
})
export class AllCostsComponent implements AfterViewInit, OnChanges {

  @Output()
  updateWorplanItems = new EventEmitter<any>();

  @Input()
  projectWorkplanItems: WorkplanItem[];

  @Input()
  project: Project;

  modalRef: BsModalRef;
  selectedCost: any;

  totalPlannedItens: number = 0;

  constructor(
    private modalService: BsModalService,
    private workplanService: WorkplanService,
    private ts: ToastService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.projectWorkplanItems && this.projectWorkplanItems.length > 0){
      this.totalPlannedItens = 0
      for(let item of this.projectWorkplanItems){
        this.totalPlannedItens += +item.value;
      }
    }
  }

  ngAfterViewInit() {
    this.updateWorplanItems.emit();
  }

  editCost(template: TemplateRef<any>, cost: any) {
    // open modal:
    this.modalRef = this.modalService.show(template);
    // set selected cost:
    this.selectedCost = cost;
  }

  deleteCost(cost: WorkplanItem) {
    this.workplanService.deleteWorkplanItem(cost).subscribe((res) => {
      this.ts.success('Ação concluída!', 'O custo foi removido com sucesso.');
      this.updateWorplanItems.emit();
    });
  }

}
