import { Component } from '@angular/core';
declare var bootstrap: any;

@Component({
  selector: 'app-alarmas-ubicacion-list',
  standalone: false,
  templateUrl: './alarmas-ubicacion-list.component.html',
  styleUrls: ['./alarmas-ubicacion-list.component.css']
})
export class AlarmasUbicacionListComponent {

  alarmas = [
    { nombre: 'Casa', ubicacion: 'lat 10.838383, long 19.7373' },
    { nombre: 'Trabajo', ubicacion: 'Marcha' },
    { nombre: 'Gym', ubicacion: 'Mundial 2014' },
    { nombre: 'Escuela', ubicacion: 'Olas del Mar' },
    { nombre: 'Curso', ubicacion: 'Motivación' }
  ];


  openCreateModal(): void {
    const modalElement = document.getElementById('createAlarmaUbicacionModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  onAlarmaCreated():void {
    
  }


}
