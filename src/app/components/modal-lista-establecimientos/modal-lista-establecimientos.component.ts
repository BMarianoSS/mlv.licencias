import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { SolicitudService } from '../../core/services/solicitud.service';
import { ComboService } from '../../core/services/combo.service';
import { ModalWrapperComponent } from '../../shared';

@Component({
  selector: 'app-modal-lista-establecimientos',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalWrapperComponent],
  templateUrl: './modal-lista-establecimientos.component.html',
})
export class ModalListaEstablecimientoComponent {
  @Output() cerrar = new EventEmitter<void>();
  @Output() establecimientoSeleccionado = new EventEmitter<{
    nombreComercial:    string;
    tipoActividad:      string;
    areaLocal:          string;
    nroInterior:        string;
    nroStand:           string;
    nroEstacionamiento: string;
    aforo:              string;
    condicion:          string;
  }>();

  constructor(
    private solicitudService: SolicitudService, 
    private comboService: ComboService, 
    private authService: AuthService
  ) { }

  codigo: string = ''; 
  establecimientos: any[] = []; 
  actividades: any[] = []; 
  condiciones: any[] = []; 
  cargando = true;
  
  ngOnInit() {
    this.codigo = this.authService.getUser()?.codigo ?? '';  
    this.listarActividades();
    this.listarCondiciones();
    this.listarEstablecimientos();
  }

  listarEstablecimientos() {
    const payload = {codigo_contrib: this.codigo};

    this.solicitudService.listarEstablecimientos(payload)
      .subscribe(resp => {
        this.establecimientos = resp.data;        
        this.cargando = false;
      });
  }

  getDescActividad(id: string): string {
    return this.actividades.find(a => a.idTipoAct === id)?.descTipoAct ?? id;
  }

  getDescCondicion(id: string): string {
    return this.condiciones.find(c => c.idCondLocal === id)?.descCondLocal ?? id;
  }

  listarActividades() {
    this.comboService.listarActividades({})
      .subscribe(resp => {
        this.actividades = resp.data;
      });

    this.cargando = false;
  }

  listarCondiciones() {
    this.comboService.listarCondiciones({})
      .subscribe(resp => {
        this.condiciones = resp.data;
      });

    this.cargando = false;
  }
}