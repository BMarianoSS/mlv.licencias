import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SolicitudService } from '../../core/services/solicitud.service';
import { ComboService } from '../../core/services/combo.service';
import { AnexosStateService } from '../../core/services/anexos-state.service';
import { ModalWrapperComponent, UbigeoSelectorComponent } from '../../shared';

@Component({
  selector: 'app-modal-preguntas',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalWrapperComponent, UbigeoSelectorComponent],
  templateUrl: './modal-preguntas.component.html',
})
export class ModalPreguntasComponent implements OnInit {
  @Input() nroAnexo!: string;
  @Input() idFuncion!: string;
  @Input() prefill: Record<string, any> = {};
  @Output() guardado = new EventEmitter<void>();
  @Output() cerrar = new EventEmitter<void>();

  preguntas: any[] = [];
  respuestas: Record<string, any> = {};

  departamentos: any[] = [];
  provincias: any[] = [];
  distritos: any[] = [];
  tiposDocumento: any[] = [];

  constructor(
    private solicitudService: SolicitudService,
    private comboService: ComboService,
    private anexosState: AnexosStateService
  ) {}

  ngOnInit() {
    this.cargarTiposDocumento();
    this.cargarDepartamentos();
    this.cargarPreguntas();
  }

  cargarTiposDocumento() {
    this.comboService.listarTipoDoc({}).subscribe(r => this.tiposDocumento = r.data);
  }

  cargarDepartamentos() {
    this.comboService.listarUbigeo({ accion: '8', id_departamento: '', id_provincia: '' })
      .subscribe(r => this.departamentos = r.data);
  }

  cargarPreguntas() {    
    this.solicitudService.preguntasXAnexoFuncion({
      nro_anexo: this.nroAnexo,
      id_funcion: this.idFuncion
    }).subscribe(resp => {
      this.preguntas = resp.data;
      const guardado = this.anexosState.get(this.nroAnexo, this.idFuncion);

      resp.data.forEach((p: any) => {
        if (!p.ngmodel || ['tittle','subtittle','no-type'].includes(p.idTipoInput)) return;

        if (p.idTipoInput === 'check') {
          this.respuestas[p.ngmodel] = guardado[p.ngmodel] ?? this.prefill[p.ngmodel] ?? false;
        } else if (p.idTipoInput === 'table') {
          this.respuestas[p.ngmodel] = guardado[p.ngmodel]?.length
            ? guardado[p.ngmodel]
            : (this.prefill[p.ngmodel] ?? []);
        } else {
          const valor = (guardado[p.ngmodel] !== undefined && guardado[p.ngmodel] !== '')
            ? guardado[p.ngmodel]
            : (this.prefill[p.ngmodel] ?? '');
          this.respuestas[p.ngmodel] = valor;
        }
      });

      this.restaurarCombos();
    });
  }

  restaurarCombos() {
    const intentar = () => {
      if (this.tiposDocumento.length === 0 || this.departamentos.length === 0) {
        setTimeout(intentar, 100);
        return;
      }

      const td  = this.respuestas['tipoDocumento'];
      const dep = this.respuestas['departamento'];
      const prov = this.respuestas['provincia'];

      if (td)  this.respuestas['tipoDocumento'] = td;

      if (!dep) return;
      this.respuestas['departamento'] = dep;

      this.comboService.listarUbigeo({ accion: '9', id_departamento: dep, id_provincia: '' })
        .subscribe(r => {
          this.provincias = r.data;
          if (!prov) return;
          this.respuestas['provincia'] = prov;
          this.comboService.listarUbigeo({ accion: '10', id_departamento: dep, id_provincia: prov })
            .subscribe(r2 => {
              this.distritos = r2.data;
              const dist = this.respuestas['distrito'];
              if (dist) this.respuestas['distrito'] = dist;
            });
        });
    };

    intentar();
  }

  restaurarUbigeo() {
    const dep  = this.respuestas['departamento'];
    const prov = this.respuestas['provincia'];

    if (!dep) return;

    const intentar = () => {
      if (this.departamentos.length === 0) {
        setTimeout(intentar, 100);
        return;
      }
      this.respuestas['departamento'] = dep;

      this.comboService.listarUbigeo({ accion: '9', id_departamento: dep, id_provincia: '' })
        .subscribe(r => {
          this.provincias = r.data;
          if (!prov) return;

          this.respuestas['provincia'] = prov;
          this.comboService.listarUbigeo({ accion: '10', id_departamento: dep, id_provincia: prov })
            .subscribe(r2 => {
              this.distritos = r2.data;
              const dist = this.respuestas['distrito'];
              if (dist) this.respuestas['distrito'] = dist;
            });
        });
    };

    intentar();
  }

  onDepartamentoChange() {
    this.provincias = [];
    this.distritos = [];
    this.respuestas['provincia'] = '';
    this.respuestas['distrito'] = '';
    const dep = this.respuestas['departamento'];
    if (dep) {
      this.comboService.listarUbigeo({ accion: '9', id_departamento: dep, id_provincia: '' })
        .subscribe(r => this.provincias = r.data);
    }
  }

  onProvinciaChange() {
    this.distritos = [];
    this.respuestas['distrito'] = '';
    const dep = this.respuestas['departamento'] ?? '';
    const prov = this.respuestas['provincia'];
    if (prov) {
      this.comboService.listarUbigeo({ accion: '10', id_departamento: dep, id_provincia: prov })
        .subscribe(r => this.distritos = r.data);
    }
  }

  guardar() {
    this.anexosState.set(this.nroAnexo, this.idFuncion, this.respuestas);
    this.guardado.emit();
    this.cerrar.emit();
  }
}