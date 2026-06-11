import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { SolicitudStateService } from '../../core/services/solicitud-state.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './pantalla6.component.html',
  styleUrl: './pantalla6.component.css'
})
export class pantalla6Component{
  sidebarOpen = false;

  constructor(
    private state: SolicitudStateService,
    private route: ActivatedRoute,
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
}
