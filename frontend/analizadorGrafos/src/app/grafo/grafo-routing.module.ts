import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GrafoViewComponent } from './grafo-view/grafo-view.component';
import { GrafoModule } from './grafo.module';
const routes: Routes = [
  {
    path: 'grafo-view',
    component: GrafoViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    GrafoModule
  ],
  exports: [RouterModule]
})
export class GrafoRoutingModule { }
