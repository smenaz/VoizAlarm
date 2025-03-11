import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AlarmasUbicacionListComponent } from './alarmas-ubicacion-list/alarmas-ubicacion-list.component';


const routes: Routes = [
   { path: '', redirectTo: 'list', pathMatch: 'full' },
   {  path: 'list',
     component: AlarmasUbicacionListComponent
   }
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AlarmasUbicacionRoutingModule { }
