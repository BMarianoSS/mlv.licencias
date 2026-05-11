import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { SolicitudService } from '../../core/services/solicitud.service';
import { ComboService } from '../../core/services/combo.service';
import { IRepresentanteLegalRequest, IEditarRepresentanteLegalRequest } from '../../core/interfaz/ISolicitudLicencia';
import { ModalRepresentanteComponent, Representante } from '../../components/modal-representante/modal-representante.component';
import { SectionHeaderComponent } from '../../shared';

@Component({
  selector: 'app-RegistroRepresentante',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, ModalRepresentanteComponent, SectionHeaderComponent],
  templateUrl: './RegistroRepresentante.component.html',
  styleUrl: './RegistroRepresentante.component.css'
})
export class RegistroRepresentanteComponent {

  constructor(
    private solicitudService: SolicitudService,
    private comboService: ComboService, 
    private authService: AuthService
  ) { }

  mostrarModalRepresentante = false;
  mostrarAvisoQuitar = false; 
  representantes: Representante[] = [];
  representanteEditIndex: number | null = null;
  representanteParaEditar: Representante | null = null;
  tipoDocumentos: any[] = [];
  idSolicitante: string = '';

  ngOnInit() {
    const datos = this.authService.getUser()
    this.idSolicitante = this.authService.getUser().idSolicitante ?? '';     
    this.listarTipoDoc();
    this.obtenerRepresentanteLegal();
  }

  abrirModalNuevo() {
    this.representanteEditIndex = null;
    this.representanteParaEditar = null;
    this.mostrarModalRepresentante = true;
  }

  abrirModalEditar(index: number) {
    this.representanteEditIndex = index;
    this.representanteParaEditar = { ...this.representantes[index] };
    this.mostrarModalRepresentante = true;
  }

  onRepresentanteGuardado(rep: Representante) {
    const payload: IEditarRepresentanteLegalRequest = {
      id_solicitante: this.idSolicitante,
      nombre_rl:      rep.nombreRL,
      id_tipo_doc_rl: rep.tipoDoc,
      nro_doc_rl:     rep.nroDoc,
      nro_partida_rl: rep.nroPartida,
      nro_telf_rl:    rep.telefono
    };

    this.solicitudService.editarRepresentanteLegal(payload).subscribe(() => {
      this.obtenerRepresentanteLegal();
    });
  }

  listarTipoDoc() {
    this.comboService.listarTipoDoc({}).subscribe(resp => {
      this.tipoDocumentos = resp.data;
    });
  }

  getNombreTipoDoc(id: string): string {
    const tipo = this.tipoDocumentos.find(t => t.idTipoDoc === id);
    return tipo ? tipo.descDocumento : id;
  }

  obtenerRepresentanteLegal() {
    const payload: IRepresentanteLegalRequest = { id_solicitante: this.idSolicitante };

    this.solicitudService.obtenerRepresentanteLegal(payload).subscribe(resp => {
      if (resp.data) {
        const data = Array.isArray(resp.data) ? resp.data : [resp.data];
        this.representantes = data.map(r => ({
          tipoDoc:    r.idTipoDocRL,
          nroDoc:     r.nroDocRL,
          nombreRL:   r.nombreRL,
          nroPartida: r.nroPartidaRL,
          telefono:   r.nroTelfRL
        }));
      }
    });
  }
}