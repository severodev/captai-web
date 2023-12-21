import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Project } from 'src/app/_models/project';

import { ProjectService } from 'src/app/_services/project.service';
import { ToastService } from 'src/app/_services/toast.service';

@Component({
  selector: 'app-project-card-small',
  templateUrl: './project-card-small.component.html',
  styleUrls: ['./project-card-small.component.scss']
})
export class ProjectCardSmallComponent implements OnInit {

  @Input()
  project: Project;

  @Output()
  restoreEvent = new EventEmitter<any>();

  constructor(private ts: ToastService, private projectService: ProjectService) { }

  ngOnInit(): void {
  }

  formatMoney(amount, decimalCount = 2, decimal = ",", thousands = ".") {
    try {
      decimalCount = Math.abs(decimalCount);
      decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

      const negativeSign = amount < 0 ? "-" : "";

      let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
      let j = (i.length > 3) ? i.length % 3 : 0;

      return negativeSign + (j ? i.substr(0, j) + thousands : '')
        + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands)
        + (decimalCount ? decimal + Math.abs(amount - parseInt(i)).toFixed(decimalCount).slice(2) : "");
    } catch (e) {
      console.log(e); // TODO: Implement error handling
    }
  }

  showProject() {
    this.ts.info('Ops!', 'Essa funcionalidade ainda está sendo implementada! :D');
  }

  restore() {
    this.projectService.restoreProject(this.project.id).subscribe(res => {
      this.ts.success('Ação concluída!', 'Projeto restaurado com sucesso! :D');
      this.restoreEvent.emit();
    });
  }

}
