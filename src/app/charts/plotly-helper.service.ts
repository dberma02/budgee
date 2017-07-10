import { Injectable } from '@angular/core';
import { Transaction } from '../transaction';

@Injectable()
export class PlotlyHelperService {

  constructor() { }


  monthlyBalanceChart(transactions: Transaction[], xdat: string, ydat: string, daterange: string): any[] {
    var balance = {
      x: this.formatPlotlyData(transactions, xdat),
      y: this.formatPlotlyData(transactions, ydat),
      type: 'scatter',
      mode: 'lines',
      name: 'Balance for ' + daterange
    };

    var layout = {
      title: `Balance for ${daterange}`,  
      xaxis: { title: 'Date' },
      yaxis: { title: 'Balance' }
    };

    return [ [balance ], layout];
  }
  
  private formatPlotlyData(transactions: Transaction[], targetData: string): any[] {
    var dat: any[] = [];
    for(var i = 0; i < transactions.length; i++) {
      dat.push(transactions[i][targetData]);  
    }
    return dat; 
  }

  private generateDescription(): void {
    //make array, date by date, containing info you want in hover box
    //i.e. make Debit/Credit: AMOUNT description: DESCRIPTION
    //also coming upon that time where you'll have to clean up the description
  }

}
