import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { WorkplanItem } from 'src/app/_models/workplan-item';
import { WpiFundPerMonth } from 'src/app/_models/wpi-fund-per-month';
import { ConfirmAlertService } from 'src/app/_services/confirm-alert.service';
import { Project } from '../../../_models/project';
import { ToastService } from './../../../_services/toast.service';
import * as moment from 'moment';
@Component({
  selector: 'app-funds-table',
  templateUrl: './funds-table.component.html',
  styleUrls: ['./funds-table.component.scss'],
})
export class FundsTableComponent implements OnInit {

  @Input() workplanItem: WorkplanItem;
  @Input() project: Project;

  @ViewChild('fundsForm') fundsForm: any;

  selected: boolean = false;
  editing: boolean = false

  constructor(private confirmAlertService: ConfirmAlertService, private ts: ToastService) {}

  ngOnInit(): void {
    this.loadFunds();
  }

  get invalidTotal() : number {
    let total = 0;
    this.workplanItem.wpiFundPerMonth.map(
      (f: any) => (total += parseFloat(f.value))
    );

    // if (this.workplanItem.value != total) {
    //   return true;
    // }
    
    return +total.toPrecision(10) - this.workplanItem.value;
  }

  loadFunds() {
    this.workplanItem.wpiFundPerMonth
      ? this.workplanItem.wpiFundPerMonth.map((wpi) => {
          wpi.month < 10
            ? (wpi.str_date = `0${wpi.month}/${wpi.year}`)
            : (wpi.str_date = `${wpi.month}/${wpi.year}`);
          return wpi;
        })
      : null;
  }

  addFund() {
    this.workplanItem.wpiFundPerMonth.push(new WpiFundPerMonth());
  }

  removeFund(index: number) {
    this.confirmAlertService.initAlert("Não será possível desfazer essa ação.").subscribe(event => {
      if(event) {
        this.workplanItem.wpiFundPerMonth.splice(index, 1);
        this.confirmAlertService.reset();
      }
    });
  }

  parseDate(fund: WpiFundPerMonth) {
    if (fund.str_date.length == 7) {
      const month = fund.str_date.split('/')[0];
      const year = fund.str_date.split('/')[1];
      fund.month = parseInt(month);
      fund.year = parseInt(year);
    }
  }

  changeFundsSelectedState() {
    this.selected = !this.selected;
    this.workplanItem.wpiFundPerMonth.map(wpi => wpi.selected = this.selected);
  }

  get selectedWpi() {
     return this.workplanItem.wpiFundPerMonth.filter(wpi => wpi.selected == true);
  }

  removeSelectedsFunds() {
    this.confirmAlertService.initAlert("Não será possível desfazer essa ação.").subscribe(event => {
      if(event) {
        this.workplanItem.wpiFundPerMonth = this.workplanItem.wpiFundPerMonth.filter(wpi => wpi.selected != true);
        this.selected = false;
        this.confirmAlertService.reset();
      }
    })
  }

  editSelectedsFunds() {

    const _selectedFunds = this.workplanItem.wpiFundPerMonth.filter(wpi => wpi.selected == true);

    if(this.editing){
      for (const wpiFund of _selectedFunds) {
        if(wpiFund.isEditing && !this.validateFund(wpiFund)){
          this.ts.error('Ops!', 'Preencha todos os campos obrigatórios dos itens em edição.');
          return;
        }
        if(wpiFund.isEditing && !this.validateFundDateOnProjectDuration(wpiFund.str_date)){
          this.ts.error('Ops!', `O dispêndio deve estar dentro do período do projeto (entre ${this.project.start} e ${this.project.end}).`);
          return;
        }        
      }
    }

    this.editing = !this.editing;
      _selectedFunds.map(wpi => {
        wpi.isEditing = this.editing;
        return wpi;
      });
  }

  private validateFund(wpiFund: WpiFundPerMonth) : boolean {
    return (wpiFund.value != undefined && wpiFund.value > 0) &&
      (wpiFund.str_date != undefined && wpiFund.str_date.includes('/'));      
  }

  private validateFundDateOnProjectDuration(fundDateStr : string) : boolean {
    const fundDate = moment(`01/${fundDateStr}`, 'dd/MM/yyyy');
    return fundDate.isSameOrAfter(moment(this.project.start,'dd/MM/yyyy')) 
      && fundDate.isSameOrBefore(moment(this.project.end,'dd/MM/yyyy'));
  }

  updateFund(wpiFundIndex: number) {
    const wpiFund = this.workplanItem.wpiFundPerMonth[wpiFundIndex];

    if(wpiFund.isEditing && !this.validateFund(wpiFund)){
      this.ts.error('Ops!', 'Preencha todos os campos obrigatórios do item.');
      return;
    }

    if(wpiFund.isEditing && !this.validateFundDateOnProjectDuration(wpiFund.str_date)){
      this.ts.error('Ops!', `O dispêndio deve estar dentro do período do projeto (entre ${this.project.start} e ${this.project.end}).`);
      return;
    }

    wpiFund.isEditing = !wpiFund.isEditing;
    
  }

  indexTracker(index: number, value: any) {
    return index;
  }

  getTotalFunds() : number {
    let total = 0;
    total = this.workplanItem.wpiFundPerMonth.reduce((sum, item) => sum + item.value , total);

    return total;
  }

}
