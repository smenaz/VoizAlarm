import { Component, AfterViewInit, EventEmitter, Output } from '@angular/core';
import * as L from 'leaflet';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-alarmas-ubicacion-create',
  standalone: false,
  templateUrl: './alarmas-ubicacion-create.component.html',
  styleUrl: './alarmas-ubicacion-create.component.css'
})
export class AlarmasUbicacionCreateComponent implements AfterViewInit {

  @Output() alarmaCreated = new EventEmitter<any>();

  @Output() close = new EventEmitter<void>(); 

  nuevaAlarma = { nombre: '', ubicacion: '', latitud: '', longitud: '' };


  private map: L.Map | null = null;
  private marker: L.Marker | null = null;
  public latitude: number = 0;
  public longitude: number = 0;
  public locationName: string = '';

  formGroup: FormGroup;


  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      locationName: ['', Validators.required],
      latitude: ['', [Validators.required, Validators.pattern(/^-?\d+(\.\d+)?$/)]],
      longitude: ['', [Validators.required, Validators.pattern(/^-?\d+(\.\d+)?$/)]]
    });
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    // Coordenadas iniciales (puedes ajustarlas a una ubicación por defecto)
    const initialCoords: L.LatLngExpression = [19.4326, -99.1332]; // CDMX, México

    // Inicializar el mapa
    this.map = L.map('map', {
      center: initialCoords,
      zoom: 15, // Aumenta el zoom para ver más detalles
      zoomControl: true
    });

    // Añadir la capa de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    // Añadir evento de clic al mapa
    this.map.on('click', (e: L.LeafletMouseEvent) => {
      this.addMarker(e.latlng);
    });
  }

  private addMarker(latlng: L.LatLng): void {
    // Verificar que el mapa existe
    if (!this.map) return;
    
    // Si ya existe un marcador, removerlo
    if (this.marker) {
      this.marker.remove(); // Alternativa más segura
    }
  
    // Crear un nuevo marcador
    this.marker = L.marker(latlng).addTo(this.map);
    
    // Actualizar los valores de latitud y longitud
    this.latitude = latlng.lat;
    this.longitude = latlng.lng;
  }
  saveLocation(): void {
    if (this.latitude && this.longitude && this.locationName) {
      const newLocation = {
        nombre: this.locationName,
        latitud: this.latitude,
        longitud: this.longitude
      };
      
      // Emitir el evento con la nueva ubicación
      this.alarmaCreated.emit(newLocation);
      
      // Aquí puedes añadir lógica para guardar en un servicio
      console.log('Guardando ubicación:', newLocation);
    } else {
      alert('Por favor completa todos los campos y selecciona una ubicación en el mapa.');
    }
  }

  cancel(): void {
    // Limpiar formulario o cerrar modal
    this.locationName = '';
    this.latitude = 0;
    this.longitude = 0;
    if (this.marker && this.map) {
      this.marker.remove(); // o this.marker.removeFrom(this.map);
      this.marker = null;
    }
  }

  cancelCreation(){
    this.locationName = '';
    this.latitude = 0;
    this.longitude = 0;
    if (this.marker && this.map) {
      this.marker.remove(); // o this.marker.removeFrom(this.map);
      this.marker = null;
    }
  }

  closeModal() {
    this.close.emit(); // ✅ Emitimos el evento para que el padre cierre el modal
  }

  guardarAlarma() {
    console.log('Alarma guardada:', this.nuevaAlarma);
    this.closeModal(); // ✅ Cierra el modal después de guardar
  }


}
