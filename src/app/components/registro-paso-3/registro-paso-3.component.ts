import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ComboService } from '../../core/services/combo.service';
import { RegistroStateService } from '../../core/services/registro-state.service';
import { AuthService } from '../../core/services/auth.service';
import { filtrarSoloNumeros } from '../../core/utils/form.utils';
import { SectionHeaderComponent, NavButtonsComponent, FormFieldComponent } from '../../shared';

@Component({
  selector: 'app-registro-paso-3',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, SectionHeaderComponent, NavButtonsComponent, FormFieldComponent],
  templateUrl: './registro-paso-3.component.html',
})
export class RegistroPaso3Component implements OnInit {
  repNombre                    = '';
  repNroDocumento              = '';
  repNroPartida                = '';
  repTelefono                  = '';
  repTipoDocumentos: any[]     = [];
  repTipoDocumentoSeleccionado = '';
  repAsientoSunarp = '';

  mostrarModal = false;
  modalExito   = false;
  modalMensaje = '';
  cargando     = false;
  
  filtrarNumeros = filtrarSoloNumeros;

  constructor(
    private comboService: ComboService,
    private state: RegistroStateService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.listarTiposDocumento();
  }

  listarTiposDocumento() {
    this.comboService.listarTipoDoc({})
      .subscribe(resp => this.repTipoDocumentos = resp.data);
  }

  get formularioValido(): boolean {
    return !!(this.repNombre && this.repTipoDocumentoSeleccionado &&
      this.repNroDocumento && this.repTelefono);
  }

  registrar() {
    const { paso1, paso2 } = this.state;

    const payload = {
      tipo_persona:               paso1.tipoPersona,
      tipo_documento:             paso1.tipoDocumento,
      nro_documento:              paso1.nroDocumento,
      nombres:                    paso1.nombres,
      apellido_paterno:           paso1.apellidoPaterno,
      apellido_materno:           paso1.apellidoMaterno,
      correo:                     paso2.correo,
      password_hash:              paso2.password,
      telefono:                   paso2.telefono,
      nro_ruc:                    paso2.nroRuc,
      denominacion:               paso2.denominacion,
      direccion:                  paso2.direccion,
      numero_direccion:           paso2.numero,
      interior:                   paso2.interior,
      manzana:                    paso2.manzana,
      lote:                       paso2.lote,
      departamento:               paso2.departamento,
      provincia:                  paso2.provincia,
      distrito:                   paso2.distrito,
      rep_legal_nombre:           this.repNombre,
      rep_legal_tipo_documento:   this.repTipoDocumentoSeleccionado,
      rep_legal_nro_documento:    this.repNroDocumento,
      rep_legal_nro_partida:      this.repNroPartida,
      rep_legal_telefono:         this.repTelefono,
      flag_discapacidad:          paso2.discapacidad,
      nro_partida_electronica:    '',
      nro_asiento_sunarp:         this.repAsientoSunarp,
      operador:                   'Sistemas',
      estacion:                   '',
    };

    this.cargando = true;

    this.authService.crearUsuario(payload).subscribe({
      next: (resp) => {
        this.modalExito   = resp.data.success === 'True';
        this.modalMensaje = resp.data.mensaje;
        this.mostrarModal = true;
        this.cargando     = false;
      },
      error: () => {
        this.modalExito   = false;
        this.modalMensaje = 'Error al conectar con el servidor.';
        this.mostrarModal = true;
        this.cargando     = false;
      }
    });
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    if (this.modalExito) {
      this.router.navigate(['/login']);
    }
  }
}