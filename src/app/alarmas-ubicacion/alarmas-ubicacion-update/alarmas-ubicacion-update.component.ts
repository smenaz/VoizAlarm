import { Component, EventEmitter, Output, Input, SimpleChanges, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import L from 'leaflet';

@Component({
  selector: 'app-alarmas-ubicacion-update',
  standalone: false,
  templateUrl: './alarmas-ubicacion-update.component.html',
  styleUrl: './alarmas-ubicacion-update.component.scss'
})
export class AlarmasUbicacionUpdateComponent implements OnChanges {

  @Input() alarmaEvento: any = { id: '', nombre: '', ubicacion: '', latitud: '', longitud: '' };
  public latitud: string = '';
  public longitud: string = '';
  @Output() alarmaUpdated = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>(); 

  nuevaAlarma = { id: '', nombre: '', ubicacion: '', latitud: '', longitud: '' };

  private map: L.Map | null = null;
  private marker: L.Marker | null = null;
  public latitude: number = 0;
  public longitude: number = 0;
  public locationName: string = '';

  formGroup: FormGroup;

  formSubmitted = false;

  private nombreUbicacion: string = '';

  id_selected: number = 0;


  // Define the default icon as a property
  private defaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      locationName: ['', Validators.required],
      latitude: ['', [Validators.required, Validators.pattern(/^-?\d+(\.\d+)?$/)]],
      longitude: ['', [Validators.required, Validators.pattern(/^-?\d+(\.\d+)?$/)]],
      id: ''
    });
  }

  ngAfterViewInit(): void {
    // Use a slightly longer timeout to ensure the DOM is fully rendered
    setTimeout(() => {
      this.initMap();
    }, 1000);
  }

  private initMap(): void {
    if (!document.getElementById('map_update')) {
      console.error('Map container not found');
      return;
    }

    // Coordenadas iniciales
    const initialCoords: L.LatLngExpression = [19.4326, -99.1332]; // CDMX, México

    // Inicializar el mapa
    this.map = L.map('map_update', {
      center: initialCoords,
      zoom: 15,
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

    // Add a debug message
    console.log('Map initialized at:', initialCoords);
    
    // Force map to update its size
    setTimeout(() => {
      if (this.map) {
        console.log('Invalidating map size');
        this.map.invalidateSize();
        
        // Add a marker at the initial position to verify marker functionality
        this.addMarker(L.latLng(initialCoords[0], initialCoords[1]));
      }
    }, 1000);
  }

  private addMarker(latlng: L.LatLng): void {
    if (!this.map) {
      console.error('Map not initialized');
      return;
    }
  
    console.log('Adding marker at:', latlng);
  
    // Remove existing marker if any
    if (this.marker) {
      this.map.removeLayer(this.marker);
    }
  
    // Create new marker with explicit icon
    this.marker = L.marker(latlng, {
      icon: this.defaultIcon
    }).addTo(this.map).bindPopup("Selected location")
    .openPopup();
  
    // Update form values
    this.latitude = latlng.lat;
    this.longitude = latlng.lng;
    
    // Update form controls
    this.formGroup.patchValue({
      latitude: this.latitude.toString(),
      longitude: this.longitude.toString()
    });
    
    console.log('Marker added, coordinates updated:', this.latitude, this.longitude);
  }
  
  saveLocation(): void {
    if (this.formGroup.valid) {
      const newLocation = {
        nombre: this.locationName,
        latitud: this.latitude,
        longitud: this.longitude
      };
      
      this.alarmaUpdated.emit(newLocation);
      console.log('Guardando ubicación:', newLocation);
      this.closeModal();
    } else {
      console.error('Form is invalid');
      alert('Por favor completa todos los campos y selecciona una ubicación en el mapa.');
    }
  }

  cancel(): void {
    this.clearForm();
  }

  cancelCreation(): void {
    this.clearForm();
    this.closeModal();
  }

  private clearForm(): void {
    this.locationName = '';
    this.latitude = 0;
    this.longitude = 0;
    this.formGroup.reset();
    
    if (this.marker && this.map) {
      this.marker.remove();
      this.marker = null;
    }
  }

  closeModal() {
    this.resetForm();
    this.close.emit();
  }

  guardarAlarma() {
    console.log('🔄 Guardar cambios en la alarma');
  
    // Marcar los campos como "touched" para mostrar validaciones
    this.formSubmitted = true;
    Object.keys(this.formGroup.controls).forEach(key => {
      this.formGroup.get(key)?.markAsTouched();
    });
  
    if (this.formGroup.valid) {
      const values = this.formGroup.value;
      this.nuevaAlarma = {
        id: this.alarmaEvento.id, // ✅ Mantener el ID
        nombre: values.locationName,
        ubicacion: `${values.latitude}, ${values.longitude}`,
        latitud: values.latitude,
        longitud: values.longitude
      };
  
      console.log('✅ Enviando nueva alarma:', this.nuevaAlarma);
      
      this.alarmaUpdated.emit(this.nuevaAlarma); // ✅ Enviar actualización al componente padre
  
      setTimeout(() => {
        console.log('✅ Cerrando modal después de guardar');
        this.close.emit(); // ✅ Cerrar el modal
      }, 500); // ✅ Dar un pequeño delay para asegurar que se ejecuta
    } else {
      console.error('❌ Formulario no válido');
    }
  }
  

  // Método para resetear el formulario completamente
  private resetForm() {
    // Resetear el formulario
    this.formGroup.reset();
    
    // Resetear variables locales
    this.locationName = '';
    this.latitude = 0;
    this.longitude = 0;
    
    // Eliminar el marcador del mapa
    if (this.marker && this.map) {
      this.marker.remove();
      this.marker = null;
    }
    
    // Resetear el estado de envío del formulario
    this.formSubmitted = false;
    
    // Opcional: volver a centrar el mapa en la posición inicial
    if (this.map) {
      this.map.setView([19.4326, -99.1332], 15);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('🔍 ngOnChanges se ejecutó:', changes);
  
    // Validar si alarmaEvento ha cambiado y tiene datos válidos
    if (changes['alarmaEvento'] && changes['alarmaEvento'].currentValue) {
      this.procesarUbicacion();
    } else {
      console.warn('⚠️ alarmaEvento aún no tiene datos, esperando actualización...');
    }
  }
  
private procesarUbicacion(): void {
    console.log('🔍 Verificando `alarmaEvento.ubicacion`:', this.alarmaEvento.ubicacion);

    if (!this.alarmaEvento || !this.alarmaEvento.ubicacion || typeof this.alarmaEvento.ubicacion !== 'string') {
      console.error('❌ Datos inválidos en alarmaEvento:', this.alarmaEvento);
      return;
    }

    const ubicacionArray = this.alarmaEvento.ubicacion.split(',').map((coord: string) => coord.trim());

    console.log('📌 Resultado de `split()`: ', ubicacionArray);
    
    if (ubicacionArray.length === 2) {
        this.latitude = parseFloat(ubicacionArray[0]);
        this.longitude = parseFloat(ubicacionArray[1]);

        console.log('✅ Ubicación cargada correctamente:', this.latitude, this.longitude);

        if (this.map) {
            console.log('🗺️ Actualizando vista del mapa...');
            this.map.setView([this.latitude, this.longitude], 15);
            this.addMarker(L.latLng(this.latitude, this.longitude));
        }
    } else {
        console.error('❌ Error: Coordenadas mal formateadas', ubicacionArray);
    }
}

  

  

}
