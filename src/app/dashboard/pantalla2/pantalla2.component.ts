import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SolicitudService } from '../../core/services/solicitud.service';
import { ComboService } from '../../core/services/combo.service';
import { SolicitudStateService } from '../../core/services/solicitud-state.service';
import { ModalMapaComponent } from '../../components/modal-mapa/modal-mapa.component';
import { ModalGiroComponent, Giro } from '../../components/modal-giro/modal-giro.component';
import { ModalListaEstablecimientoComponent } from '../../components/modal-lista-establecimientos/modal-lista-establecimientos.component';
import { filtrarSoloNumeros } from '../../core/utils/form.utils';
import { NavButtonsComponent, DataTableComponent, TableColumn } from '../../shared';

@Component({
  selector: 'app-pantalla2',
  standalone: true,
  imports: [
    RouterModule, FormsModule, CommonModule,
    ModalMapaComponent, ModalGiroComponent,
    ModalListaEstablecimientoComponent,
    NavButtonsComponent, DataTableComponent
  ],
  templateUrl: './pantalla2.component.html',
})
export class Pantalla2Component implements OnInit {

  constructor(
    private solicitudService: SolicitudService,
    private comboService: ComboService,
    private state: SolicitudStateService
  ) { }

  codPredio = '';
  direccionEstablecimiento            = '';
  direccionEstablecimientoCombinada   = '';
  mostrarModalMapa                    = false;

  condiciones: any[]                  = [];
  condicionSeleccionado               = '';

  actividades: any[]                  = [];
  actividadSeleccionado               = '';

  giros: Giro[]                       = [];
  mostrarModalGiro                    = false;
  id_zonificacion_actual: any         = '';
  valores: any                        = '';

  cod_pred: string                    = '';
  direccion: string                   = '';
  cod_zonif: string                   = '';
  abrev_zonif: string                 = '';
  desc_zonif: string                  = '';
  giros2: any[]                       = [];
  nombre: string                      = '';
  tipo_actividad_seleccionada: string = '';
  areaLocal: number | null            = null;
  aforo: number | null                = null;
  condicion_seleccionada: string      = '';
  desde: string                       = '06:00';
  hasta: string                       = '23:00';
  check_dia_siguiente: boolean        = false;
  check_horario_continuo: boolean     = false;
  id_zonificacion: any                = '';
  latitud: any                        = '';
  longitud: any                       = '';
  
  nroInterior: any                    = '';
  nroStand: any                       = '';
  nroEstacionamiento: any             = '';
  descrip_giro: any                   = '';

  mostrarAlertaMaxGiros               = false;

  mostrarModalEstablecimientos        = false;
  establecimientoAutorellenado        = false;
  
  filtrarNumeros = filtrarSoloNumeros;


  get formularioValido(): boolean {
    return (
      this.codPredio.trim() !== '' &&
      this.direccionEstablecimientoCombinada.trim() !== '' &&
      this.giros.length > 0 &&
      this.actividadSeleccionado !== '' &&
      this.condicionSeleccionado !== '' &&
      this.nombre.trim() !== '' &&
      this.areaLocal !== null && this.areaLocal !== undefined && String(this.areaLocal).trim() !== '' &&
      this.aforo !== null && this.aforo !== undefined && String(this.aforo).trim() !== ''
    );
  }

  onEstablecimientoSeleccionado(e: any) {
    this.nombre                = e.nombreComercial    ?? '';
    this.actividadSeleccionado = e.tipoActividad      ?? '';
    this.areaLocal             = e.areaLocal          ? Number(e.areaLocal) : null;
    this.nroInterior           = e.nroInterior        ?? '';
    this.nroStand              = e.nroStand           ?? '';
    this.nroEstacionamiento    = e.nroEstacionamiento ?? '';
    this.aforo                 = e.aforo              ? Number(e.aforo) : null;
    this.condicionSeleccionado = e.condicion          ?? '';
    this.establecimientoAutorellenado = true;
  }

  ngOnInit() {
    this.listarCondiciones();
    this.listarActividades();
    this.restaurarDesdeState();
  }

  columnasGirosSeleccionados: TableColumn[] = [
    { label: 'Código',      key: 'coduso',      mono: true },
    { label: 'Descripción', key: 'descripcion' },
    { label: 'Acción',      actions: true, align: 'center' },
  ];

  restaurarDesdeState() {
    const s = this.state;
    if (!s.codPredio) return;

    this.codPredio                = s.codPredio;
    this.direccionEstablecimiento = s.direcPred;
    this.direccionEstablecimientoCombinada = s.direccionEstablecimientoCombinada;
    this.nombre                   = s.descEstablecimiento;
    this.actividadSeleccionado    = s.idTipoAct;
    this.areaLocal                = s.areaLocal ? Number(s.areaLocal) : null;
    this.aforo                    = s.idCapacidad ? Number(s.idCapacidad) : null;
    this.condicionSeleccionado    = s.idCondLocal;
    this.nroInterior              = s.intPredio;
    this.nroStand                 = s.stand;
    this.nroEstacionamiento       = s.nroEstacionamiento;
    this.cod_zonif                = s.idTipoZonif;
    this.abrev_zonif              = s.abrevZonif;
    this.desc_zonif               = s.descripZonif;    
    this.check_dia_siguiente      = s.check_dia_siguiente;
    this.check_horario_continuo   = s.check_horario_continuo;
    this.latitud                  = s.latitud;
    this.longitud                 = s.longitud;
    this.giros                    = s.giros.map(g => ({
                                      codigo:      g.idGiros,
                                      descripcion: g.descGiros,
                                      coduso:      g.coduso,
                                      nivelRiesgo: g.nivelRiesgo
                                    }));

    if (s.idhorario === '1') {
      this.check_horario_continuo = true;
    } else {
      this.desde = s.horaini || '06:00';
      this.hasta  = s.horafin || '23:00';
    }
  }

