import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { SolicitudService } from '../../core/services/solicitud.service'
import { ComboService } from '../../core/services/combo.service'
import { SolicitudStateService } from '../../core/services/solicitud-state.service';
import { AuthService } from '../../core/services/auth.service';
import { ModalPreguntasComponent } from '../../components/modal-preguntas/modal-preguntas.component';
import { AnexosStateService } from '../../core/services/anexos-state.service';
import { filtrarSoloNumeros } from '../../core/utils/form.utils';
import { NavButtonsComponent } from '../../shared';

Chart.register(...registerables);
@Component({
  selector: 'app-pantalla4',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, 
    ModalPreguntasComponent, NavButtonsComponent],
  templateUrl: './pantalla4.component.html',
  styleUrl: './pantalla4.component.css'
})

export class pantalla4Component {
  constructor(
    private state: SolicitudStateService,
    private authService: AuthService,
    private solicitudService: SolicitudService,
    private anexosState: AnexosStateService,
    private comboService: ComboService
  ) { }

  sidebarOpen = false;
  funciones: any[] = [];
  funcionSeleccionado = '';
  nroLicenciaPadre: string = '';
  anioLicenciaPadre: string = '';

  check1 = false;
  check2 = false;
  check3 = false;

  anexo1Descargado = false;
  anexo2Descargado = false;
  anexo3Descargado = false;
  anexo4Descargado = false;

  anexo1Step = 1;
  anexo2Step = 1;
  anexo3Step = 1;
  anexo4Step = 1;

  anexo1: File | null   = null;
  anexo2: File | null   = null;
  anexo3: File | null   = null;
  anexo4: File | null   = null;

  nroAnexoModal: any    = '';
  idFuncionModal: any   = '';
  mostrarModalPreguntas = false;

  anexo1PreguntasRespondidas = false;
  anexo2PreguntasRespondidas = false;
  anexo3PreguntasRespondidas = false;
  anexo4PreguntasRespondidas = false;

  prefillDatos: Record<string, any> = {};
  nombreFuncionSeleccionada = '';

  isloading = false;
  loadingText = 'Descargando archivo';
  private loadingInterval: any;
    
  filtrarNumeros = filtrarSoloNumeros;

  get esTipoEspecial(): boolean {
    return this.state.idTipoLicencia === '3';
  }

  onFileChange(event: Event, anexo: 'anexo1' | 'anexo2' | 'anexo3' | 'anexo4') {
    const input = event.target as HTMLInputElement;
    this[anexo] = input.files?.[0] ?? null;
  }

  onFuncionChange(idSeleccionado: string) {
    this.funcionSeleccionado = idSeleccionado;
    const funcion = this.funciones.find(f => f.idFunciones == idSeleccionado);
    this.nombreFuncionSeleccionada = funcion ? funcion.nombre : '';
  }

  padNroLicencia() {
    if (this.nroLicenciaPadre.trim()) {
      this.nroLicenciaPadre = this.nroLicenciaPadre.padStart(7, '0');
    }
  }

  iniciarAnimacionLoading() {
    let dots = 0;
    this.loadingText = 'Descargando archivo';

    this.loadingInterval = setInterval(() => {
      dots = (dots + 1) % 4;
      this.loadingText = 'Descargando archivo' + '.'.repeat(dots);
    }, 500);
  }

  detenerAnimacionLoading() {
    clearInterval(this.loadingInterval);
  }

  get formularioValido(): boolean {
    if (this.esTipoEspecial) {
      return (
        this.nroLicenciaPadre.trim() !== '' &&
        this.anioLicenciaPadre.trim() !== ''
      );
    }

    const esSalud = this.funcionSeleccionado === '1';
    return (
      this.check1 &&
      this.check2 &&
      (!esSalud || this.check3) &&
      this.funcionSeleccionado !== '' &&
      this.anexo1PreguntasRespondidas &&
      this.anexo2PreguntasRespondidas &&
      this.anexo3PreguntasRespondidas &&
      this.anexo4PreguntasRespondidas &&
      this.anexo1 !== null &&
      this.anexo2 !== null &&
      this.anexo3 !== null &&
      this.anexo4 !== null
    );
  }

  ngOnInit() {
    this.listarFuncione();
    this.restaurarDesdeState();
  }

  restaurarDesdeState() {
    const s = this.state;
    if (!s.d_jurada) return;

    this.check1              = s.check1;
    this.check2              = s.check2;
    this.check3              = s.check3;
    this.funcionSeleccionado = s.funcionSeleccionado;
    this.nroLicenciaPadre    = s.nro_licencia_padre;
    this.anioLicenciaPadre   = s.anio_licencia_padre;
  }

  listarFuncione() {
    const payload = {};

    this.comboService.listarFunciones(payload)
      .subscribe(resp => {
        this.funciones = resp.data;
      });
  }

