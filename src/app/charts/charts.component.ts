import { Component, OnInit } from '@angular/core';
import { Transaction } from '../transaction';
import { TransactionService } from '../transaction.service';
import { PlotlyHelperService } from './plotly-helper.service';
declare var Plotly: any;

@Component({
  selector: 'charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
  providers: [ PlotlyHelperService ]
})
export class ChartsComponent implements OnInit {

  transactions: Transaction[];

  constructor(private transactionService: TransactionService,
              private plotlyService: PlotlyHelperService) { }

  ngOnInit() {
    this.transactionService.getTransactions().then(transactions => {
      this.transactions = transactions;
      this.monthlyBalance(); 
    });
  }

  monthlyBalance(): void {
    var xdat: string = 'date';
    var ydat: string = 'balance';
    var plotlyDat: object;
    plotlyDat = this.plotlyService.monthlyBalanceChart(this.transactions, xdat, ydat, "June");
    Plotly.newPlot('plotlychart', plotlyDat[0], plotlyDat[1]);

  }

  
}
