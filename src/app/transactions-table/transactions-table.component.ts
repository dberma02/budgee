import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Transaction } from '../transaction';
import { TransactionService } from '../transaction.service';


@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TransactionsTableComponent implements OnInit {
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
        this.transactionService.getTransactions().then(transactions => this.rows = transactions);
  }

}
