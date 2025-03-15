import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { AlarmasUbicacionListComponent } from './alarmas-ubicacion/alarmas-ubicacion-list/alarmas-ubicacion-list.component';
import { SonidoEventosListComponent } from './sonido-eventos/sonido-eventos-list/sonido-eventos-list.component';
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirección a login al inicio
  { path: 'login', component: LoginComponent },         // Ruta para el login
  { path: 'home', component: HomeComponent },           // Ruta para home (debe estar antes de '**')
  {path: 'alarmas', loadChildren: () => import('./alarmas-ubicacion/alarmas-ubicacion.module').then(m => m.AlarmasUbicacionModule)},
  {path: 'sonidoeventos', loadChildren: () => import('./sonido-eventos/sonido-eventos.module').then(m => m.SonidoEventosModule)},
  { path: '**', component: PageNotFoundComponent }      // Página de error 404 (opcional)
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
