import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsComponent } from './transactions.component';

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    TransactionsRoutingModule
  ],
  declarations: [TransactionsComponent],
})

export class TransactionsModule { }


