import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SolicitudStateService {
    // Pantalla 1
    idTipoLicencia      = '';
    descSolicitud       = '';
    aceptaTerminos      = false;

    // Pantalla 2    
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
    descrip_giro            = '';
    check_dia_siguiente     = false;
    check_horario_continuo  = false;
    latitud                 = '';
    longitud                = '';

    // Pantalla 3 (autorización sectorial)
    ASentidadautoriza       = '';
    ASdenominacion          = '';
    ASfecha                 = '';
    ASnumero                = '';
    autorizacion_sectorial_path: File | null = null;

    // Pantalla 4
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

    // Pantalla "Otros" (tab imagen 3)
    nroLicencia             = '';
    titularLicencia         = '';
    nroResolucion           = '';
    fechaExpedecion         = '';
    vigenciaAnt             = '';
    observacion             = '';
    observacion2            = '';

    mensajeRespuesta        = '';
    idSolicitudCreada       = '';
    nroProforma             = '';
    monto                   = '';

    flujoActivo = false;

    limpiarState(){
        // Pantalla 1
        this.idTipoLicencia      = '';
        this.descSolicitud       = '';
        this.aceptaTerminos      = false;

        // Pantalla 2    
        this.direccionEstablecimientoCombinada           = '';
        this.codPredio               = '';
        this.tipo_via                = '';
        this.direcPred               = '';
        this.id_via                  = '';
        this.nroPredio               = '';
        this.intPredio               = '';
        this.mzPredio                = '';
        this.ltPredio                = '';
        this.areaConstr              = '';
        this.refEstablecimiento      = '';
        this.descEstablecimiento     = '';
        this.idTipoAct               = '';
        this.areaLocal               = '';
        this.puesto                  = '';
        this.stand                   = '';
        this.nroEstacionamiento      = '';
        this.idCapacidad             = '';
        this.idCondLocal             = '';
        this.idTipoZonif             = '';
        this.abrevZonif              = '';
        this.descripZonif            = '';
        this.horaini                 = '';
        this.horafin                 = '';
        this.idhorario               = '';
        this.horario                 = '';
        this.giros                   = [];
        this.nivelesRiesgo           = [];
        this.descrip_giro            = '';
        this.check_dia_siguiente     = false;
        this.check_horario_continuo  = false;
        this.latitud                 = '';
        this.longitud                = '';

        // Pantalla 3 (autorización sectorial)
        this.ASentidadautoriza       = '';
        this.ASdenominacion          = '';
        this.ASfecha                 = '';
        this.ASnumero                = '';
        this.autorizacion_sectorial_path = null;

        // Pantalla 4
        this.d_jurada                = '';
        this.anexos_dj               = '';
        this.anexo1_path             = null;
        this.anexo2_path             = null;
        this.anexo3_path             = null;
        this.anexo4_path             = null;
        this.nro_licencia_padre      = '';
        this.anio_licencia_padre     = '';
        this.piso_predio             = '';
        this.funcionSeleccionado     = '';
        this.check1                  = false;
        this.check2                  = false;
        this.check3                  = false;

        // Pantalla "Otros" (tab imagen 3)
        this.nroLicencia             = '';
        this.titularLicencia         = '';
        this.nroResolucion           = '';
        this.fechaExpedecion         = '';
        this.vigenciaAnt             = '';
        this.observacion             = '';
        this.observacion2            = '';

        this.mensajeRespuesta        = '';
        this.idSolicitudCreada       = '';
        this.nroProforma             = '';
        this.monto                   = '';

        this.flujoActivo = false;
    }
}
