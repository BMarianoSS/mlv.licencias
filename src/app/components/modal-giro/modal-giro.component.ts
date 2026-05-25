import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SolicitudService } from '../../core/services/solicitud.service'
import { ModalWrapperComponent } from '../../shared'

export interface Giro {
  codigo:       string;
  descripcion:  string;
  coduso:       string;
  nivelRiesgo:  string;
}

@Component({
  selector: 'app-modal-giro',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalWrapperComponent],
  templateUrl: './modal-giro.component.html',
})
export class ModalGiroComponent {
  @Output() cerrar = new EventEmitter<void>();
  @Output() giroSeleccionado = new EventEmitter<Giro>();
  @Input() girosSeleccionados: Giro[] = [];
  @Input() id_zonificacion:any = '';
  @Input() valores:any = '';

  constructor(private solicitudService: SolicitudService) { }

  busqueda = '';
  catalogo: Giro[] = [];
  cargando = true;

  get catalogoFiltrado() {
    const q = this.busqueda.toLowerCase();
    return this.catalogo.filter(g => {
      const yaAgregado = this.girosSeleccionados.some(s => s.codigo === g.codigo);
      const coincide = g.coduso.toLowerCase().includes(q) || g.descripcion.toLowerCase().includes(q);
      return !yaAgregado && coincide;
    });
  }

  seleccionar(giro: Giro) {
    this.giroSeleccionado.emit(giro);
    this.cerrar.emit();
  }

  ngOnInit() {
    this.listarGiros();
  }

  listarGiros() {
    this.cargando = true;
    const payload = {
      id_zonificacion:this.id_zonificacion,
      valores: this.valores
    };

    this.solicitudService.listarGirosPorZonificacion(payload)
      .subscribe({
        next: (resp) => {
          this.catalogo = resp.data.map(g => ({
            codigo: g.idGiro,
            descripcion: g.descGiro,
            coduso: g.coduso,
            nivelRiesgo: g.nivelRiesgo
          }));
          this.cargando = false; 
        },
        error: (err) => {
          console.error('Error al cargar giros:', err);
          this.cargando = false; 
        }
      });
  }
}