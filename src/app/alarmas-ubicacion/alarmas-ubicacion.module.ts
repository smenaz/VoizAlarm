import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlarmasUbicacionRoutingModule } from './alarmas-ubicacion-routing.module';
import { AlarmasUbicacionListComponent } from './alarmas-ubicacion-list/alarmas-ubicacion-list.component';
import { AlarmasUbicacionCreateComponent } from './alarmas-ubicacion-create/alarmas-ubicacion-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { ShareModule } from '../share/share.module'; 

// ✅ Importa los módulos de Carbon Components Angular
import { TableModule, ButtonModule, IconModule, GridModule, PaginationModule } from 'carbon-components-angular';
import { ModalModule } from 'carbon-components-angular';
import { NotificationModule } from 'carbon-components-angular';



@NgModule({
  declarations: [
    AlarmasUbicacionListComponent, 
    AlarmasUbicacionCreateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AlarmasUbicacionRoutingModule,
    ShareModule,
    TableModule,       // ✅ Módulo de tabla
    ButtonModule,      // ✅ Botones
    IconModule,        // ✅ Iconos
    GridModule,        // ✅ Grid
    PaginationModule,   // ✅ Módulo de paginación
    ModalModule,
    NotificationModule  
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AlarmasUbicacionModule { }
