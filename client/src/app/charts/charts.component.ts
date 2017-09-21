import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

import { Transaction } from '../transaction';
import { TransactionService } from '../transaction.service';
import { PlotlyHelperService } from './plotly-helper.service';
import * as glob from '../globals';
declare var Plotly: any;

@Component({
  selector: 'charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
  providers: [ PlotlyHelperService ]
})
export class ChartsComponent implements OnInit {
  start_d: string = '2017-8-5';
  end_d: string = '2017-8-31';

  transactions: Transaction[];

  constructor(private transactionService: TransactionService,
              private plotlyService: PlotlyHelperService) { }

  ngOnInit() {
    this.transactionService.getTransactions(glob.CHART_TRANSACTION_FORMAT , this.start_d, this.end_d).subscribe(
      results => { 
        this.transactions = results;
        this.monthlyBalance(); 
      },
      error => this.handleError(error)
    );
  }

  monthlyBalance(): void {
    var xdat: string = 'date';
    var ydat: string = 'balance';
    var plotlyDat: object;
    plotlyDat = this.plotlyService.monthlyBalanceChart(this.transactions, xdat, ydat, "June");
    Plotly.newPlot('plotlychart', plotlyDat[0], plotlyDat[1]);
  }
  
  private handleError (error: any) {
    return Observable.throw("Database error");
  }
}
