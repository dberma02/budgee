import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { TableRoutingModule } from './table-routing.module';
import { TableComponent } from './table.component';

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    TableRoutingModule
  ],
  declarations: [TableComponent],
})

export class TableModule { }


