import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisualizePriceSchemeImpactRoutingModule } from './visualize-price-scheme-impact-routing.module';
import { PriceSchemeSlidersComponent } from './price-scheme-sliders/price-scheme-sliders.component';
import { PriceSchemeSettingsEditorComponent } from './price-scheme-settings-editor/price-scheme-settings-editor.component';
import {MatSliderModule} from '@angular/material/slider';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    FormsModule,
    PriceSchemeSlidersComponent,
    MatSliderModule,
    PriceSchemeSettingsEditorComponent
  ],
  imports: [
    CommonModule,
    VisualizePriceSchemeImpactRoutingModule
  ]
})
export class VisualizePriceSchemeImpactModule { }
