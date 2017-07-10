import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsComponent } from './charts.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    ChartsComponent
  ],
  declarations: [ChartsComponent]
})
export class ChartsModule { }
