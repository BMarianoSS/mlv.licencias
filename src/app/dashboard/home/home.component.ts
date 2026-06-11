import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SolicitudService } from '../../core/services/solicitud.service';
import { AuthService } from '../../core/services/auth.service';
import { ModalDetalleSolicitudComponent } from '../../components/modal-detalle-solicitud/modal-detalle-solicitud.component';
import { ModalDocumentoComponent } from '../../components/modal-documento/modal-documento.component';
import { DataTableComponent, TableColumn } from '../../shared';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, ModalDetalleSolicitudComponent, ModalDocumentoComponent, DataTableComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent{
  constructor(private solicitudService: SolicitudService, private authService:AuthService) {}

  sidebarOpen = false;
  solicitudes: any[] = [];  
  modalConfirmarVisible = false;
  modalConfirmarLeaving = false;
  modalRespuestaVisible = false;
  modalRespuestaLeaving = false;
  modalDocumentoVisible = false;
  modalDetalleVisible = false;
  idSolicitudPendiente: string = '';
  mensajeRespuesta: string = '';
  idSolicitudDetalle: string = '';
  id_solicitante: any = '';

  ngOnInit() {
    this.id_solicitante = this.authService.getUser()?.idSolicitante ?? '';    
    this.listarSolicitudes();
  }

  abrirDetalle(id_solicitud: string) {
    this.idSolicitudDetalle = id_solicitud;
    this.modalDetalleVisible = true;
  }

  abrirDocumento(id_solicitud: string) {
    this.idSolicitudDetalle = id_solicitud;
    this.modalDocumentoVisible = true;
  }

  cerrarDetalle() {
    this.modalDetalleVisible = false;
  }

  cerrarDocumento() {
    this.modalDocumentoVisible = false;
  }

  listarSolicitudes() {
    this.solicitudService.listarSolicitudes({id_solicitante: this.id_solicitante}).subscribe(resp => {
      this.solicitudes = resp.data;
    });
  }

  abrirConfirmacionDesistir(id_solicitud: string) {
    this.idSolicitudPendiente = id_solicitud;
    this.modalConfirmarVisible = true;
    this.modalConfirmarLeaving = false;
  }

  cerrarModalConfirmar() {
    this.modalConfirmarLeaving = true;
    setTimeout(() => {
      this.modalConfirmarVisible = false;
      this.modalConfirmarLeaving = false;
    }, 100);
  }

  confirmarDesistir() {
    this.cerrarModalConfirmar();
    setTimeout(() => {
      this.solicitudService.desistirSolicitud({ id_solicitud: this.idSolicitudPendiente }).subscribe(resp => {
        this.mensajeRespuesta = resp.data.mensaje;
        this.modalRespuestaVisible = true;
        this.modalRespuestaLeaving = false;
        this.listarSolicitudes();
      });
    }, 120);
  }

  cerrarModalRespuesta() {
    this.modalRespuestaLeaving = true;
    setTimeout(() => {
      this.modalRespuestaVisible = false;
      this.modalRespuestaLeaving = false;
    }, 100);
  }

  columnasSolicitudes: TableColumn[] = [
    { label: 'N° Solicitud',         key: 'nroSolicitud',      mono: true },
    { label: 'Ubicación del predio', key: 'direccionLocal' },
    { label: 'Fecha registro',       key: 'fechaRegistro' },
    { label: 'Estado',               key: 'descripcionEstado' },
    { label: 'Tipo de trámite',      key: 'tipoTramite' },
    { label: 'Acciones',             actions: true, align: 'center' },
  ];
}
