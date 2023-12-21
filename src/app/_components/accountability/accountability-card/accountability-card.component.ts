import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InfoValuesContributions } from 'src/app/_models/info-values-contributions';

import { Project } from 'src/app/_models/project';
import { ContributionService } from 'src/app/_services/contribution.service';

@Component({
  selector: 'app-accountability-card',
  templateUrl: './accountability-card.component.html',
  styleUrls: ['./accountability-card.component.scss']
})
export class AccountabilityCardComponent implements OnInit {

  @Input()
  project: Project;
  public infoValues : InfoValuesContributions;

  public utilizedFundsPercentage: number = 0;

  public projectBudget: number;

  constructor(
    private router: Router,
    private contributionService : ContributionService,
  ) { }

  ngOnInit(): void {
    if(this.project.utilizedFundsPercentage)
      this.utilizedFundsPercentage = Number(this.project.utilizedFundsPercentage) > 1 
        ? 100
        : 100 * Number(this.project.utilizedFundsPercentage);

    this.contributionService.informationAboutContributions(this.project.id).subscribe(data => this.infoValues = data);
  }

  showProjectAccount() {
    this.router.navigate(['/project-account', { projectId: this.project.id }]);
  }

  showProject() {
    this.router.navigate(['/project-details', { projectId: this.project.id }]);
  }

}
