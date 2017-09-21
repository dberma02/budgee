import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForecastsRoutingModule } from './forecasts-routing.module';
import { ForecastsComponent } from './forecasts.component';

@NgModule({
  imports: [
    CommonModule,
    ForecastsRoutingModule
  ],
  declarations: [ForecastsComponent],
})

export class ForecastsModule { }

