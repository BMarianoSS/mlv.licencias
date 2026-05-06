import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SolicitudService } from '../../core/services/solicitud.service';

@Component({
  selector: 'app-modal-detalle-solicitud',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-detalle-solicitud.component.html',
})
export class ModalDetalleSolicitudComponent implements OnInit {
  @Output() cerrar = new EventEmitter<void>();
  @Input() id_solicitud: string = ''; 

  constructor(private solicitudService: SolicitudService) { }

  busqueda = '';    
  cargando = true;
  data: any[] = [];
  leaving = false; 

  ngOnInit() {
    if (this.id_solicitud) {
      this.obtenerSolicitud(this.id_solicitud);
    } else {
      this.cargando = false;
    }
  }

  obtenerSolicitud(id_solicitud: string) {
    this.cargando = true;
    this.solicitudService.obtenerSolicitud({ id_solicitud: id_solicitud }).subscribe({
      next: (resp) => {
        this.data = resp.data || [];
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar solicitud:', err);
        this.cargando = false;
        this.data = [];
      }
    });
  }

  cerrarConAnimacion() {
    this.leaving = true;
    setTimeout(() => {
      this.cerrar.emit();
      this.leaving = false;
    }, 100);
  }
}