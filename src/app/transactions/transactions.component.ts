import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { Transaction } from '../transaction';
import { TransactionService } from '../transaction.service';
import * as glob from '../globals';


@Component({
  selector: 'transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TransactionsComponent implements OnInit {
    start_d: string = '2017-8-4';
    end_d: string = '2017-8-10';
    transactions: Array<Transaction>;
    rows: Transaction[];

    constructor(private transactionService: TransactionService) { }

    columns = [
        { name: 'debit' },
        { name: 'credit' },
        { name: 'balance' },
        { name: 'date' },
        { name: 'description' },
        { name: 'category' }
    ];


  ngOnInit() {
    this.transactionService.getTransactions(glob.TABLE_TRANSACTION_FORMAT , this.start_d, this.end_d).subscribe(
      results => { 
        this.transactions = results;
        this.rows = results;
      },
      error => this.handleError(error)
    );
  }
  
  private handleError (error: any) {
    return Observable.throw("Database error");
  }


}
