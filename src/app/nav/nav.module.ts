import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarTopComponent } from './navbar-top/navbar-top.component';
import { RouterModule, Routes } from '@angular/router';
import { TransactionsTableComponent } from '../transactions-table/transactions-table.component';
import { DashboardComponent } from '../dashboard/dashboard.component';

const routes: Routes = [ 
  { path: 'transactions-table', component: TransactionsTableComponent }
]


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    NavbarTopComponent
  ],
  declarations: [NavbarTopComponent]
})
export class NavModule { }
