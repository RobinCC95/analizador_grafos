import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrafoViewComponent } from './grafo-view/grafo-view.component';
import { GojsAngularModule } from 'gojs-angular';
import { BrowserModule } from '@angular/platform-browser';
import { GrafoArchivoComponent } from './grafo-archivo/grafo-archivo.component';
import { GrafoListarComponent } from './grafo-listar/grafo-listar.component';
import { GrafoService } from './grafo.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { GrafoAnalizarComponent } from './grafo-analizar/grafo-analizar.component';

@NgModule({
  declarations: [
    GrafoViewComponent,
    GrafoArchivoComponent,
    GrafoListarComponent,
    GrafoAnalizarComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    GojsAngularModule,
    HttpClientModule,
    ReactiveFormsModule

  ],
  providers: [GrafoService],
  exports: [
    GrafoViewComponent,
    GrafoArchivoComponent
  ]
})
export class GrafoModule { }