  abrirModalMapa() { this.mostrarModalMapa = true; }

  onPredioSeleccionado(predio: {
    codPredio: string; direccion: string;
    tipo_via: string; direcPred: string; id_via: string;
    nroPredio: string; intPredio: string; mzPredio: string;
    ltPredio: string; areaConstr: string; refEstablecimiento: string;
    lat: string; lng: string;
  }) {
    this.codPredio                = predio.codPredio;
    this.direccionEstablecimiento = predio.direccion;    
    this.direccionEstablecimientoCombinada = predio.tipo_via.trim() + " " + predio.direccion.trim() + " " + predio.nroPredio.trim();   
    this.state.direccionEstablecimientoCombinada = predio.tipo_via.trim() + " " + predio.direccion.trim() + " " + predio.nroPredio.trim();   

    this.state.tipo_via           = predio.tipo_via;
    this.state.direcPred          = predio.direcPred;
    this.state.id_via             = predio.id_via;
    this.state.nroPredio          = predio.nroPredio;
    this.state.intPredio          = predio.intPredio;
    this.state.mzPredio           = predio.mzPredio;
    this.state.ltPredio           = predio.ltPredio;
    this.state.areaConstr         = predio.areaConstr;
    this.state.refEstablecimiento = predio.refEstablecimiento;

    this.state.latitud                  = predio.lat;
    this.state.longitud                 = predio.lng;

    this.solicitudService.obtenerZonificacion({ cod_predio: predio.codPredio })
    .subscribe(resp => {
      const zonif = resp.data?.[0];
      if (zonif) {
        this.cod_zonif   = zonif.idTipoZonificacion;
        this.abrev_zonif = zonif.zonificacion;
        this.desc_zonif  = zonif.descTipoZonif;
      } else {
        this.cod_zonif   = '';
        this.abrev_zonif = '';
        this.desc_zonif  = '';
      }
    });
  }

  abrirModalGiro() { 
    this.id_zonificacion_actual = this.abrev_zonif;
    this.valores = this.direccionEstablecimiento.trim().toUpperCase().startsWith('AV')
    ? 'X,H,R,O,1'
    : 'X,H,O,1';
    this.mostrarModalGiro = true; 
  }

  onGiroSeleccionado(giro: Giro) {
    this.giros.push({ ...giro });
  }

  eliminarGiro(index: number) { this.giros.splice(index, 1); }

  listarCondiciones() {
    this.comboService.listarCondiciones({})
      .subscribe(resp => { this.condiciones = resp.data; });
  }

  listarActividades() {
    this.comboService.listarActividades({})
      .subscribe(resp => { this.actividades = resp.data; });
  }

  guardarState() {
    const s = this.state;
    s.codPredio           = this.codPredio;
    s.descEstablecimiento = this.nombre;
    s.idTipoAct           = this.actividadSeleccionado;
    s.areaLocal           = String(this.areaLocal ?? '');
    s.idCapacidad         = String(this.aforo ?? '');
    s.idCondLocal         = this.condicionSeleccionado;
    s.stand               = this.nroStand;
    s.nroEstacionamiento  = this.nroEstacionamiento;
    s.intPredio           = this.nroInterior;
    s.idTipoZonif         = this.cod_zonif;
    s.abrevZonif          = this.abrev_zonif;
    s.descripZonif        = this.desc_zonif;
    s.giros               = this.giros.map(g => ({
                              idGiros:   g.codigo,
                              descGiros: g.descripcion,
                              coduso:    g.coduso,
                              nivelRiesgo: g.nivelRiesgo  
                            }));
    s.nivelesRiesgo       = this.giros.map(n => ({ nivelRiesgo: n.nivelRiesgo }));
    s.descrip_giro        = this.giros
    .map(g => `${g.descripcion} * ${g.coduso.replace(/,/g, ' -')}`)
    .join(' - ');

    s.horaini   = this.check_horario_continuo ? '' : String(this.desde);
    s.horafin   = this.check_horario_continuo ? '' : String(this.hasta);
    s.idhorario = this.check_horario_continuo ? '1' : '3';
    s.horario   = this.check_horario_continuo
      ? 'HORARIO CONTINUO 24 HORAS'
      : `${this.desde} A ${this.hasta} HORAS`;    
    s.check_dia_siguiente     = this.check_dia_siguiente;
    s.check_horario_continuo  = this.check_horario_continuo;
    s.latitud                 = this.latitud;
    s.longitud                = this.longitud;
  }
}