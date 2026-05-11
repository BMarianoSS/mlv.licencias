import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SolicitudStateService } from '../../core/services/solicitud-state.service';
import { filtrarSoloNumeros } from '../../core/utils/form.utils';
import { SectionHeaderComponent,NavButtonsComponent,FormFieldComponent } from '../../shared';

@Component({
  selector: 'app-pantalla3',
  standalone: true,
  imports: [RouterModule,FormsModule,SectionHeaderComponent, NavButtonsComponent, FormFieldComponent],
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
    
  filtrarNumeros = filtrarSoloNumeros;

  ngOnInit() {
    const s = this.state;
    if (!s.ASentidadautoriza) return;

    this.ASentidadautoriza = s.ASentidadautoriza;
    this.ASdenominacion    = s.ASdenominacion;
    this.ASnumero          = s.ASnumero;
    if (s.ASfecha) {
      const [dd, mm, yyyy] = s.ASfecha.split('/');
      this.ASfecha = `${yyyy}-${mm}-${dd}`;
    }
  }

  onFileAS(event: Event) {
    const input = event.target as HTMLInputElement;
    this.autorizacion_sectorial_path = input.files?.[0] ?? null;
  }

  filterNumbersASnumero(value: string): string {
    return value.replace(/[^0-9]/g, '');
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
