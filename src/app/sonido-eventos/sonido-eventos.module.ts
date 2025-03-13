import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SonidoEventosRoutingModule } from './sonido-eventos-routing.module';
import { SonidoEventosListComponent } from './sonido-eventos-list/sonido-eventos-list.component';
import { SonidoEventosCreateComponent } from './sonido-eventos-create/sonido-eventos-create.component';
import { SonidoEventosUpdateComponent } from './sonido-eventos-update/sonido-eventos-update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { ShareModule } from '../share/share.module'; 

// ✅ Importa los módulos de Carbon Components Angular
import { TableModule, ButtonModule, IconModule, GridModule, PaginationModule } from 'carbon-components-angular';
import { ModalModule } from 'carbon-components-angular';
import { NotificationModule } from 'carbon-components-angular';




@NgModule({
  declarations: [
    SonidoEventosListComponent, 
    SonidoEventosCreateComponent, 
    SonidoEventosUpdateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SonidoEventosRoutingModule,
    ShareModule,
    TableModule,       // ✅ Módulo de tabla
    ButtonModule,      // ✅ Botones
    IconModule,        // ✅ Iconos
    GridModule,        // ✅ Grid
    PaginationModule,   // ✅ Módulo de paginación
    ModalModule,
    NotificationModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SonidoEventosModule { }
