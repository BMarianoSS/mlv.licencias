import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router , RouterModule } from '@angular/router';
import { ComboService } from '../../core/services/combo.service'
import { RegistroStateService } from '../../core/services/registro-state.service';

@Component({
  selector: 'app-registro-paso-1',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './registro-paso-1.component.html',
})
export class RegistroPaso1Component {
  tipoPersonas: any[]       = [];
  tipoPersonaSeleccionada   = '';
  tipoDocumentos: any[]     = [];
  tipoDocumentoSeleccionado = '';
  nroDocumento              = '';
  nombres                   = '';
  apellidoPaterno           = '';
  apellidoMaterno           = '';
  razonSocial           = '';

  constructor(
    private comboService: ComboService,
    private state: RegistroStateService,
    private router: Router
  ) { }

  ngOnInit() {
    this.listarTiposDocumento();
    this.listarTiposPersona();
  }

  listarTiposDocumento() {
    const payload = {};

    this.comboService.listarTipoDoc(payload)
      .subscribe(resp => {
        this.tipoDocumentos = resp.data;
      });
  }

  listarTiposPersona() {
    const payload = {};

    this.comboService.listarTipoPersona(payload)
      .subscribe(resp => {
        this.tipoPersonas = resp.data;
      });
  }

  get formularioValido(): boolean {
    const base = !!(this.tipoPersonaSeleccionada);

    if (this.tipoPersonaSeleccionada === '1') {
      return base && !!(this.nombres && this.apellidoPaterno && this.apellidoMaterno && this.tipoDocumentoSeleccionado && this.nroDocumento);
    }
    if (this.tipoPersonaSeleccionada === '2') {
      return base && !!(this.razonSocial);
    }
    return false;
  }

  filtrarNumeros(event: any): void {
    const input = event.target;
    let valor = input.value;
    valor = valor.replace(/[^0-9]/g, ''); 
    input.value = valor;
    this.nroDocumento = valor;
  }

    siguiente() {
    this.state.paso1 = {
      tipoPersona:     this.tipoPersonaSeleccionada,
      tipoDocumento:   this.tipoDocumentoSeleccionado,
      nroDocumento:    this.nroDocumento,
      nombres:         this.tipoPersonaSeleccionada === '1' ? this.nombres : '',
      apellidoPaterno: this.tipoPersonaSeleccionada === '1' ? this.apellidoPaterno : '',
      apellidoMaterno: this.tipoPersonaSeleccionada === '1' ? this.apellidoMaterno : '',
      razonSocial:     this.tipoPersonaSeleccionada === '2' ? this.razonSocial : '',
    };
    this.router.navigate(['/registro/paso-2']);
  }
}