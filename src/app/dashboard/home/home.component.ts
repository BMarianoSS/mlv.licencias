import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SolicitudService } from '../../core/services/solicitud.service';
import { AuthService } from '../../core/services/auth.service';
import { ModalDetalleSolicitudComponent } from '../../components/modal-detalle-solicitud/modal-detalle-solicitud.component';
import { ModalDocumentoComponent } from '../../components/modal-documento/modal-documento.component';
import { DataTableComponent, TableColumn, GenericModalComponent, PaginationComponent } from '../../shared';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, ModalDetalleSolicitudComponent,
    ModalDocumentoComponent, DataTableComponent, GenericModalComponent, PaginationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private solicitudService: SolicitudService, private authService: AuthService) { }

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
  tipo_documento: number | null = null;
  paginaActual = 1;
  tamanioPagina = 10;
  totalRegistros = 0;
  isLoading = false;

  ngOnInit() {
    this.id_solicitante = this.authService.getUser()?.idSolicitante ?? '';
    this.listarSolicitudes();
  }

  abrirDetalle(id_solicitud: string) {
    this.idSolicitudDetalle = id_solicitud;
    this.modalDetalleVisible = true;
  }

  abrirDocumento(id_solicitud: string, tipo_documento?: number) {
    this.idSolicitudDetalle = id_solicitud;
    if (tipo_documento) {
      this.tipo_documento = tipo_documento;
    }
    this.modalDocumentoVisible = true;
  }

  cerrarDetalle() {
    this.modalDetalleVisible = false;
  }

  cerrarDocumento() {
    this.modalDocumentoVisible = false;
    this.tipo_documento = null;
  }

  listarSolicitudes() {    
    this.isLoading = true;
    this.solicitudService.listarSolicitudes({
      id_solicitante: this.id_solicitante,
      pagina: String(this.paginaActual),
      tamanio_pagina: String(this.tamanioPagina)
    }).subscribe({
          next: (resp) => {
            this.solicitudes = resp.data; this.totalRegistros = resp.data.length ? Number(resp.data[0].totalRegistros) : 0;
            this.isLoading = false;
          },
          error: (err) => {
            this.isLoading = false;
            console.error('Error en aprobarSolicitud:', err);
          }
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

  cambiarPagina(pagina: number) {
    this.paginaActual = pagina;
    this.listarSolicitudes();
  }

  cambiarTamanioPagina(tamanio: number) {
    this.tamanioPagina = tamanio;
    this.paginaActual = 1;
    this.listarSolicitudes();
  }

  columnasSolicitudes: TableColumn[] = [
    { label: 'N° Solicitud', key: 'nroSolicitud', mono: true },
    { label: 'Ubicación del predio', key: 'direccionLocal' },
    { label: 'Fecha registro', key: 'fechaRegistro' },
    { label: 'Estado', key: 'descripcionEstado' },
    { label: 'Firmado', key: 'faltaFirmaTexto' },
    { label: 'Tipo de trámite', key: 'tipoTramite' },
    { label: 'Acciones', actions: true, align: 'center' },
  ];
}
