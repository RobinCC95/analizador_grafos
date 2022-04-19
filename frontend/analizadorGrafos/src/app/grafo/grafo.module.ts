import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrafoViewComponent } from './grafo-view/grafo-view.component';
import { GojsAngularModule } from 'gojs-angular';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { GrafoArchivoComponent } from './grafo-archivo/grafo-archivo.component';

@NgModule({
  declarations: [
    GrafoViewComponent,
    GrafoArchivoComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    GojsAngularModule

  ],
  exports: [
    GrafoViewComponent,
    GrafoArchivoComponent
  ]
})
export class GrafoModule { }
