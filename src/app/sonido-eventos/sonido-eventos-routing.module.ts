import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SonidoEventosListComponent } from './sonido-eventos-list/sonido-eventos-list.component';


const routes: Routes = [
   { path: '', redirectTo: 'list', pathMatch: 'full' },
   {  path: 'list',
     component: SonidoEventosListComponent
   }
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SonidoEventosRoutingModule { }
