import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { Project } from 'src/app/_models/project';

@Component({
  selector: 'app-accountability-info',
  templateUrl: './accountability-info.component.html',
  styleUrls: ['./accountability-info.component.scss'],
})
export class AccountabilityInfoComponent implements OnInit {
  @Input() public activeForm: string;
  @Input() public project: Project;
  @Output() cardChangesContributions = new EventEmitter<string>();
  private changeNumber = 0;
  public diff;
  constructor() {}
  
  ngOnInit(): void {
    let date1 = moment(this.project.start, 'DD-MM-YYYY');
    let date2 = moment(this.project.end, 'DD-MM-YYYY');
    this.diff = date2.diff(date1, 'months'); 
  }

  setShowForm(tag) {
    this.activeForm = tag;
  }

  cardChangesContributionsEvent(change : any){
    this.changeNumber += 1;
    this.cardChangesContributions.emit(`${change} ${this.changeNumber}`);
  }
}
