import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Project } from 'src/app/_models/project';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {

  @Input()
  project: Project;

  public utilizedFundsPercentage: number = 0;
  public utilizedFundsPercentageText: string = '0% concluído';

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    if(this.project.utilizedFundsPercentage) {
      this.utilizedFundsPercentage = Number(this.project.utilizedFundsPercentage) > 1 
        ? 100
        : 100 * Number(this.project.utilizedFundsPercentage);
      this.utilizedFundsPercentageText = Number(this.project.utilizedFundsPercentage) >= 1 
        ? 'Concluído' 
        : this.utilizedFundsPercentage.toFixed(2) + '% concluído';
    }
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
    this.router.navigate(['/project-details', { projectId: this.project.id }]);
  }

  goToWorkplan() {
    this.router.navigate(['/workplan', { projectId: this.project.id }]);
  }

  goToAccountability() {
    this.router.navigate(['/project-account', { projectId: this.project.id }]);
  }

}
