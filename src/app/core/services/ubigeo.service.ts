import { Injectable } from '@angular/core';
import { ComboService } from './combo.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UbigeoService {
    departamentos$ = new BehaviorSubject<any[]>([]);
    provincias$ = new BehaviorSubject<any[]>([]);
    distritos$ = new BehaviorSubject<any[]>([]);

    constructor(private combo: ComboService) { }

    cargarDepartamentos() {
        this.combo.listarUbigeo({ accion: '8', id_departamento: '', id_provincia: '' })
            .subscribe(r => this.departamentos$.next(r.data));
    }

    onDepartamentoChange(dep: string, resetProv = true) {
        if (resetProv) {
            this.provincias$.next([]);
            this.distritos$.next([]);
        }
        if (dep) {
            this.combo.listarUbigeo({ accion: '9', id_departamento: dep, id_provincia: '' })
                .subscribe(r => this.provincias$.next(r.data));
        }
    }

    onProvinciaChange(dep: string, prov: string) {
        this.distritos$.next([]);
        if (prov) {
            this.combo.listarUbigeo({ accion: '10', id_departamento: dep, id_provincia: prov })
                .subscribe(r => this.distritos$.next(r.data));
        }
    }
}