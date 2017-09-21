import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Http, HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { TableModule } from './table/table.module';
import { TransactionService } from './transaction.service';
import { DashboardModule } from './dashboard/dashboard.module';
import { NavbarTopComponent } from './navbar-top/navbar-top.component';
import { ChartsModule } from './charts/charts.module';
import { ForecastsModule } from './forecasts/forecasts.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarTopComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    TableModule,
    DashboardModule,
    ForecastsModule,
    ChartsModule,
    AppRoutingModule
  ],
  providers: [ TransactionService ],

  bootstrap: [AppComponent]
})
export class AppModule { }
