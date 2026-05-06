import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { SolicitudStateService } from '../../core/services/solicitud-state.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './pantalla6.component.html',
  styleUrl: './pantalla6.component.css'
})
export class pantalla6Component{
  sidebarOpen = false;

  constructor(
    private state: SolicitudStateService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  get mensaje()     { return this.state.mensajeRespuesta; }
  get idSolicitud() { return this.state.idSolicitudCreada; }  
  get nroProforma() { return this.state.nroProforma; }  
  get monto()       { return this.state.monto; }  

  irAPantallaHome() {
    this.limpiarState();
    this.router.navigate(['../principal'], { relativeTo: this.route });
  }

  irAPantalla62() {
    this.limpiarState();
    this.router.navigate(['../pantalla6-2'], { relativeTo: this.route });
  }

  limpiarState(){
    this.state.idTipoLicencia       = '';
    this.state.descSolicitud        = '';

    // Pantalla 2    
    this.state.direccionEstablecimientoCombinada           = '';
    this.state.codPredio            = '';
    this.state.tipo_via             = '';
    this.state.direcPred            = '';
    this.state.id_via               = '';
    this.state.nroPredio            = '';
    this.state.intPredio            = '';
    this.state.mzPredio             = '';
    this.state.ltPredio             = '';
    this.state.areaConstr           = '';
    this.state.refEstablecimiento   = '';
    this.state.descEstablecimiento  = '';
    this.state.idTipoAct            = '';
    this.state.areaLocal            = '';
    this.state.puesto               = '';
    this.state.stand                = '';
    this.state.nroEstacionamiento   = '';
    this.state.idCapacidad          = '';
    this.state.idCondLocal          = '';
    this.state.idTipoZonif          = '';
    this.state.abrevZonif           = '';
    this.state.descripZonif         = '';
    this.state.horaini              = '';
    this.state.horafin              = '';
    this.state.idhorario            = '';
    this.state.horario              = '';
    this.state.giros                = [];    
    this.state.descrip_giro         = '';

    // Pantalla 3 (autorización sectorial)
    this.state.ASentidadautoriza    = '';
    this.state.ASdenominacion       = '';
    this.state.ASfecha              = '';
    this.state.ASnumero             = '';
    this.state.autorizacion_sectorial_path  = null;
  
    // Pantalla 4
    this.state.d_jurada             = '';
    this.state.anexos_dj            = '';
    this.state.anexo1_path          = null;
    this.state.anexo2_path          = null;
    this.state.anexo3_path          = null;
    this.state.anexo4_path          = null;
    this.state.nro_licencia_padre   = '';
    this.state.anio_licencia_padre  = '';

    // Pantalla "Otros" (tab imagen 3)
    this.state.nroLicencia          = '';
    this.state.titularLicencia      = '';
    this.state.nroResolucion        = '';
    this.state.fechaExpedecion      = '';
    this.state.vigenciaAnt          = '';
    this.state.observacion          = '';
    this.state.observacion2         = '';

    this.state.mensajeRespuesta     = '';
    this.state.idSolicitudCreada    = '';
    this.state.nroProforma          = '';
    this.state.monto                = '';
  }

}
