import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GrafoAnalizarComponent } from './grafo-analizar/grafo-analizar.component';
import { GrafoArchivoComponent } from './grafo-archivo/grafo-archivo.component';
import { GrafoListarComponent } from './grafo-listar/grafo-listar.component';
import { GrafoViewComponent } from './grafo-view/grafo-view.component';
import { GrafoModule } from './grafo.module';
const routes: Routes = [
  {
    path: 'grafo-view',
    component: GrafoViewComponent
  },
  {
    path: 'grafo-view/:id',
    component: GrafoViewComponent
  },
  {
    path: 'grafo-archivo',
    component: GrafoArchivoComponent
  },
  {
    path: 'grafo-listar',
    component: GrafoListarComponent
  },
  {
    path: 'grafo-analizar',
    component: GrafoAnalizarComponent
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
