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
    this.transactionService.getTransactions().then(transactions => this.transactions = transactions);
  }

  monthlyBalance(): void {
    var tmp =  {
              x: [1,2,3],
              y: [4,7,14],
              type: 'scatter',
              mode: 'lines',
              line: { color: 'blue' }
          };

    var xdat: number[];
    var ydat: number[];
    var plotlyDat: object;
//    xdat = this.plotlyService.formatPlotlyData(this.transactions, 'debit');
//    ydat = this.plotlyService.formatPlotlyData(this.transactions, 'balance');
//    tmp.x=xdat;
//    tmp.y=ydat;
    console.log(tmp.x);
    console.log(tmp.y)
//    plotlyDat = this.plotlyService.monthlyBalanceChart(xdat, ydat, "june");
    console.log(tmp);
    Plotly.newPlot('plotlychart', tmp);

  }

  
}
