import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { OnChange } from 'property-watch-decorator';
import { InfoValuesContributions } from 'src/app/_models/info-values-contributions';
import { Project } from 'src/app/_models/project';

@Component({
  selector: 'app-project-header',
  templateUrl: './project-header.component.html',
  styleUrls: ['./project-header.component.scss']
})
export class ProjectHeaderComponent implements OnInit {

  @Input() workplanHeader?: boolean;
  @OnChange('getCurrentMonthValue')
  @Input() project: Project;
  @Input() infoValues: InfoValuesContributions;

  public utilizedFundsPercentage: number = 0;
  public currentMonthExpenseValue: number

  constructor() { }

  ngOnInit(): void {
    if (this.project?.utilizedFundsPercentage)
      this.utilizedFundsPercentage = Number(this.project.utilizedFundsPercentage) > 1
        ? 100
        : 100 * Number(this.project.utilizedFundsPercentage);
  }

  getCurrentMonthValue() {
    this.currentMonthExpenseValue = this.project?.headerTotalExpenses;
  }
}
