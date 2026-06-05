import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Router, RouterModule } from '@angular/router';
import { ComboService } from '../../core/services/combo.service'
import { SolicitudStateService } from '../../core/services/solicitud-state.service'
import { SectionHeaderComponent, NavButtonsComponent } from '../../shared';

@Component({
  selector: 'app-pantalla1',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule,SectionHeaderComponent,NavButtonsComponent],
  templateUrl: './pantalla1.component.html',
  styleUrl: './pantalla1.component.css'
})
export class pantalla1Component {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private state: SolicitudStateService,
    private comboService: ComboService,
  ) { }

  sidebarOpen = false;

  tiposLicencia: any[] = [];
  tipoLicenciaSeleccionado = '';
  aceptaTerminos = false;

  ngOnInit() {
    this.listarTiposLicencia();
  }

  listarTiposLicencia() {
    const payload = {};

    this.comboService.listarTiposLicencia(payload)
      .subscribe(resp => {
        this.tiposLicencia = resp.data;

        if (this.state.idTipoLicencia) {
          this.tipoLicenciaSeleccionado = this.state.idTipoLicencia;
          this.aceptaTerminos           = this.state.aceptaTerminos
        }
      });
  }

  continuar() {
    this.state.flujoActivo = true;
    sessionStorage.setItem('flujoActivo', 'true');
    const tipo = this.tiposLicencia.find(t => t.idTipoLicencia === this.tipoLicenciaSeleccionado);
    this.state.idTipoLicencia = this.tipoLicenciaSeleccionado;
    this.state.descSolicitud = tipo?.descTipoLicencia ?? '';
    this.state.aceptaTerminos = this.aceptaTerminos ?? false;
    this.router.navigate(['../pantalla2'], { relativeTo: this.route });
  }
  
  atras() {
    this.state.limpiarState();
    this.router.navigate(['../home'], { relativeTo: this.route });
  }
}
