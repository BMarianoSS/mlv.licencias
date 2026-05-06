import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SolicitudService } from '../../core/services/solicitud.service';
import { AuthService } from '../../core/services/auth.service';
import { ModalDetalleSolicitudComponent } from '../../components/modal-detalle-solicitud/modal-detalle-solicitud.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, ModalDetalleSolicitudComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent{
  constructor(private solicitudService: SolicitudService, private authService:AuthService) {}

  sidebarOpen = false;
  solicitudes: any[] = [];
  mensaje: any[] = [];
  modalConfirmarVisible = false;
  modalConfirmarLeaving = false;
  modalRespuestaVisible = false;
  modalRespuestaLeaving = false;
  idSolicitudPendiente: string = '';
  mensajeRespuesta: string = '';
  modalDetalleVisible = false;
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

  cerrarDetalle() {
    this.modalDetalleVisible = false;
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
}
