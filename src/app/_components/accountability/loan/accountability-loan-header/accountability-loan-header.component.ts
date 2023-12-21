import { Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { InfoValuesLoans } from 'src/app/_models/info-values-loans';
import { LoanService } from 'src/app/_services/loan.service';

@Component({
  selector: 'app-accountability-loan-header',
  templateUrl: './accountability-loan-header.component.html',
  styleUrls: ['./accountability-loan-header.component.scss']
})
export class AccountabilityLoanHeaderComponent implements OnInit, OnDestroy {
  private routeSub: Subscription;
  private projectId : number;
  public infoValues : InfoValuesLoans;
  @Input() eventLoan = '';

  constructor(
    private route: ActivatedRoute,
    private loanService : LoanService,
  ) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.projectId = params['projectId'];
    });
    this.loanService.informationAboutLoans(this.projectId).subscribe(data => this.infoValues = data);
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.eventLoan != ''){
      setTimeout(() => {
        this.loanService.informationAboutLoans(this.projectId).subscribe(data => this.infoValues = data);
      }, 250);
    }
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

}
