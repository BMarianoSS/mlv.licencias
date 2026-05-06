import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SolicitudStateService } from '../../core/services/solicitud-state.service';

@Component({
  selector: 'app-pantalla3',
  standalone: true,
  imports: [RouterModule,FormsModule],
  templateUrl: './pantalla3.component.html',
  styleUrl: './pantalla3.component.css'
})
export class pantalla3Component  implements OnInit{
  
  constructor( private state: SolicitudStateService, ) { }

  sidebarOpen = false;
  ASentidadautoriza = '';
  ASdenominacion    = '';
  ASfecha           = '';
  ASnumero          = '';
  autorizacion_sectorial_path: File | null = null;

  ngOnInit() {
    const s = this.state;
    if (!s.ASentidadautoriza) return;

    this.ASentidadautoriza = s.ASentidadautoriza;
    this.ASdenominacion    = s.ASdenominacion;
    this.ASnumero          = s.ASnumero;
    // Convertir DD/MM/YYYY → YYYY-MM-DD para el input date
    if (s.ASfecha) {
      const [dd, mm, yyyy] = s.ASfecha.split('/');
      this.ASfecha = `${yyyy}-${mm}-${dd}`;
    }
    // El archivo no se puede restaurar (limitación del browser)
  }

  onFileAS(event: Event) {
    const input = event.target as HTMLInputElement;
    this.autorizacion_sectorial_path = input.files?.[0] ?? null;
  }

  filtrarNumeros(event: any): void {
    const input = event.target;
    let valor = input.value;
    valor = valor.replace(/[^0-9]/g, ''); 
    input.value = valor;
    this.ASnumero = valor;
  }

  guardarState() {
    this.state.ASentidadautoriza           = this.ASentidadautoriza;
    this.state.ASdenominacion              = this.ASdenominacion;
    this.state.ASfecha                     = this.ASfecha;
    if (this.ASfecha) {
        const [yyyy, mm, dd] = this.ASfecha.split('-');
        this.state.ASfecha = `${dd}/${mm}/${yyyy}`;
    } else {
        this.state.ASfecha = '';
    }
    this.state.ASnumero                    = this.ASnumero;
    this.state.autorizacion_sectorial_path = this.autorizacion_sectorial_path;
  }
}
