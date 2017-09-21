import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { Transaction } from '../transaction';
import { TransactionService } from '../transaction.service';
import * as glob from '../globals';


@Component({
  selector: 'table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TableComponent implements OnInit {
    start_d: string = '2017-8-4';
    end_d: string = '2017-8-10';
    editing = {};
    transactions: Array<Transaction>;
    rows: Transaction[];

    constructor(private transactionService: TransactionService) { }

    columns = [
        { name: 'Debit' },
        { name: 'Credit' },
        { name: 'Balance' },
        { name: 'Date' },
        { name: 'Description' },
        { name: 'Category' }
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

  printEditing() {
    console.log(this.editing);
  }

  updateValue(event, cell, rowIndex) {
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
    console.log('UPDATED!', this.rows[rowIndex][cell]);
  }
 
 
  private handleError (error: any) {
    return Observable.throw("Database error");
  }


}
