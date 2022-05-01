import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrafoViewComponent } from './grafo-view/grafo-view.component';
import { GojsAngularModule } from 'gojs-angular';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { GrafoArchivoComponent } from './grafo-archivo/grafo-archivo.component';
import { GrafoListarComponent } from './grafo-listar/grafo-listar.component';
import { GrafoService } from './grafo.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    GrafoViewComponent,
    GrafoArchivoComponent,
    GrafoListarComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    GojsAngularModule,
    HttpClientModule

  ],
  providers: [GrafoService],
  exports: [
    GrafoViewComponent,
    GrafoArchivoComponent
  ]
})
export class GrafoModule { }
