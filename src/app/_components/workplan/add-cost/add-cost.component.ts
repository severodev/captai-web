import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Project } from '../../../_models/project';

@Component({
  selector: 'app-add-cost',
  templateUrl: './add-cost.component.html',
  styleUrls: ['./add-cost.component.scss']
})
export class AddCostComponent implements OnInit {

  @Input()
  projectId: number;

  @Input()
  project: Project;

  chevRHDown: boolean = true;
  chevServicesDown: boolean = true;
  chevEquipmentsDown: boolean = true;
  chevStuffsDown: boolean = true;
  chevRelatedDown: boolean = true;

  openedForm: string = 'none';

  constructor() { }

  ngOnInit(): void {
  }

  changeForm(formId) {
    this.openedForm = formId;
  }

}
