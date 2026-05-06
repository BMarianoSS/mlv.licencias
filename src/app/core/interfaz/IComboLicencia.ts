export interface IcomboRequest { }



export interface GiroResponse {
    idGiro:     string;
    coduso:     string;
    descGiro:   string;
}



export interface TipoLicenciaResponse {
    idTipoLicencia:     string;
    descTipoLicencia:   string;
}



export interface FuncionesResponse {
    idFunciones:    string;
    nombre:         string;
}



export interface CondicionesResponse {
    idCondLocal:    string;
    descCondLocal:  string;
}



export interface ActividadesResponse {
    idTipoAct:      string;
    descTipoAct:    string;
}



export interface TipoDocumentosResponse {
    idTipoDoc:      string;
    descDocumento:  string;
}



export interface UbigeoResponse {
    id:     string;
    nombre: string;
}

export interface IUbigeoRequest {
    accion:             string;
    id_departamento:    string;
    id_provincia:       string;
}



export interface TipoPersonaResponse {
    idTipoPersona:  string;
    descripcion:    string;
}