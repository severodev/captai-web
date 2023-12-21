import { Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { InfoValuesContributions } from 'src/app/_models/info-values-contributions';
import { ContributionService } from 'src/app/_services/contribution.service';
import { Project } from '../../../../_models/project';

@Component({
  selector: 'app-accountability-contribution-header',
  templateUrl: './accountability-contribution-header.component.html',
  styleUrls: ['./accountability-contribution-header.component.scss']
})
export class AccountabilityContributionHeaderComponent implements OnInit, OnDestroy {
  private routeSub: Subscription;
  private projectId : number;
  public infoValues : InfoValuesContributions;
  public projectTotalReceived: number;
  @Input() eventContribution = '';
  @Input() public project: Project;

  constructor(
    private route: ActivatedRoute,
    private contributionService : ContributionService,
  ) { }
  
  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.projectId = params['projectId'];
    });
    this.contributionService.informationAboutContributions(this.projectId).subscribe(data => {
      this.infoValues = data;
      this.projectTotalReceived = this.infoValues.totalReceived;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.eventContribution != ''){
      setTimeout(() => {
        this.contributionService.informationAboutContributions(this.projectId).subscribe(data => {
          this.infoValues = data;
          this.projectTotalReceived = this.infoValues.totalReceived; 
        });
      }, 250);
    }
}
  
  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  getProjectTotalBudget() {
    return Number(this.project.budget) - this.projectTotalReceived;
  }

}
