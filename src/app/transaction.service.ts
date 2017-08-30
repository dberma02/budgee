import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Transaction } from './transaction';
//import { TRANSACTIONS } from './mock-transactions';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

declare var Plotly: any;

@Injectable()
export class TransactionService {
  constructor( private _http: Http) { }
  private transactionsUrl = "http://localhost:3000/api/transactions";

  getTransactions(format: string, start_d: string, end_d: string): Observable<Array<Transaction>> {
    let fullUrl = this.transactionsUrl + this.makeQuery(format, start_d, end_d); 
    return this._http.get(fullUrl)
      .map(this.extractData)
      .catch((error) => {
        return this.handleError(error);
      });
  }

  private extractData(res: Response) {
    let body = res.json();
    let transactions = [];
    console.log(body.data);

    for(let transaction of body.data) {
      
      let tran : Transaction = new Transaction(
        transaction.attributes.debit,
        transaction.attributes.credit,
        transaction.attributes.balance,
        transaction.attributes.date,
        transaction.attributes.name,
        transaction.attributes.location,
        transaction.attributes.category,
        transaction.attributes.description
      );
      transactions.push(tran);
    }
    console.log(transactions);
    return transactions;

  }    

  private makeQuery(format: string, start_d: string, end_d: string): string {
    return "?format=" + format + "&start_date=" + start_d + "&end_date=" + end_d;
  }

  private handleError (error: any) {
    return Observable.throw("Database error");
  }

//    getTransactions(): Promise<Transaction[]> {
//        return Promise.resolve(TRANSACTIONS);
//    }

}
