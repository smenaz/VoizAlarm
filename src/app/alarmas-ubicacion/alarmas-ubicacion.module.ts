import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlarmasUbicacionRoutingModule } from './alarmas-ubicacion-routing.module';
import { AlarmasUbicacionListComponent } from './alarmas-ubicacion-list/alarmas-ubicacion-list.component';

@NgModule({
  declarations: [AlarmasUbicacionListComponent], // ✅ Declarado aquí
  imports: [
    CommonModule, // ✅ Necesario para las directivas
    AlarmasUbicacionRoutingModule
  ]
})
export class AlarmasUbicacionModule { }
