import { Component } from '@angular/core';
import { SectionHeaderComponent } from '../../shared';
import { Router, RouterModule } from '@angular/router';
import { SolicitudService } from '../../core/services/solicitud.service';
import { SolicitudStateService } from '../../core/services/solicitud-state.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, SectionHeaderComponent],
  templateUrl: './pantalla6-2.component.html',
  styleUrl: './pantalla6-2.component.css'
})
export class pantalla62Component{
  sidebarOpen = false;
  solicitudFinalDatos: any[] = [];

  constructor(private auth: AuthService, private solicitudService: SolicitudService, private state: SolicitudStateService) {}

  solicitudFinal() {
    const user = this.auth.getUser();
    const payload = { 
      nro_documento:  user.nroDocumento,
      asunto:         this.state.nivelesRiesgo.toString(),
      tipo_persona:   user.tipoPersona,
      ip_pc:          '',
      nombre_pc:      'Licencia-Publica',
      usuario_pc:     'Licencia-Publica'
    };
    console.log('Payload para solicitudFinal:', payload);
    //this.solicitudService.solicitudFinal(payload).subscribe(
    //  (response) => {
    //    this.solicitudFinalDatos = response.data;
    //  },
    //  (error) => {
    //    console.error('Error en solicitudFinal:', error);
    //  }
    //);
  }
}
