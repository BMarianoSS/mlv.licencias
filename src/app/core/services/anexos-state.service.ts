import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AnexosStateService {
    private data: Record<string, Record<string, any>> = {};

    private key(anexo: string | number, funcion: string | number) {
        return `${anexo}_${funcion}`;
    }

    get(anexo: any, funcion: any): Record<string, any> {
        return this.data[this.key(anexo, funcion)] ?? {};
    }

    set(anexo: any, funcion: any, respuestas: Record<string, any>) {
        this.data[this.key(anexo, funcion)] = { ...respuestas };
    }

    clear() {
        this.data = {};
    }
}