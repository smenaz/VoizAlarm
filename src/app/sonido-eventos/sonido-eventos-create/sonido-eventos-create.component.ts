import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sonido-eventos-create',
  standalone: false,
  templateUrl: './sonido-eventos-create.component.html',
  styleUrls: ['./sonido-eventos-create.component.css']
})
export class SonidoEventosCreateComponent {
  @Output() sonidoEventoCreated = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>(); 

  formGroup: FormGroup;
  formSubmitted = false;

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      eventoName: ['', Validators.required],
      sonidoName: ['', Validators.required]
    });
  }

  guardarSonidoEvento() {
    console.log('Guardar Sonido Evento');

    this.formSubmitted = true;

    Object.keys(this.formGroup.controls).forEach(key => {
      this.formGroup.get(key)?.markAsTouched();
    });

    if (this.formGroup.valid) {
      const values = this.formGroup.value;
      const nuevoSonidoEvento = {
        evento: values.eventoName,
        sonido: values.sonidoName
      };

      console.log('Enviando nuevo sonido evento:', nuevoSonidoEvento);
      this.sonidoEventoCreated.emit(nuevoSonidoEvento);

      this.resetForm();
      this.closeModal();
    } else {
      this.focusFirstInvalidField();
    }
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

  cancelar() {
    this.resetForm();
  }

  cancelarCreacion() {
    this.resetForm();
    this.closeModal();
  }

  closeModal() {
    this.resetForm();
    this.close.emit();
  }

  private resetForm() {
    this.formGroup.reset();
    this.formSubmitted = false;
  }
}
