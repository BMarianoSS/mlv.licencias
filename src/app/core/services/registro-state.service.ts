import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RegistroStateService {

    paso1 = {
        tipoPersona:     '',
        tipoDocumento:   '',
        nroDocumento:    '',
        nombres:         '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        razonSocial:     '',
    };

    paso2 = {
        correo:       '',
        telefono:     '',
        nroRuc:       '',
        direccion:    '',
        numero:       '',
        interior:     '',
        manzana:      '',
        lote:         '',
        denominacion: '',
        departamento: '',
        provincia:    '',
        distrito:     '',
        discapacidad: '',
        password:     '',
        rePassword:   '',
    };

    paso3 = {
        repNombre:        '',
        repTipoDocumento: '',
        repNroDocumento:  '',
        repNroPartida:    '',
        repAsientoSunarp: '',
    };
}