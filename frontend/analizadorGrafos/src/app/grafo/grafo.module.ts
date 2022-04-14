import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrafoViewComponent } from './grafo-view/grafo-view.component';


@NgModule({
  declarations: [
    GrafoViewComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    GrafoViewComponent
  ]
})
export class GrafoModule { }
