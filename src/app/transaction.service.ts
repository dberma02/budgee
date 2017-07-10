import { Injectable } from '@angular/core';
import { Transaction } from './transaction';
import { TRANSACTIONS } from './mock-transactions';
declare var Plotly: any;

@Injectable()
export class TransactionService {
    constructor() { }

    getTransactions(): Promise<Transaction[]> {
        return Promise.resolve(TRANSACTIONS);
    }

}
