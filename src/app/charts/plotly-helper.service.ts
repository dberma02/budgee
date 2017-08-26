import { Injectable } from '@angular/core';
import { Transaction } from '../transaction';


// Right now: Fixed the description text so it is formatted better. 
// Fixed the dates displayed on x axis so that they have correct number of points in the Plotly data array.
// Need to alter the y axis (balance) Plotly data array so that it has the correct number of data points, 
// matching length of other array. i.e. design so that, for each day, if multiple transactions take place,
// only one will be added to the array to be represented on graph. 
//    -if only spending, no income, use lowest balance
//    -if only income, use highest balance
//    -if income and spending, check if total credit for the day is greater than total debit for the day, choose
//     which value to display accordingly
//


@Injectable()
export class PlotlyHelperService {

  constructor() { }

  //Make sure that this is plotting only one balance per day--right now don't think that's what's happening
  monthlyBalanceChart(transactions: Transaction[], xdat: string, ydat: string, daterange: string): any[] {
    console.log( this.formatPlotlyDataDate(transactions, 'stub'));
    var balance = {
      x: this.formatPlotlyDataDate(transactions, xdat),
      y: this.formatPlotlyData(transactions, ydat),
      type: 'scatter',
      hoverinfo: 'text',
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
    console.log("dates: ", this.unique(dates)); 
    return this.unique(dates)
  }

//  private Date.prototype.addDays = function(days) {
//    var dat = new Date(this.valueOf());
//    dat.setDate(dat.getDate() + days);
//    return dat;
//  }; 

  private unique(a: Array<string>): Array<string> {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });   
  }

  // Returns a 1d array of data, returning array of with one element for each transaction,
  // not one element for each date.
  // For this graph, should return one element for each Date, and then there should be a different process for
  // making the Description, which will show all of the transactions that took place on that date.
  private formatPlotlyData(transactions: Transaction[], targetData: string): any[] {
    var dat: any[] = [];
    for(var i = 0; i < transactions.length; i++) {
      dat.push(transactions[i][targetData]);  
    }
    console.log("used date: ",dat)
    return dat; 
  }

  // Creates the text to go in the plotly description box
  // The box should have every transaction that took place on that date.
  // The data that should be plotted by the graph should be (for now) the minimum balance that is
  // present for a transaction on a given date.
  private getText(transactions: Transaction[]): string[] {
    //make array, date by date, containing info you want in hover box
    //i.e. make Debit/Credit: AMOUNT description: DESCRIPTION
    var text: string[] = [ ];
    var dateText: string = `Balance       Change      Description<br>`;
    console.log("text Transactions: ",transactions);
    for(var i = 0; i < transactions.length; i++) {

      //I think this will fail on the last case if both transactions are on same day bc wont get pushed
      if( i === 0) {
        dateText += this.getTextHelper(transactions[i]);
      } else if(i != 0 && transactions[i].date == transactions[i - 1].date) {
        //push to same text element
        dateText += this.getTextHelper(transactions[i]);
        console.log(transactions[i]);
        console.log("DATETEXT!: ", dateText);
      } else {
        //push last transaction to text array, clear current, and push this to current.
        console.log("Else Transaction: ", transactions[i]['name']);
        text.push(dateText);
        dateText = `Balance       Change      Description<br>`;
        dateText += this.getTextHelper(transactions[i]); //initialize with new data
        console.log("Else DateText: ", dateText);
      }
    }
      console.log("text: ",text);

    return text; 
  }

  getTextHelper(transaction: Transaction): string {
      if(transaction.credit != null) {
        return `${transaction.balance}         +${transaction.credit}             ${transaction.name}<br>` 
      } else if(transaction.debit != null) {
        return `${transaction.balance}         -${transaction.debit}                 ${transaction.name}<br>` 
      }
  }
}
