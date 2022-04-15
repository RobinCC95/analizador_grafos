import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrafoViewComponent } from './grafo-view/grafo-view.component';
import { GojsAngularModule } from 'gojs-angular';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    GrafoViewComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    GojsAngularModule

  ],
  exports: [
    GrafoViewComponent
  ]
})
export class GrafoModule { }
