import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SolicitudStateService } from '../../core/services/solicitud-state.service';
import { ModalDocumentoComponent } from '../../components/modal-documento/modal-documento.component'

@Component({
  selector: 'app-pantalla6-2',
  standalone: true,
  imports: [CommonModule, RouterModule, ModalDocumentoComponent],
  templateUrl: './pantalla6-2.component.html',
  styleUrl: './pantalla6-2.component.css'
})
export class pantalla62Component {
  sidebarOpen = false;
  modalDocumentoVisible = false;
  id_solicitud: string = '';
  tipo_documento: number | null = null;

  constructor(private state: SolicitudStateService) {}

  abrirDocumento(numero: number) {
    this.id_solicitud = this.state.idSolicitudGenerada || this.state.idSolicitudCreada;
    this.tipo_documento = numero;
    this.modalDocumentoVisible = true;
  }

  cerrarDocumento() {
    this.modalDocumentoVisible = false;
  }
}
