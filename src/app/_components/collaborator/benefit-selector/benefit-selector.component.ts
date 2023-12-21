import { Component, OnInit, Input } from '@angular/core';

import { Benefit } from 'src/app/_models/benefit';
import { Collaborator } from 'src/app/_models/collaborator';

import { CollaboratorService } from 'src/app/_services/collaborator.service';

@Component({
  selector: 'app-benefit-selector',
  templateUrl: './benefit-selector.component.html',
  styleUrls: ['./benefit-selector.component.scss']
})
export class BenefitSelectorComponent implements OnInit {

  @Input()
  collaborator: Collaborator;

  benefits: Benefit[];

  constructor(private collaboratorService: CollaboratorService) { }

  ngOnInit(): void {
    this.benefits = [];
    this.loadBenefits();
  }

  loadBenefits() {
    this.collaboratorService.getBenefitsDropdown().subscribe((res: Benefit[]) => {
      this.benefits = res;
    });
  }

  toogleSelectBenefit(selectedBenefit: Benefit) {
    // if(this.isSelected(selectedBenefit)) {
    //   let aux = this.collaborator.benefits.findIndex((el: Benefit) => {
    //     return el.name === selectedBenefit.name;
    //   });
    //   this.collaborator.benefits.splice(aux, 1);
    // } else {
    //   this.collaborator.benefits.push(selectedBenefit);
    // }
  }

  isSelected(benefit: Benefit) {
    // return (this.collaborator.benefits.some((el: Benefit) => el.name === benefit.name));
  }

}
