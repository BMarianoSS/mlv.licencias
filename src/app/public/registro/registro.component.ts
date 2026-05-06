import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { RegistroStateService } from '../../core/services/registro-state.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class registroComponent implements OnInit {

  pasos = [
    { label: 'Solicitante', ruta: '/registro/paso-1' },
    { label: 'Contacto',    ruta: '/registro/paso-2' },
    { label: 'Empresa',     ruta: '/registro/paso-3' },
  ];

  pasoActual = 0;

  constructor(private router: Router, private state: RegistroStateService) {}

  ngOnInit(): void {
    this.detectarPasoActual(this.router.url);

    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: any) => this.detectarPasoActual(e.urlAfterRedirects));
  }

  private detectarPasoActual(url: string): void {
    const idx = this.pasos.findIndex(p => url.includes(p.ruta));
    this.pasoActual = idx >= 0 ? idx : 0;
  }

  get pasosVisibles() {
    return this.pasos.filter((_, i) =>
      i !== 3 || this.state.paso1.tipoPersona === '2'
    );
  }

  irAPaso(index: number): void {
    // Solo permite navegar a pasos ya visitados (anteriores al actual)
    if (index < this.pasoActual) {
      this.router.navigateByUrl(this.pasos[index].ruta);
    }
  }
}