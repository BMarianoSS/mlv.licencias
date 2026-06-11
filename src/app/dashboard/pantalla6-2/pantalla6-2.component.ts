import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SolicitudService } from '../../core/services/solicitud.service';
import { SolicitudStateService } from '../../core/services/solicitud-state.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-pantalla6-2',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './pantalla6-2.component.html',
  styleUrl: './pantalla6-2.component.css'
})
export class pantalla62Component implements OnInit{
  sidebarOpen = false;
  solicitudFinalDatos: any[] = [];

  constructor(private auth: AuthService, private solicitudService: SolicitudService, private state: SolicitudStateService) {}

  ngOnInit() {
    this.solicitudFinal();
  }

  solicitudFinal() {
    const user = this.auth.getUser();
    const payload = { 
      nro_documento:  user.nroDocumento,
      asunto:         this.state.descrip_nivelesRiesgo,
      tipo_persona:   user.tipoPersona,
      ip_pc:          '',
      nombre_pc:      'Licencia-Publica',
      usuario_pc:     'Licencia-Publica'
    };
    

    this.solicitudService.solicitudFinal(payload).subscribe(
      (response) => {
        this.solicitudFinalDatos = response.data;
        console.log('Respuesta de solicitudFinal:', response);
      },
      (error) => {
        console.error('Error en solicitudFinal:', error);
      }
    );

    this.solicitudService.aprobarSolicitud({ nro_expediente: user.nroDocumento, id_solicitud: this.state.idSolicitudCreada, operador: user.nroDocumento, estacion: 'Licencia-Publica' }).subscribe(
      (response) => {
        console.log('Respuesta de aprobarSolicitud:', response);
      },
      (error) => {
        console.error('Error en aprobarSolicitud:', error);
      }
    );

    
    this.state.limpiarState();
  }
}
