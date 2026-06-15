import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SolicitudStateService } from '../../core/services/solicitud-state.service';
import { ModalDocumentoComponent } from '../../components/modal-documento/modal-documento.component'

@Component({
  selector: 'app-pantalla6-2',
  standalone: true,
  imports: [RouterModule, ModalDocumentoComponent],
  templateUrl: './pantalla6-2.component.html',
  styleUrl: './pantalla6-2.component.css'
})
export class pantalla62Component implements OnInit{
  sidebarOpen = false;
  modalDocumentoVisible = false;
  id_solicitud: any = '';
  tipo_documento: any = '';

  constructor(private state: SolicitudStateService) {}

  ngOnInit() {
    this.state.limpiarState();
  }

  abrirDocumento(id_solicitud: string, numero: number) {
    this.id_solicitud = id_solicitud;
    this.tipo_documento = numero;
    this.modalDocumentoVisible = true;
  }

  cerrarDocumento() {
    this.modalDocumentoVisible = false;
  }
}
