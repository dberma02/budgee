import { Injectable } from '@angular/core';
import { Transaction } from '../transaction';

@Injectable()
export class PlotlyHelperService {

  constructor() { }


  formatPlotlyData(transactions: Transaction[], targetData: string): any[] {
    var dat: any[] = [];
    for(var i = 0; i < transactions.length; i++) {
      dat.push(transactions[i][targetData]);  
    }
    return dat; 
  }

  monthlyBalanceChart(xdat: string[], ydat: number[], daterange: string): any[] {
    var balance = {
      id: 'test',
      x: xdat,
      y: ydat,
      type: 'scatter',
      mode: 'lines',
      name: 'Balance for ' + daterange
    };

    var layout = {
      //stub
    };

    return [ [balance ], layout];

  }

}
