import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShareModule } from './share/share.module';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Importa los módulos específicos de Carbon Components Angular
import { TableModule, ButtonModule, IconModule, GridModule, PaginationModule } from 'carbon-components-angular';
import { AlarmasUbicacionModule } from './alarmas-ubicacion/alarmas-ubicacion.module';
import { SonidoEventosModule } from './sonido-eventos/sonido-eventos.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TableModule,  // Para la tabla
    ButtonModule,  // Botones
    IconModule,    // Iconos
    GridModule,
    PaginationModule,
    ShareModule,
    AlarmasUbicacionModule,
    SonidoEventosModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
