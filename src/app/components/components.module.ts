import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountryCardComponent } from './country-card/country-card.component';
import { DetailsComponent } from './details/details.component';

const PAGES_COMPONENTS = [
  CountryCardComponent,
  DetailsComponent,
];
@NgModule({
  declarations: [
    PAGES_COMPONENTS
  ],
  exports: [
    PAGES_COMPONENTS
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
