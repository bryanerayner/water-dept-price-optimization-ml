import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PriceSchemeSlidersComponent } from './price-scheme-sliders/price-scheme-sliders.component';

const routes: Routes = [
  {
    path: '',
    component: PriceSchemeSlidersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisualizePriceSchemeImpactRoutingModule { }
