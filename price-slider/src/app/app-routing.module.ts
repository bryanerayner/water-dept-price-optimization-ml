import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'visualize-price-scheme-impact',
    loadChildren: () => import('./visualize-price-scheme-impact/visualize-price-scheme-impact.module').then(m => m.VisualizePriceSchemeImpactModule)
  },
  {
    path: '',
    redirectTo: '/visualize-price-scheme-impact'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
