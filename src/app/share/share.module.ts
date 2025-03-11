import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Componentes compartidos
import { NavbarComponent } from './navbar/navbar.component';


// Angular Material Modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,

    // Formularios (si los necesitas en tus componentes)
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    NavbarComponent,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ShareModule { }
