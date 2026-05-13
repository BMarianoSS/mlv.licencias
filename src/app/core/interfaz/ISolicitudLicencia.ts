export interface PredioResponse {
    codPred:            string;
    direccion:          string;
    lat:                string;
    lon:                string;
    tipoVia:            string;
    idVia:              string;
    nroPredio:          string;
    intPredio:          string;
    mzPredio:           string;
    ltPredio:           string;
    areaConstr:         string;
    refEstablecimiento: string;
}

export interface IPredioRequest {
    cod_lote:      string;
    latitud?:      string;
    longitud?:     string;
    geometry?:     string;
}



export interface ZonificacionResponse {
    idTipoZonificacion: string;
    zonificacion:       string;
    descTipoZonif:      string;
}

export interface IZonificacionRequest {
    cod_predio:      string;
}



export interface listarEstablecimientosResponse {
    NombreComercial:    string;
    TipoActividad:      string;
    AreaLocal:          string;
    NroInterior:        string;
    NroStand:           string;
    NroEstacionamiento: string;
    Aforo:              string;
    Condicion:          string;
}

export interface IlistarEstablecimientosRequest {
    codigo_contrib: string;
}



export interface GiroPorZonificacionResponse {
    idGiro:   string;
    coduso:   string;
    descGiro: string;
}

export interface GiroPorZonificacionRequest {
    id_zonificacion:  string;
    valores:          string;
}



export interface ListarSolicitudesResponse {
    idSolicitud:        string;
    nroSolicitud:       string;
    direccionLocal:     string; 
    fechaRegistro:      string; 
    descripcionEstado:  string;
    tipoTramite:        string;
}

export interface IListarSolicitudesRequest {
    id_solicitante: string;
}



export interface ObtenerSolicitudResponse {
    idSolicitud:            string;
    nroSolicitud:           string;
    nroLicencia:            string;
    fechaLicencia:          string;
    nroExpediente:          string;
    fechaExpediente:        string;
    nroResolucion:          string;
    fechaResolucion:        string;
    descTipoLicencia:       string;
    descConcepto:           string;
    nombre:                 string;
    descEstablecimiento:    string;
    nroRecibo:              string;
    idRecibo:               string;
    estadoTramite:          string;
    observacion:            string;
    vigenciaDesde:          string;
    vigenciaHasta:          string;
    operadorRegistro:       string;
    estacionRegistro:       string;
    fechaRegistro:          string;
    estado:                 string;
    fechaSolicitud:         string;
    giros:                  string;
    TitularLicencia:        string;
    descSolicitud:          string;
    leyenda:                string;
    generaLicencia:         string;
    duplicaLicencia:        string;
    reimprimeLicencia:      string;
    estadoSol:              string;
    operadorActualiza:      string;
    estacionActualiza:      string;
    fechaActualiza:         string;
    idAutorizacion:         string;
    fechaPago:              string;
    idResolucion:           string;
    anexosDJ:               string;
    nroOrdenanza:           string;
    nroLicenciaAnt:         string;
    nroResolAnt:            string;
    fechaResolAnt:          string;
    vigenciaAnt:            string;
    idConstruccion:         string;
    idCertificado:          string;
    nroSerie:               string;
    siglasResolucion:       string;
    encargado:              string;
    responsable:            string;
    dJurada:                string;
    idDetalle:              string;
    direccionLocal:         string;
    razonSocial:            string;
    itse:                   string;
    ordenanzaFlag:          string;
    tipoIngreso:            string;
    plazoMes:               string;
    descAnuncio:            string;
    flagNotif:              string;
    observacion2:           string;
    reconsideracion:        string;
    rectificacion:          string;
    licenciaIdFirmado:      string;
    licenciaFechaFirmado:   string;
    licenciaUsuarioFirmado: string;
}

export interface IObtenerSolicitudRequest {
    id_solicitud: string;
}



export interface DesistirSolicitudResponse {
    mensaje: string;
}

export interface IDesistirSolicitudRequest {
    id_solicitud: string;
}



