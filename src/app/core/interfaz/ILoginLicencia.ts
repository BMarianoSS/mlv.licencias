export interface LoginResponse {
    status:                     string;
    message:                    string;
    data: {
        codigo:                 string;
        id_solicitante:         string | null;
        nombres:                string;
        token:                  string;
    };
    timestamp:                  string;
}



export interface CrearUsuarioResponse {
    codigo:         string;
    mensaje:        string;
    idSolicitante:  string;
    success:        string;
}

export interface ICrearUsuarioRequest {
    tipo_persona:               string;
    tipo_documento:             string;
    nro_documento:              string;
    nombres:                    string;
    apellido_paterno:           string;
    apellido_materno:           string;
    correo:                     string;
    password_hash:              string;
    telefono:                   string;
    nro_ruc:                    string;
    denominacion:               string;
    direccion:                  string;
    numero_direccion:           string;
    interior:                   string;
    manzana:                    string;
    lote:                       string;
    departamento:               string;
    provincia:                  string;
    distrito:                   string;
    rep_legal_nombre:           string;
    rep_legal_tipo_documento:   string;
    rep_legal_nro_documento:    string;
    rep_legal_nro_partida:      string;
    rep_legal_telefono:         string;
    flag_discapacidad:          string;
    nro_partida_electronica:    string;
    nro_asiento_sunarp:         string;
    operador:                   string;
    estacion:                   string;
}



export interface ObtenerUsuarioResponse {
    codigo:                 string;
    dniruc:                 string;
    idSolicitante:          string;
    idUsuarioWeb:           string;
    tipoPersona:            string;
    tipoDocumento:          string;
    nroDocumento:           string;
    apellidoPaterno:        string;
    apellidoMaterno:        string;
    nombres:                string;
    telefono:               string;
    correo:                 string;
    direccion:              string;
    distrito:               string;
    distritotxt:            string;
    tipoVia:                string;
    nombrevia:              string;
    numeroPredio:           string;
    interiorPredio:         string;
    pisoPredio:             string;
    manzanaPredio:          string;
    lotePredio:             string;
    razonSocial:            string;
    telefono2:              string;
    nroRUC:                 string;
    direccion2:             string;
    referenciaDireccion:    string;
    departamento:           string;
    departamentotxt:        string;
    provincia:              string;
    provinciatxt:           string;
}

export interface IObtenerUsuarioRequest {
    id_solicitante:         string|null;
}

export interface SolicitarCodigoCambioContrasenaResponse {
    resultado:              number;
    mensaje:                string;
    codigo?:                string;
    email?:                 string;
}

export interface CambiarContrasenaRequest {
    correo:                 string;
    codigo:                 string;
    nuevaContrasena:        string;
}

export interface CambiarContrasenaResponse {
    resultado:              number;
    mensaje:                string;
}