import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Project } from '../../../_models/project';

@Component({
  selector: 'app-accountability-contribution',
  templateUrl: './accountability-contribution.component.html',
  styleUrls: ['./accountability-contribution.component.scss'],
})
export class AccountabilityContributionComponent {
  public contributionChange = '';
  public loanChange = '';
  private changeNumber = 0;
  @Output() cardChangesContributionsEvent = new EventEmitter<string>();
  @Input() public project: Project;
  constructor() {}

  cardChangesContributions(change : any){
    this.changeNumber += 1;
    this.contributionChange = `${change} ${this.changeNumber}`;
    this.cardChangesContributionsEvent.emit(`${change} ${this.changeNumber}`);
  }

  cardChangesLoans(change : any){
    this.changeNumber += 1;
    this.loanChange = `${change} ${this.changeNumber}`;
  }
}
