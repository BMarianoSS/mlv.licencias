import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SolicitudStateService {
    idTipoLicencia      = '';
    descSolicitud       = '';
    aceptaTerminos      = false;

    direccionEstablecimientoCombinada = '';
    codPredio               = '';
    tipo_via                = '';
    direcPred               = '';
    id_via                  = '';
    nroPredio               = '';
    intPredio               = '';
    mzPredio                = '';
    ltPredio                = '';
    areaConstr              = '';
    refEstablecimiento      = '';
    descEstablecimiento     = '';
    idTipoAct               = '';
    areaLocal               = '';
    puesto                  = '';
    stand                   = '';
    nroEstacionamiento      = '';
    idCapacidad             = '';
    idCondLocal             = '';
    idTipoZonif             = '';
    abrevZonif              = '';
    descripZonif            = '';
    horaini                 = '';
    horafin                 = '';
    idhorario               = '';
    horario                 = '';
    giros: { idGiros: string; descGiros: string; coduso: string; nivelRiesgo: string }[] = [];
    nivelesRiesgo: { nivelRiesgo: string }[] = [];
    descrip_nivelesRiesgo   = '';
    descrip_giro            = '';
    check_dia_siguiente     = false;
    check_horario_continuo  = false;
    latitud                 = '';
    longitud                = '';

    ASentidadautoriza       = '';
    ASdenominacion          = '';
    ASfecha                 = '';
    ASnumero                = '';
    autorizacion_sectorial_path: File | null = null;

    d_jurada                = '';
    anexos_dj               = '';
    anexo1_path: File | null = null;
    anexo2_path: File | null = null;
    anexo3_path: File | null = null;
    anexo4_path: File | null = null;
    nro_licencia_padre      = '';
    anio_licencia_padre     = '';
    piso_predio             = '';
    funcionSeleccionado     = '';
    check1                  = false;
    check2                  = false;
    check3                  = false;

    nroLicencia             = '';
    titularLicencia         = '';
    nroResolucion           = '';
    fechaExpedecion         = '';
    vigenciaAnt             = '';
    observacion             = '';
    observacion2            = '';

    mensajeRespuesta        = '';
    idSolicitudCreada       = '';
    idSolicitudGenerada     = '';
    nroProforma             = '';
    monto                   = '';
    idProforma              = '';

    nuExpediente            = '';
    numeroResolucion        = '';
    numeroCertificado       = '';

    flujoActivo = false;

    constructor() { this.flujoActivo = sessionStorage.getItem('flujoActivo') === 'true'; }

    limpiarState(){
        this.idTipoLicencia         = '';
        this.descSolicitud          = '';
        this.aceptaTerminos         = false;

        this.direccionEstablecimientoCombinada= '';
        this.codPredio              = '';
        this.tipo_via               = '';
        this.direcPred              = '';
        this.id_via                 = '';
        this.nroPredio              = '';
        this.intPredio              = '';
        this.mzPredio               = '';
        this.ltPredio               = '';
        this.areaConstr             = '';
        this.refEstablecimiento     = '';
        this.descEstablecimiento    = '';
        this.idTipoAct              = '';
        this.areaLocal              = '';
        this.puesto                 = '';
        this.stand                  = '';
        this.nroEstacionamiento     = '';
        this.idCapacidad            = '';
        this.idCondLocal            = '';
        this.idTipoZonif            = '';
        this.abrevZonif             = '';
        this.descripZonif           = '';
        this.horaini                = '';
        this.horafin                = '';
        this.idhorario              = '';
        this.horario                = '';
        this.giros                  = [];
        this.nivelesRiesgo          = [];
        this.descrip_nivelesRiesgo  = '';
        this.descrip_giro           = '';
        this.check_dia_siguiente    = false;
        this.check_horario_continuo = false;
        this.latitud                = '';
        this.longitud               = '';

        this.ASentidadautoriza      = '';
        this.ASdenominacion         = '';
        this.ASfecha                = '';
        this.ASnumero               = '';
        this.autorizacion_sectorial_path = null;

        this.d_jurada               = '';
        this.anexos_dj              = '';
        this.anexo1_path            = null;
        this.anexo2_path            = null;
        this.anexo3_path            = null;
        this.anexo4_path            = null;
        this.nro_licencia_padre     = '';
        this.anio_licencia_padre    = '';
        this.piso_predio            = '';
        this.funcionSeleccionado    = '';
        this.check1                 = false;
        this.check2                 = false;
        this.check3                 = false;

        this.nroLicencia            = '';
        this.titularLicencia        = '';
        this.nroResolucion          = '';
        this.fechaExpedecion        = '';
        this.vigenciaAnt            = '';
        this.observacion            = '';
        this.observacion2           = '';

        this.mensajeRespuesta       = '';
        this.idSolicitudCreada      = '';
        this.idSolicitudGenerada    = '';
        this.nroProforma            = '';
        this.monto                  = '';
        this.idProforma             = '';

        this.nuExpediente           = '';
        this.numeroResolucion       = '';
        this.numeroCertificado      = '';

        this.flujoActivo = false;
        sessionStorage.removeItem('flujoActivo');
    }
}
