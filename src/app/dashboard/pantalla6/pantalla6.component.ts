import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { SolicitudStateService } from '../../core/services/solicitud-state.service';
import { AuthService } from '../../core/services/auth.service';
import { SolicitudService } from '../../core/services/solicitud.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './pantalla6.component.html',
  styleUrl: './pantalla6.component.css'
})
export class pantalla6Component{
  sidebarOpen = false;
  isLoading   = false;
  loadingText = 'Procesando...';

  constructor(
    private state: SolicitudStateService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private solicitudService: SolicitudService,
    private router: Router
  ) {}

  get mensaje()     { return this.state.mensajeRespuesta; }
  get idSolicitud() { return this.state.idSolicitudCreada; }  
  get nroProforma() { return this.state.nroProforma; }  
  get monto()       { return this.state.monto; }  

  irAPantallaHome() {
    this.router.navigate(['../principal'], { relativeTo: this.route });
    this.state.limpiarState();
  }

  irAPantalla62() {
      this.router.navigate(['../pantalla6-2'], { relativeTo: this.route });
  }

  continuar() {
    this.isLoading = true;
    const user = this.authService.getUser();

    const payloadFinal = {
      nro_documento: user.nroDocumento,
      asunto:        this.state.descrip_nivelesRiesgo,
      tipo_persona:  user.tipoPersona,
      ip_pc:         '',
      nombre_pc:     'Licencia-Publica',
      usuario_pc:    'Licencia-Publica'
    };

    this.solicitudService.solicitudFinal(payloadFinal).subscribe({
      next: (resp) => {
        const data = Array.isArray(resp.data) ? resp.data[0] : resp.data;

        this.state.nuExpediente      = data?.nuExpediente      ?? '';
        this.state.numeroResolucion  = data?.NumeroResolucion  ?? '';
        this.state.numeroCertificado = data?.NumeroCertificado ?? '';

        const hoy = new Date();
        const fecha = `${hoy.getDate().toString().padStart(2,'0')}/${(hoy.getMonth()+1).toString().padStart(2,'0')}/${hoy.getFullYear()}`;

        this.solicitudService.aprobarSolicitud({
          nro_expediente:   this.state.nuExpediente,
          fecha_expediente: fecha,
          nro_resolucion:   this.state.numeroResolucion,
          fecha_resolucion: fecha,
          nro_certificado:  this.state.numeroCertificado,
          id_solicitud:     this.state.idSolicitudCreada,
          operador:         user.dniruc ?? '',
          estacion:         ''
        }).subscribe({
          next: () => {
            this.isLoading = false;
            this.irAPantalla62();
          },
          error: (err) => {
            this.isLoading = false;
            console.error('Error en aprobarSolicitud:', err);
          }
        });
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error en solicitudFinal:', err);
      }
    });
  }
}
