import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { HeaderComponent } from './template/header/header.component';
import { FooterComponent } from './template/footer/footer.component';
import { NotFoundComponent } from './template/not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { UsuarioService } from './usuario.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginUserComponent,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  exports:[],
  providers: [UsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