  generarYDescargarAnexo(numero: number) {
    const variables = this.anexosState.get(String(numero), this.funcionSeleccionado);
    this.isloading = true;
    this.iniciarAnimacionLoading();
    
    this.solicitudService.generarAnexoPdf(numero, variables).subscribe({
      next: (response) => {
        const nombre = response.headers.get('X-File-Name') ?? `Anexo_${numero}.pdf`;
        const url = window.URL.createObjectURL(response.body!);
        const a = document.createElement('a');
        a.href = url;
        a.download = nombre;
        a.click();
        window.URL.revokeObjectURL(url);

        switch (numero) {
          case 1: this.anexo1Descargado = true; this.anexo1Step = 3; break;
          case 2: this.anexo2Descargado = true; this.anexo2Step = 3; break;
          case 3: this.anexo3Descargado = true; this.anexo3Step = 3; break;
          case 4: this.anexo4Descargado = true; this.anexo4Step = 3; break;
        }

        this.detenerAnimacionLoading();
        this.isloading = false;
      },
      error: (err) => {
        console.error('Error generando PDF:', err) 
        this.detenerAnimacionLoading();
        this.isloading = false;
      }
    });
  }

  abrirModalPreguntas(nroAnexo: string) {
    if (!this.funcionSeleccionado) return;
    
    const user = this.authService.getUser() ?? {};
    const nombreCompleto = user.nombres + ' ' + user.apellidoPaterno  + ' '  + user.apellidoMaterno
    this.prefillDatos = {
      giros:               this.state.giros         ?? '',      
      girostxt:            this.state.descrip_giro  ?? '',
      tipoDocumento:       user.tipoDocumento       ?? '',
      nroDocumento:        user.nroDocumento        ?? '',
      correo:              user.correo              ?? '',
      telefono:            user.telefono            ?? '',
      telefono2:           user.telefono2           ?? '',
      razonSocial:         user.razonSocial         ?? '',
      nroRUC:              user.nroRUC              ?? '',
      nombres:             nombreCompleto           ?? '',
      direccion:           user.direccion           ?? '',
      direccion2:          this.state.direccionEstablecimientoCombinada ?? '',
      referenciaDireccion: user.referenciaDireccion ?? '',
      departamentotxt:     user.departamentotxt     ?? '',
      provinciatxt:        user.provinciatxt        ?? '',
      distritotxt:         user.distritotxt         ?? '',
      departamento:        user.departamento        ?? '',
      provincia:           user.provincia           ?? '',
      distrito:            user.distrito            ?? '',
      desde:               this.state.horaini       ?? '',
      hasta:               this.state.horafin       ?? '',
      areaLocal:           this.state.areaLocal     ?? '',
      nombre:              this.state.descEstablecimiento ?? '',
      funcion:             this.nombreFuncionSeleccionada ?? '',
    };

    this.nroAnexoModal  = nroAnexo;
    this.idFuncionModal = this.funcionSeleccionado;
    this.mostrarModalPreguntas = true;
  }

  onPreguntasRespondidas(nroAnexo: string) {
    this.mostrarModalPreguntas = false;
    switch (nroAnexo) {
      case '1': this.anexo1PreguntasRespondidas = true; this.anexo1Step = 2; break;
      case '2': this.anexo2PreguntasRespondidas = true; this.anexo2Step = 2; break;
      case '3': this.anexo3PreguntasRespondidas = true; this.anexo3Step = 2; break;
      case '4': this.anexo4PreguntasRespondidas = true; this.anexo4Step = 2; break;
    }
  }

  guardarState() {
    const esSalud = this.funcionSeleccionado === '1';
    this.state.d_jurada  = [
      this.check1 ? '1' : '0',
      this.check2 ? '1' : '0',
      (esSalud && this.check3) ? '1' : '0',
      this.funcionSeleccionado
    ].join('-');

    this.state.anexos_dj = [
      this.anexo1 ? '1' : '0',
      this.anexo2 ? '2' : '0',
      this.anexo3 ? '3' : '0',
      this.anexo4 ? '4' : '0',
    ].join('-');

    this.state.d_jurada = [
      this.check1 ? '1' : '0',
      this.check2 ? '2' : '0',
      this.check3 ? '3' : '0',
    ].join('-');

    this.state.anexo1_path          = this.anexo1;
    this.state.anexo2_path          = this.anexo2;
    this.state.anexo3_path          = this.anexo3;
    this.state.anexo4_path          = this.anexo4;
    this.state.nro_licencia_padre   = this.nroLicenciaPadre;
    this.state.anio_licencia_padre  = this.anioLicenciaPadre;
    this.state.check1               = this.check1;
    this.state.check2               = this.check2;
    this.state.check3               = this.check3;
    this.state.funcionSeleccionado  = this.funcionSeleccionado;
  }
}
