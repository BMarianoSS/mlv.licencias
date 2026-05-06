import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComboService } from '../../core/services/combo.service';

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
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-representante.component.html',
})
export class ModalRepresentanteComponent implements OnChanges {
  @Input()  datosIniciales: Representante | null = null;
  @Output() cerrar = new EventEmitter<void>();
  @Output() representanteGuardado = new EventEmitter<Representante>();

  constructor(private comboService: ComboService) { }

  tipoDocumentos: any[] = [];

  rep: Representante = {
    tipoDoc: '',
    nroDoc: '',
    nombreRL: '',
    nroPartida: '',
    telefono: '',
  };

  ngOnInit() {
    this.listarTipoDoc();
  }

  // Cuando se abra en modo edición, precarga los datos
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

  listarTipoDoc() {
    this.comboService.listarTipoDoc({}).subscribe(resp => {
      this.tipoDocumentos = resp.data;
    });
  }

  soloNumeros(event: any, campo: keyof Representante) {
    const input = event.target;
    input.value = input.value.replace(/[^0-9]/g, '');
    this.rep[campo] = input.value;
  }
}