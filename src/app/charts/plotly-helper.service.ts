import { Injectable } from '@angular/core';
import { Transaction } from '../transaction';

@Injectable()
export class PlotlyHelperService {

  constructor() { }

  //Make sure that this is plotting only one balance per day--right now don't think that's what's happening
  monthlyBalanceChart(transactions: Transaction[], xdat: string, ydat: string, daterange: string): any[] {
    console.log( this.formatPlotlyDataDate(transactions, 'stub'));
    var balance = {
      x: this.formatPlotlyData(transactions, xdat).reverse(),
      y: this.formatPlotlyData(transactions, ydat),
      type: 'scatter',
      mode: 'lines',
      text: this.getText(transactions),
      name: 'Balance for ' + daterange
    };

    var layout = {
      title: `Balance for ${daterange}`,  
      xaxis: { title: 'Date' },
      yaxis: { title: 'Balance' }
    };

    return [ [balance ], layout];
  }
  
  //for charts that have date on x axis
  //I believe this is a job for a database
  private formatPlotlyDataDate(transactions: Transaction[], targetData: string) {
    //if balance, return one balance per day
    //  if credit, return daily high
    //  if debit, return daily low
    //  this seems like maybe a backend task???
    var dates = this.formatPlotlyData(transactions, 'date'); 
    console.log(this.unique(dates)); 
  }

//  private Date.prototype.addDays = function(days) {
//    var dat = new Date(this.valueOf());
//    dat.setDate(dat.getDate() + days);
//    return dat;
//  }; 


  //NOT DEALING WITH THIS RN
//  private getDatesByRange(start: number[], end:number[]): Array<string> {
//    var dates = new Array<string>();
//    var startD = new Date(start[0], start[1], start[2])
//    var endD = new Date(end[0], end[1], end[2])
//
//    for (var dt = startD; dt <= endD; dt = dt.AddDays(1))
//    {
//       var month = dt.getMonth() + 1;
//       var day = dt.getDate(); 
//       var fullYear = dt.getFullYear();
//       var year = fullYear[2].toString() + fullYear[3].toString();
////       var date:string = (dt.getMonth + 1)   dd
////       dates.append();
//    } 
//    return dates;
//  }

  private unique(a: Array<string>): Array<string> {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });   
  }

  private formatPlotlyData(transactions: Transaction[], targetData: string): any[] {
    var dat: any[] = [];
    for(var i = 0; i < transactions.length; i++) {
      dat.push(transactions[i][targetData]);  
    }
    return dat; 
  }

  private getText(transactions: Transaction[]): string[] {
    //make array, date by date, containing info you want in hover box
    //i.e. make Debit/Credit: AMOUNT description: DESCRIPTION
    //also coming upon that time where you'll have to clean up the description
    var text: string[] = [ ];
    var dateText: string = 'Balance Change   Description<br>';
    for(var i = 0; i < transactions.length; i++) {

      //I think this will fail on the last case if both transactions are on same day bc wont get pushed
      if(i != 0 && transactions[i].date == transactions[i - 1].date) {
        //push to same text element
        dateText += this.getTextHelper(transactions[i]);

      } else {
        //push last one to text array, clear current, and push this to current.
        text.push(dateText);
        dateText = 'Balance Chance   Description<br>';
        dateText += this.getTextHelper(transactions[i]); //initialize with new data
      }
    }
      console.log(dateText);

    return text; 
  }

  getTextHelper(transaction: Transaction): string {
      if(transaction.credit != null) {
        return `Date: ${transaction.date} +${transaction.credit}: ${transaction.description}<br>` 
      } else if(transaction.debit != null) {
        return `Date: ${transaction.date} -${transaction.debit}: ${transaction.description}<br>` 
      }

  }


}
