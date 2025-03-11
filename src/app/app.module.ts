import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShareModule } from './share/share.module';

// Importa los módulos específicos de Carbon Components Angular
import { TableModule, ButtonModule, IconModule, GridModule, PaginationModule } from 'carbon-components-angular';


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
    ShareModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
