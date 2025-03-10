import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlarmasUbicacionRoutingModule } from './alarmas-ubicacion-routing.module';
import { AlarmasUbicacionListComponent } from './alarmas-ubicacion-list/alarmas-ubicacion-list.component';
import { AlarmasUbicacionCreateComponent } from './alarmas-ubicacion-create/alarmas-ubicacion-create.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms'; 

@NgModule({
  declarations: [AlarmasUbicacionListComponent, AlarmasUbicacionCreateComponent], // ✅ Declarado aquí
  imports: [
    CommonModule, // ✅ Necesario para las directivas
    FormsModule, 
    ReactiveFormsModule,
    AlarmasUbicacionRoutingModule
  ]
})
export class AlarmasUbicacionModule { }
