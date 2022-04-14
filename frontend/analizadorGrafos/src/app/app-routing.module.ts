import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GrafoRoutingModule } from './grafo/grafo-routing.module';
import { GrafoModule } from './grafo/grafo.module';
import { LoginUserComponent } from './login-user/login-user.component';
import { NotFoundComponent } from './template/not-found/not-found.component';
const routes: Routes = [
  {
    path: 'user',
    component: LoginUserComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/user',
  },
  {
    path:'**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    GrafoModule,
    GrafoRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
