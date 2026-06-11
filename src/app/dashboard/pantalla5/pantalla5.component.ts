import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { SolicitudService } from '../../core/services/solicitud.service';
import { ComboService } from '../../core/services/combo.service';
import { ICrearSolicitudRequest, IRepresentanteLegalRequest, IEditarRepresentanteLegalRequest } from '../../core/interfaz/ISolicitudLicencia';
import { SolicitudStateService } from '../../core/services/solicitud-state.service';
import { ModalRepresentanteComponent, Representante } from '../../components/modal-representante/modal-representante.component';
import { forkJoin } from 'rxjs';
import { NavButtonsComponent } from '../../shared';

@Component({
  selector: 'app-pantalla5',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, 
    ModalRepresentanteComponent, NavButtonsComponent],
  templateUrl: './pantalla5.component.html',
  styleUrl: './pantalla5.component.css'
})
export class Pantalla5Component implements OnInit {
  constructor(
    private solicitudService: SolicitudService,
    private comboService: ComboService,
    private state: SolicitudStateService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  mostrarModalRepresentante = false;
  mostrarAvisoQuitar = false;
  representantes: Representante[] = [];
  representanteEditIndex: number | null = null;
  representanteParaEditar: Representante | null = null;
  tipoDocumentos: any[] = [];
  idSolicitante: string = '';
  dniruc: string = '';
  codigoUsuario: string = '';
  nombreUsuario: string = '';
  apellidoPaterno: string = '';
  apellidoMaterno: string = '';

  get formularioValido(): boolean {
    return this.representantes.length > 0;
  }

  ngOnInit() {
    const datos = this.authService.getUser();
    this.idSolicitante    = datos.idSolicitante ?? '';      
    this.dniruc           = datos.dniruc ?? '';        
    this.codigoUsuario    = datos.codigo ?? '';        
    this.nombreUsuario    = datos.nombres ?? '';       
    this.apellidoPaterno  = datos.apellidoPaterno ?? '';       
    this.apellidoMaterno  = datos.apellidoMaterno ?? '';     
    this.listarTipoDoc();
    this.obtenerRepresentanteLegal();
  }

  abrirModalNuevo() {
    this.representanteEditIndex = null;
    this.representanteParaEditar = null;
    this.mostrarModalRepresentante = true;
  }

  abrirModalEditar(index: number) {
    this.representanteEditIndex = index;
    this.representanteParaEditar = { ...this.representantes[index] };
    this.mostrarModalRepresentante = true;
  }

  onRepresentanteGuardado(rep: Representante) {
    const payload: IEditarRepresentanteLegalRequest = {
      id_solicitante: this.idSolicitante,
      nombre_rl:      rep.nombreRL,
      id_tipo_doc_rl:  rep.tipoDoc,
      nro_doc_rl:      rep.nroDoc,
      nro_partida_rl:  rep.nroPartida,
      nro_telf_rl:     rep.telefono
    };

    this.solicitudService.editarRepresentanteLegal(payload).subscribe(() => {
      this.obtenerRepresentanteLegal();
    });
  }

  listarTipoDoc() {
    this.comboService.listarTipoDoc({}).subscribe(resp => {
      this.tipoDocumentos = resp.data;
    });
  }

  getNombreTipoDoc(id: string): string {
    const tipo = this.tipoDocumentos.find(t => t.idTipoDoc === id);
    return tipo ? tipo.descDocumento : id;
  }

  obtenerRepresentanteLegal() {
    const payload: IRepresentanteLegalRequest = { id_solicitante: this.idSolicitante };

    this.solicitudService.obtenerRepresentanteLegal(payload).subscribe(resp => {
      if (resp.data) {
        const data = Array.isArray(resp.data) ? resp.data : [resp.data];
        this.representantes = data.map(r => ({
          tipoDoc:    r.idTipoDocRL,
          nroDoc:     r.nroDocRL,
          nombreRL:   r.nombreRL,
          nroPartida: r.nroPartidaRL,
          telefono:   r.nroTelfRL
        }));
      }
    });
  }

  procesarSolicitud() {
    const s = this.state;
    const hoy = new Date();
    const fechaSolicitud = `${hoy.getDate().toString().padStart(2,'0')}/${(hoy.getMonth()+1).toString().padStart(2,'0')}/${hoy.getFullYear()}`;

    const payload: ICrearSolicitudRequest = {
      id_solicitud:         '',
      id_solicitante:       this.idSolicitante,
      id_tipo_licencia:      s.idTipoLicencia,
      vigencia_hasta:       '',
      id_concepto:          this.determinarNiveldeRiesgo() <= 1 ? '1' : '2',
      desc_solicitud:       s.descSolicitud,
      desc_anuncio:         '',
      fecha_solicitud:      fechaSolicitud,
      estado_tramite:       '1',
      nro_licencia:         s.nroLicencia,
      titular_licencia:     s.titularLicencia,
      nro_resolucion:       s.nroResolucion,
      fecha_expedecion:     s.fechaExpedecion,
      vigencia_ant:         s.vigenciaAnt,
      observacion:          s.observacion,
      observacion2:         s.observacion2,
      ordenanza_flag:       '',
      operador:             this.dniruc,
      estacion:             'PC-PAT-0972',
      id_establecimiento:   '',
      codigo_contrib:       this.codigoUsuario,
      nombre_contrib:       this.nombreUsuario + ' ' + this.apellidoPaterno + ' ' + this.apellidoMaterno,
      cod_predio:           s.codPredio,
      tipo_via:             s.tipo_via,
      direc_pred:           s.direcPred,
      deno_predio:          '',
      nro_predio:           s.nroPredio,
      int_predio:           s.intPredio,
      mz_predio:            s.mzPredio,
      lt_predio:            s.ltPredio,
      area_constr:          s.areaConstr,
      ref_establecimiento:  s.refEstablecimiento,
      desc_establecimiento: s.descEstablecimiento,
      area_local:           s.areaLocal,
      puesto:               s.puesto,
      stand:                s.stand,
      nro_estacionamiento:  s.nroEstacionamiento,
      id_capacidad:         s.idCapacidad,
      id_tipo_act:          s.idTipoAct,
      id_cond_local:        s.idCondLocal,
      id_tipo_zonif:        s.idTipoZonif,
      abrev_zonif:          s.abrevZonif,
      descrip_zonif:        s.descripZonif,
      piso_predio:          s.piso_predio,
      as_entidada_autoriza: s.ASentidadautoriza,
      as_denominacion:      s.ASdenominacion,
      as_fecha:             s.ASfecha,
      as_numero:            s.ASnumero,
      d_jurada:             s.d_jurada,
      anexos_dj:            s.anexos_dj,
      id_horario:           s.idhorario,
      horario:              s.horario,
      id_via:               s.id_via,
      descrip_giro:         s.descrip_giro,
      plazo_mes:            '',
      nro_licencia_padre:   s.nro_licencia_padre,
      anio_licencia_padre:  s.anio_licencia_padre,
      latitud:              s.latitud,
      longitud:             s.longitud
    };

    this.solicitudService.crearSolicitud(payload).subscribe({
      next: (resp) => {
        const data = Array.isArray(resp.data) ? resp.data[0] : resp.data;
        const id_solicitud = data?.idSolicitud;
        
        const giros = s.giros;
        if (giros.length > 0 && id_solicitud) {
          import('rxjs').then(({ concat }) => {
            const llamadas = giros.map(g =>
              this.solicitudService.solicitudGiro({
                id_solicitud,
                id_giros:   g.idGiros,
                desc_giros: g.descGiros,
                cod_uso:    g.coduso
              })
            );
            concat(...llamadas).subscribe({
              complete: () => {
                this.subirAnexos(id_solicitud).then(() =>
                  this.irAPantalla6(data?.mensaje ?? '', id_solicitud, data?.nroProforma ?? '', data?.monto ?? '')
                );
              }
            });
          });
        } else {
          this.subirAnexos(id_solicitud ?? '').then(() =>
            this.irAPantalla6(data?.mensaje ?? '', id_solicitud ?? '', data?.nroProforma ?? '', data?.monto ?? '')
          );
        }        
      },
      error: (err) => {
        console.error('Error creando la solicitud:', err) 
      }
    });
  }

  determinarNiveldeRiesgo(): number {
    const niveles = this.state.nivelesRiesgo;
    
    if (!niveles || niveles.length === 0) { return 0; }
    
    let suma = 0;
    let cantidadValida = 0;
    
    for (const item of niveles) {
      const riesgo = parseFloat(item.nivelRiesgo);
      if (!isNaN(riesgo)) {
        suma += riesgo;
        cantidadValida++;
      }
    }
    
    if (cantidadValida === 0) { return 0; }
    
    const promedio = suma / cantidadValida;
    
    return Math.round(promedio * 100) / 100;
  }

  subirAnexos(id_solicitud: string): Promise<void> {
    const s = this.state;
    const anexos = [
      s.anexo1_path && { archivo: s.anexo1_path, nro: '1' },
      s.anexo2_path && { archivo: s.anexo2_path, nro: '2' },
      s.anexo3_path && { archivo: s.anexo3_path, nro: '3' },
      s.anexo4_path && { archivo: s.anexo4_path, nro: '4' },
      s.autorizacion_sectorial_path && { archivo: s.autorizacion_sectorial_path, nro: '5' },
    ].filter(Boolean) as { archivo: File; nro: string }[];

    if (!anexos.length) return Promise.resolve();

    return new Promise(resolve => {
      forkJoin(anexos.map(a =>
        this.solicitudService.rutaAnexoSolicitud({
          id_solicitud, nro_anexo: a.nro,
          usuario: this.dniruc, archivo: a.archivo
        })
      )).subscribe({ complete: resolve, error: resolve });
    });
  }
  
  determinarNiveldeRiesgoTexto():string {
    let textoA: string = '';
    let textoB: string = '';
    
    if( this.determinarNiveldeRiesgo() <= 1 ){
      textoA = 'Licencia Riesgo Bajo';
    }else{
      textoA = 'Licencia Riesgo Medio';
    }

    if( this.state.idTipoLicencia === '3' ){
      textoB = 'Cesionario';
    }else if( this.state.idTipoLicencia === '1' ){
      textoB = 'Indeterminada';
    }else if( this.state.idTipoLicencia === '2' ){
      textoB = 'Temporal';
    }else{
      textoB = 'No Identificada';
    }

    return `${textoA} - ${textoB}`;
  }

  irAPantalla6(mensaje: string, idSolicitud: string, nroProforma: string, monto: string) {
    this.state.mensajeRespuesta  = mensaje;
    this.state.idSolicitudCreada = idSolicitud;
    this.state.nroProforma = nroProforma;
    this.state.monto = monto;
    this.state.descrip_nivelesRiesgo = this.determinarNiveldeRiesgoTexto();
    this.router.navigate(['../pantalla6'], { relativeTo: this.route });
  }
}