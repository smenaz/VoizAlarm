import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sonido-eventos-update',
  standalone: false,
  templateUrl: './sonido-eventos-update.component.html',
  styleUrls: ['./sonido-eventos-update.component.css']
})
export class SonidoEventosUpdateComponent {
  @Input() sonidoEvento: any;
  @Output() close = new EventEmitter<void>();
  @Output() sonidoActualizado = new EventEmitter<any>(); // Notifica cambios

  formGroup: FormGroup;
  formSubmitted = false;

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      eventoName: ['', Validators.required],
      sonidoName: ['', Validators.required]
    });
  }

  cerrarModal() {
    this.close.emit();
  }

  guardarCambios() {
    console.log('Guardando cambios:', this.sonidoEvento);
    this.sonidoActualizado.emit(this.sonidoEvento); // Envía el sonido actualizado
    //this.cerrarModal(); // Cierra el modal después de guardar
  }
  private focusFirstInvalidField() {
    const firstInvalidControl = Object.keys(this.formGroup.controls)
      .find(key => this.formGroup.get(key)?.invalid);

    if (firstInvalidControl) {
      const invalidElement = document.querySelector(`[formControlName="${firstInvalidControl}"]`);
      if (invalidElement) {
        (invalidElement as HTMLElement).focus();
      }
    }
  }
}