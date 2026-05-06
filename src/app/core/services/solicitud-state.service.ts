import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SolicitudStateService {
    // Pantalla 1
    idTipoLicencia      = '';
    descSolicitud       = '';
    aceptaTerminos      = false;

    // Pantalla 2    
    direccionEstablecimientoCombinada           = '';
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
    giros: { idGiros: string; descGiros: string; coduso: string }[] = [];
    descrip_giro            = '';
    check_dia_siguiente     = false;
    check_horario_continuo  = false;

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
}