import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { TransactionsTableComponent } from './transactions-table/transactions-table.component';
import { TransactionService } from './transaction.service';
import { DashboardModule } from './dashboard/dashboard.module';
import { TestBootstrapComponent } from './test-bootstrap/test-bootstrap.component';
import { NavModule } from './nav/nav.module';
import { AppRoutingModule } from './app-routing.module';
import { ChartsModule } from './charts/charts.module';

@NgModule({
  declarations: [
    AppComponent,
    TransactionsTableComponent,
    TestBootstrapComponent
  ],
  imports: [
    NgxDatatableModule,
    BrowserModule,
    DashboardModule,
    NavModule,
    ChartsModule,
    AppRoutingModule
  ],
  providers: [ TransactionService ],

  bootstrap: [AppComponent]
})
export class AppModule { }