export interface CrearSolicitudResponse {
    idSolicitud:  string;
    estado:       string;
    mensaje:      string;
    nroProforma:  string;
    monto:  string;
}

export interface ICrearSolicitudRequest {
    id_solicitud:           string;
    id_solicitante:         string;
    id_tipo_licencia:       string;
    vigencia_hasta:         string;
    id_concepto:            string;
    desc_solicitud:         string;
    desc_anuncio:           string;
    fecha_solicitud:        string;
    estado_tramite:         string;
    nro_licencia:           string;
    titular_licencia:       string;
    nro_resolucion:         string;
    fecha_expedecion:       string;
    vigencia_ant:           string;
    observacion:            string;
    observacion2:           string;
    ordenanza_flag:         string;
    operador:               string;
    estacion:               string;
    id_establecimiento:     string;
    codigo_contrib:         string;
    nombre_contrib:         string;
    cod_predio:             string;
    tipo_via:               string;
    direc_pred:             string;
    deno_predio:            string;
    nro_predio:             string;
    int_predio:             string;
    mz_predio:              string;
    lt_predio:              string;
    area_constr:            string;
    ref_establecimiento:    string;
    desc_establecimiento:   string;
    area_local:             string;
    puesto:                 string;
    stand:                  string;
    nro_estacionamiento:    string;
    id_capacidad:           string;
    id_tipo_act:            string;
    id_cond_local:          string;
    id_tipo_zonif:          string;
    abrev_zonif:            string;
    descrip_zonif:          string;
    piso_predio:            string;
    as_entidada_autoriza:   string;
    as_denominacion:        string;
    as_fecha:               string;
    as_numero:              string;
    anexos_dj:              string;
    d_jurada:               string;
    id_horario:             string;
    horario:                string;
    id_via:                 string;
    plazo_mes:              string;
    descrip_giro:           string;
    nro_licencia_padre:     string;
    anio_licencia_padre:    string;
    latitud:                string;
    longitud:               string;
}



export interface SolicitudGiroResponse {
    idSolicitud:  string;
    estado:       string;
    mensaje:      string;
}

export interface ISolicitudGiroRequest {
    id_solicitud:  string;	
    id_giros:      string;	
    desc_giros:    string;	
    cod_uso:       string;	
}



export interface RutaAnexoSolicitudResponse {
    mensaje: string; 
}

export interface IRutaAnexoSolicitudRequest {  
    id_solicitud:  string;
    nro_anexo:     string;
    usuario:      string; 
    archivo:      File;
}



export interface RepresentanteLegalResponse {
    nombreRL:     string;
    idTipoDocRL:  string;
    nroDocRL:     string; 
    nroPartidaRL: string; 
    nroTelfRL:    string;
}

export interface IRepresentanteLegalRequest {
    id_solicitante: string;
}



export interface EditarRepresentanteLegalResponse {
    mensaje: string;
}

export interface IEditarRepresentanteLegalRequest {
    id_solicitante: string;
    nombre_rl:      string;
    id_tipo_doc_rl: string;
    nro_doc_rl:     string;
    nro_partida_rl: string;
    nro_telf_rl:    string;
}



export interface PreguntasXAnexoFuncionResponse {
    nroAnexo:       string;
    idFuncion:      string;
    idTipoInput:    string;
    orden:          string;
    pregunta:       string;
    ngmodel:        string;
    esVisible:        string;
}

export interface IPreguntasXAnexoFuncionRequest {
    nro_anexo:  string;
    id_funcion: string;
}



export interface CodLotePredioResponse {
    codPred:            string;
    direccion:          string;
    lat:                string;
    lon:                string;
    tipoVia:            string;
    idVia:              string;
    nroPredio:          string;
    intPredio:          string;
    mzPredio:           string;
    ltPredio:           string;
    areaConstr:         string;
    refEstablecimiento: string;
    geometry: string;
}

export interface ICodLotePredioRequest {
    lat:      string;
    lon:      string;
}