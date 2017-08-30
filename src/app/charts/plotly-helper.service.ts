import { Injectable } from '@angular/core';
import { Transaction } from '../transaction';
import { TransactionsByDate } from './transactions-by-date';


// Right now:
// Made the function to choose balance correctly based on credit/dibit information for that day, if multiple
// transactions.
// TODO: -test above more thuroughly
//       -add to description so that balance is shown for stubbed data
//       -orgainize, refactor, remove comments. code got pretty messy
//


@Injectable()
export class PlotlyHelperService {

  constructor() { }

  //Make sure that this is plotting only one balance per day--right now don't think that's what's happening
  monthlyBalanceChart(transactions: Transaction[], xdat: string, ydat: string, daterange: string): any[] {
    console.log( this.formatPlotlyDataDate(transactions, 'stub'));
    console.log( "dataByDate", this.dataByDate(transactions));
    var balance = {
      x: this.formatPlotlyDataDate(transactions, xdat),
      y: this.formatPlotlyDataBalance(transactions, ydat),
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
  private formatPlotlyDataDate(transactions: Transaction[], targetData: string) {
    var dates = this.formatPlotlyData(transactions, 'date'); 
    console.log("dates: ", this.unique(dates)); 
    return this.unique(dates)
  }

// Design so that, for each day, if multiple transactions take place,
// only one will be added to the array to be represented on graph. 
//    -if only spending, no income, use lowest balance
//    -if only income, use highest balance
//    -if income and spending, check if total credit for the day is greater than total debit for the day, choose
//     which value to display accordingly
//  TODO: Test this more thoroughly
  
  // returns the array of balances that will be plotted on graph
  private formatPlotlyDataBalance(transactionData: Transaction[], targetData: string) {
    var transactions: TransactionsByDate[] = this.dataByDate(transactionData);
    var balanceData: number[] = [];

    console.log("format: ", transactions);
    for(var i = 0; i < transactions.length; i++) {
      console.log(i);
      if(transactions[i].debits.length > 0 && transactions[i].credits.length > 0) {
        //credit and debit transactions both take place on this day
        var debitSum = transactions[i].debits.reduce((a,b) => a + b, 0);
        var creditSum = transactions[i].credits.reduce((a,b) => a + b, 0);
        if (debitSum > creditSum) {
          var balance = Math.min.apply(null, transactions[i].balances);
          balanceData.push(balance);
        } else if(creditSum > debitSum) {
          var balance = Math.max.apply(null, transactions[i].balances);
          balanceData.push(balance);
        } else if(creditSum === debitSum) {
          //TODO 
          console.log("Transaction Data Edge Case");
        }
      } else if(transactions[i].debits.length > 0) {
        // only debit transactions take place on this day
        var balance = Math.min.apply(null, transactions[i].balances);
        balanceData.push(balance);
      } else if(transactions[i].credits.length > 0) {
        // only credit transactions take place on this day
        var balance = Math.max.apply(null, transactions[i].balances);
        balanceData.push(balance);
      } else {
        // neither debit nor credit transaction take place on this day. Stub Data.
        console.log("STTTUB");
        console.log(balanceData);
        if( i === 0) {
          console.log(transactions[i].balances[0]);
          var tmp = transactions[i].balances[0]; 
          balanceData.push(balance);
        } else {
          console.log(balanceData[balanceData.length - 1]);
          var tmp = balanceData[balanceData.length - 1]; 
          balanceData.push(balance);
        }
      }
    }
    console.log("balanceData ", balanceData);
    return balanceData;
    
  }

  // formats transaction data. Returns an array of objects, each contianing a date, an array of
  // all debit transactions that took place on that day, and array of all credit transactions
  // that took place on that day.
  private dataByDate(transactions: Transaction[]) {
    //    var tmpData = {date: null, debit: [], credit: []};
    var tmpData: TransactionsByDate = {date: null, debits: [], credits: [], balances: []};
    // data structure: [{date: DATE, debit:[DEBIT],credit:[CREDIT]],{......},.....]
    var dateData: any[] = [];
    for(var i = 0; i < transactions.length; i++) {
      if(i === 0) {
        tmpData.date = transactions[i].date;
        tmpData.balances.push(transactions[i].balance);
        if(transactions[i].debit) {
          tmpData.debits.push(transactions[i].debit);
        }
        if(transactions[i].credit) {
          tmpData.credits.push(transactions[i].credit);
        }
      } else if(transactions[i].date === tmpData.date) {
        // this transaction occured on the same day
        tmpData.balances.push(transactions[i].balance);
        if(transactions[i].debit) {
          tmpData.debits.push(transactions[i].debit);
        }
        if(transactions[i].credit) {
          tmpData.credits.push(transactions[i].credit);
        }
      } else {
        // this transaction occured on the next day
        dateData.push(tmpData);
        var tmpData: TransactionsByDate = {date: transactions[i].date, debits: [], credits: [],
                                           balances: [transactions[i].balance]};

        if(transactions[i].debit) {
          tmpData.debits.push(transactions[i].debit);
        }
        if(transactions[i].credit) {
          tmpData.credits.push(transactions[i].credit);
        }
        
        if(i === transactions.length - 1) {
          dateData.push(tmpData);
        }
      }
    }
    return dateData;
  }

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

  // TODO: Make so that on day where data is stubbed, description contains balance
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
