import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { SolicitudStateService } from '../../core/services/solicitud-state.service';
import { AuthService } from '../../core/services/auth.service';
import { SolicitudService } from '../../core/services/solicitud.service';
import { PagosService } from '../../core/services/pagos.service';

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
  private loadingInterval: any;

  constructor(
    private state: SolicitudStateService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private solicitudService: SolicitudService,
    private pagosService: PagosService,
    private router: Router
  ) {}

  get mensaje()       { return this.state.mensajeRespuesta; }
  get idSolicitud()   { return this.state.idSolicitudCreada; }  
  get idSolicitud2()  { return this.state.nroSolicitudCreada; }
  get nroProforma()   { return this.state.nroProforma; }  
  get monto()         { return this.state.monto; }  

  iniciarAnimacionLoading() {
    let dots = 0;
    this.loadingText = 'Validando Solicitud';

    this.loadingInterval = setInterval(() => {
      dots = (dots + 1) % 4;
      this.loadingText = 'Validando Solicitud' + '.'.repeat(dots);
    }, 500);
  }

  detenerAnimacionLoading() {
    clearInterval(this.loadingInterval);
  }

  irAPantallaHome() {
    this.state.limpiarState();
    this.router.navigate(['../principal'], { relativeTo: this.route });
  }

  irAPantalla62() {
      this.router.navigate(['../pantalla6-2'], { relativeTo: this.route });
  }

  continuar() {
    this.isLoading = true;
    this.iniciarAnimacionLoading();
    const user = this.authService.getUser();

    const hoy = new Date();
    const fecha = `${hoy.getDate().toString().padStart(2,'0')}/${(hoy.getMonth()+1).toString().padStart(2,'0')}/${hoy.getFullYear()}`;

    // Paso 1: crear-expediente
    this.solicitudService.crearExpediente({
      pNuDni:     user.nroDocumento,
      pDeAsunto:  this.state.descrip_nivelesRiesgo,
      pTiEmi:     user.tipoPersona,
      pDeIpPc:    '',
      pDeNamePc:  'Licencia-Publica',
      pDeUserPc:  'Licencia-Publica'
    }).subscribe({
      next: (respExp) => {
        const expData = Array.isArray(respExp.data) ? respExp.data[0] : respExp.data;
        this.state.nuExpediente = expData?.nuExpediente ?? '';
        this.state.feExpediente = expData?.feExpediente ?? '';

        // Paso 2: aprobar-solicitud
        this.solicitudService.aprobarSolicitud({
          id_solicitud: this.state.idSolicitudCreada,
          operador:     user.nroDocumento,
          estacion:     ''
        }).subscribe({
          next: (respApr) => {
            const aprData = Array.isArray(respApr.data) ? respApr.data[0] : respApr.data;
            const idSolicitudAprobada = aprData?.idSolicitudGenerada ?? this.state.idSolicitudCreada;
            this.state.idSolicitudGenerada = idSolicitudAprobada;
            this.state.numeroResolucion    = aprData?.numeroResolucion ?? '';

            // Paso 3: pagar-proforma
            this.pagosService.pagoProforma({
              codigo:       user.codigo,
              idproforma:   this.state.idProforma,
              monto:        this.state.monto,
              fec_cobro:    fecha,
              observa:      `PROFORMA NRO ${this.state.nroProforma}`,
              observacion2: 'Licencia system'
            }).subscribe({
              next: (respPago) => {
                const pagoData = Array.isArray(respPago.data) ? respPago.data[0] : respPago.data;

                // Paso 4: pagar-solicitud
                this.solicitudService.pagarSolicitud({
                  id_solicitud: idSolicitudAprobada,
                  nro_recibo:   pagoData?.emitido ?? '',
                  id_recibo:    pagoData?.idrecibo ?? '',
                  nro_expediente: this.state.nuExpediente ?? '',
                  fecha_expediente: this.state.feExpediente ?? '',
                }).subscribe({
                  next: () => {
                    this.detenerAnimacionLoading();
                    this.isLoading = false;
                    this.irAPantalla62();
                  },
                  error: (err) => {
                    this.detenerAnimacionLoading();
                    this.isLoading = false;
                    console.error('Error en pagar-solicitud:', err);
                  }
                });
              },
              error: (err) => {
                this.detenerAnimacionLoading();
                this.isLoading = false;
                console.error('Error en pagar-proforma:', err);
              }
            });
          },
          error: (err) => {
            this.detenerAnimacionLoading();
            this.isLoading = false;
            console.error('Error en aprobar-solicitud:', err);
          }
        });
      },
      error: (err) => {
        this.detenerAnimacionLoading();
        this.isLoading = false;
        console.error('Error en crear-expediente:', err);
      }
    });
  }
}
