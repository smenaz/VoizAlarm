import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Importa los módulos específicos de Carbon Components Angular
import { ButtonModule, IconModule, GridModule } from 'carbon-components-angular';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,  // Botones
    IconModule,    // Iconos
    GridModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
