import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GrafoArchivoComponent } from './grafo-archivo/grafo-archivo.component';
import { GrafoViewComponent } from './grafo-view/grafo-view.component';
import { GrafoModule } from './grafo.module';
const routes: Routes = [
  {
    path: 'grafo-view',
    component: GrafoViewComponent
  },
  {
    path: 'grafo-archivo',
    component: GrafoArchivoComponent
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
