import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { AlarmasUbicacionListComponent } from './alarmas-ubicacion/alarmas-ubicacion-list/alarmas-ubicacion-list.component';
import { SonidoEventosListComponent } from './sonido-eventos/sonido-eventos-list/sonido-eventos-list.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'test', component: AlarmasUbicacionListComponent}, // Ruta de prueb
  {path: 'alarmas', loadChildren: () => import('./alarmas-ubicacion/alarmas-ubicacion.module').then(m => m.AlarmasUbicacionModule)},
  {path: 'sonidoeventos', loadChildren: () => import('./sonido-eventos/sonido-eventos.module').then(m => m.SonidoEventosModule)},
  { path: '**', component: PageNotFoundComponent } 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
