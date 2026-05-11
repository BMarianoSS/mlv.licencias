import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { SolicitudStateService } from '../../core/services/solicitud-state.service';
import { SectionHeaderComponent } from '../../shared';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule, SectionHeaderComponent],
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
    this.state.limpiarState();
    this.router.navigate(['../principal'], { relativeTo: this.route });
  }

  irAPantalla62() {
    this.state.limpiarState();
    this.router.navigate(['../pantalla6-2'], { relativeTo: this.route });
  }
}
