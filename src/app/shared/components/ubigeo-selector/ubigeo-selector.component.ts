import {
    Component, Input, Output, EventEmitter,
    OnInit, OnChanges, SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComboService } from '../../../core/services/combo.service';

@Component({
    selector: 'app-ubigeo-selector',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <div [class]="gridClass">

      <div>
        <label class="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-1">
          Departamento <span *ngIf="required" class="text-red-500">*</span>
        </label>
        <select
          [ngModel]="departamento"
          (ngModelChange)="onDepartamentoChange($event)"
          [disabled]="disabled"
          class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg
                 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition
                 disabled:bg-gray-50 disabled:cursor-not-allowed">
          <option value="">Seleccione</option>
          <option *ngFor="let d of departamentos" [value]="d.id">{{ d.nombre }}</option>
        </select>
      </div>

      <div>
        <label class="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-1">
          Provincia <span *ngIf="required" class="text-red-500">*</span>
        </label>
        <select
          [ngModel]="provincia"
          (ngModelChange)="onProvinciaChange($event)"
          [disabled]="disabled || !departamento"
          class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg
                 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition
                 disabled:bg-gray-50 disabled:cursor-not-allowed">
          <option value="">Seleccione</option>
          <option *ngFor="let p of provincias" [value]="p.id">{{ p.nombre }}</option>
        </select>
      </div>

      <div>
        <label class="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-1">
          Distrito <span *ngIf="required" class="text-red-500">*</span>
        </label>
        <select
          [ngModel]="distrito"
          (ngModelChange)="onDistritoChange($event)"
          [disabled]="disabled || !provincia"
          class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg
                 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition
                 disabled:bg-gray-50 disabled:cursor-not-allowed">
          <option value="">Seleccione</option>
          <option *ngFor="let d of distritos" [value]="d.id">{{ d.nombre }}</option>
        </select>
      </div>

    </div>
  `
})
export class UbigeoSelectorComponent implements OnInit, OnChanges {

    @Input() departamento = '';
    @Input() provincia = '';
    @Input() distrito = '';

    @Output() departamentoChange = new EventEmitter<string>();
    @Output() provinciaChange = new EventEmitter<string>();
    @Output() distritoChange = new EventEmitter<string>();

    @Input() preload = false;

    @Input() required = true;
    @Input() disabled = false;
    @Input() gridClass = 'grid grid-cols-1 md:grid-cols-3 gap-4';

    departamentos: any[] = [];
    provincias: any[] = [];
    distritos: any[] = [];

    constructor(private comboService: ComboService) { }

    ngOnInit() {
        this.comboService
            .listarUbigeo({ accion: '8', id_departamento: '', id_provincia: '' })
            .subscribe(r => {
                this.departamentos = r.data;
                if (this.preload && this.departamento) {
                    this.cargarProvincias(this.departamento, () => {
                        if (this.preload && this.provincia) {
                            this.cargarDistritos(this.departamento, this.provincia);
                        }
                    });
                }
            });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['departamento'] && !changes['departamento'].firstChange) {
            const dep = changes['departamento'].currentValue;
            if (!dep) {
                this.provincias = [];
                this.distritos = [];
            } else if (dep !== changes['departamento'].previousValue) {
                this.cargarProvincias(dep);
            }
        }
        if (changes['provincia'] && !changes['provincia'].firstChange) {
            const prov = changes['provincia'].currentValue;
            if (!prov) {
                this.distritos = [];
            } else if (prov !== changes['provincia'].previousValue) {
                this.cargarDistritos(this.departamento, prov);
            }
        }
    }

    onDepartamentoChange(value: string) {
        this.departamentoChange.emit(value);
        this.provinciaChange.emit('');
        this.distritoChange.emit('');
        this.provincias = [];
        this.distritos = [];
        if (value) this.cargarProvincias(value);
    }

    onProvinciaChange(value: string) {
        this.provinciaChange.emit(value);
        this.distritoChange.emit('');
        this.distritos = [];
        if (value) this.cargarDistritos(this.departamento, value);
    }

    onDistritoChange(value: string) {
        this.distritoChange.emit(value);
    }

    private cargarProvincias(dep: string, cb?: () => void) {
        this.comboService
            .listarUbigeo({ accion: '9', id_departamento: dep, id_provincia: '' })
            .subscribe(r => { this.provincias = r.data; cb?.(); });
    }

    private cargarDistritos(dep: string, prov: string, cb?: () => void) {
        this.comboService
            .listarUbigeo({ accion: '10', id_departamento: dep, id_provincia: prov })
            .subscribe(r => { this.distritos = r.data; cb?.(); });
    }
}