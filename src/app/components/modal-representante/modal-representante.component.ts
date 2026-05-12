import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalWrapperComponent, FormFieldComponent } from '../../shared';

export interface Representante {
  tipoDoc: string;
  nroDoc: string;
  nombreRL: string;
  nroPartida: string;
  telefono: string;
}

@Component({
  selector: 'app-modal-representante',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalWrapperComponent, FormFieldComponent],
  templateUrl: './modal-representante.component.html',
})
export class ModalRepresentanteComponent implements OnChanges {
  @Input()  datosIniciales: Representante | null = null;
  @Input()  tipoDocumentos: any[] = [];
  @Output() cerrar = new EventEmitter<void>();
  @Output() representanteGuardado = new EventEmitter<Representante>();

  rep: Representante = {
    tipoDoc: '',
    nroDoc: '',
    nombreRL: '',
    nroPartida: '',
    telefono: '',
  };

  ngOnChanges(changes: SimpleChanges) {
    if (changes['datosIniciales'] && this.datosIniciales) {
      this.rep = { ...this.datosIniciales };
    } else if (changes['datosIniciales'] && !this.datosIniciales) {
      this.resetForm();
    }
  }

  resetForm() {
    this.rep = { tipoDoc: '', nroDoc: '', nombreRL: '', nroPartida: '', telefono: '' };
  }

  guardar() {
    if (!this.rep.nroDoc || !this.rep.nombreRL || !this.rep.tipoDoc) return;
    this.representanteGuardado.emit({ ...this.rep });
    this.cerrar.emit();
  }

  soloNumeros(value: string, campo: keyof Representante) {
    const soloNumeros = value.replace(/[^0-9]/g, '');
    this.rep[campo] = soloNumeros;
  }
}