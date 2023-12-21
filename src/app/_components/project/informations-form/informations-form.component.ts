import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { Institute } from 'src/app/_models/institute';
import { Bank } from 'src/app/_models/bank';
import { Project } from 'src/app/_models/project';

import { InstituteService } from 'src/app/_services/institute.service';
import { BankService } from 'src/app/_services/bank.service';

import { formatDate } from 'src/app/_helpers/utils'

@Component({
  selector: 'app-informations-form',
  templateUrl: './informations-form.component.html',
  styleUrls: ['./informations-form.component.scss']
})
export class InformationsFormComponent implements OnInit {


  @Input()
  project: Project;

  @Input()
  canEdit: boolean = true;

  institutes: Institute[];
  banks: Bank[];

  @ViewChild('informationForm') informationForm: any;

  constructor(private instituteService: InstituteService,
    private bankService: BankService) { }

  get invalidProjectDates() {
    const startDate = Date.parse(formatDate(this.project?.start));
    const endDate = Date.parse(formatDate(this.project?.end));

    if(isNaN(startDate) || isNaN(endDate)) {
      return true;
    } else if (startDate > endDate) {
      return true;
    }

    return false;
  }

  ngOnInit(): void {
    this.loadInstitutes();
    this.loadBanks();
  }

  loadInstitutes() {
    this.instituteService.getInstitutesDropdown().subscribe((res: Institute[]) => {
      this.institutes = res;
    });
  }

  loadBanks() {
    this.bankService.getBanksDropdown().subscribe((res: Bank[]) => {
      this.banks = res;
    });
  }
}
