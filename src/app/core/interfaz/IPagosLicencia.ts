export interface PagoProformaResponse {
    emitido: string;
    idrecibo: string;
    idproforma: string;
    codigo: string;
    cobrado: string;    
}

export interface IPagoProformaRequest {
    codigo:         string;
    idproforma:     string;
    monto:          string;
    fec_cobro:      string;
    observa:        string;
    observacion2:   string;
}