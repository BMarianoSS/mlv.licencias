import {
  Component, EventEmitter, Output,
  AfterViewInit, OnDestroy, ElementRef, ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { SolicitudService } from '../../core/services/solicitud.service';
import * as L from 'leaflet';

// Fix para los iconos de leaflet con webpack/angular
const iconDefault = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

export interface PredioMapa {
  codPredio: string;
  direccion: string;
  lat: number;
  lng: number;
  // nuevos
  tipo_via:   string;
  direcPred:  string;
  id_via:     string;
  nroPredio:  string;
  intPredio:  string;
  mzPredio:   string;
  ltPredio:   string;
  areaConstr: string;
  refEstablecimiento: string;
}

@Component({
  selector: 'app-modal-mapa',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-mapa.component.html',
})
export class ModalMapaComponent implements AfterViewInit, OnDestroy {
  @Output() cerrar = new EventEmitter<void>();
  @Output() predioSeleccionado = new EventEmitter<{
    codPredio:  string;
    direccion:  string;
    tipo_via:   string;
    direcPred:  string;
    id_via:     string;
    nroPredio:  string;
    intPredio:  string;
    mzPredio:   string;
    ltPredio:   string;
    areaConstr: string;
    refEstablecimiento: string;
  }>();
  @ViewChild('mapaContainer') mapaContainer!: ElementRef;

  busqueda = '';
  private map!: L.Map;
  private markers: L.Marker[] = [];
  predioActivo: PredioMapa | null = null;
  private markerActivo: L.Marker | null = null;
  codigo: string = '';
  
  constructor(private solicitudService: SolicitudService, private authService: AuthService) { }

  // Predios simulados con coordenadas reales (Lima, Perú)
  predios: PredioMapa[] = [];  
  cargando = true;

  get prediosFiltrados() {
    const q = this.busqueda.toLowerCase();
    return this.predios.filter(
      p => p.codPredio.includes(q) || p.direccion.toLowerCase().includes(q)
    );
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.initMap(), 100);
  }

  private initMap(): void {
    this.map = L.map(this.mapaContainer.nativeElement).setView([-12.0770, -77.0224], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19
    }).addTo(this.map);
  }

  resaltarPredioPorCodigo(codPredio: string): void {
    const predio = this.predios.find(p => p.codPredio === codPredio);
    if (!predio) return;
    this.predioActivo = predio;

    // Quitar marcador anterior si existe
    if (this.markerActivo) {
      this.map.removeLayer(this.markerActivo);
    }

    // Poner marcador nuevo y abrir popup
    this.markerActivo = L.marker([predio.lat, predio.lng])
      .addTo(this.map)
      .bindPopup(`<b>${predio.codPredio}</b><br>${predio.direccion}`)
      .openPopup();

    this.map.setView([predio.lat, predio.lng], 17);
  }

  seleccionar(predio: PredioMapa): void {
    this.predioSeleccionado.emit({
      codPredio:          predio.codPredio,
      direccion:          predio.direccion,
      tipo_via:           predio.tipo_via,
      direcPred:          predio.direcPred,
      id_via:             predio.id_via,
      nroPredio:          predio.nroPredio,
      intPredio:          predio.intPredio,
      mzPredio:           predio.mzPredio,
      ltPredio:           predio.ltPredio,
      areaConstr:         predio.areaConstr,
      refEstablecimiento: predio.refEstablecimiento,
    });
    this.cerrar.emit();
  }

  ngOnDestroy(): void {
    if (this.markerActivo) this.map.removeLayer(this.markerActivo);
    if (this.map) this.map.remove();
  }

  ngOnInit() {
    this.codigo = this.authService.getUser()?.codigo ?? '';  
    this.listarPredios();
  }

  listarPredios() {
    this.cargando = true;
    const payload = { codigo_contrib: this.codigo};

    this.solicitudService.listarPredios(payload)
      .subscribe({
        next: (resp) => {
          this.predios = resp.data.map(g => ({
            codPredio:          g.codPred,
            direccion:          g.direccion,
            lat:                Number(g.lat),
            lng:                Number(g.lon),
            tipo_via:           g.tipoVia   ?? '',
            direcPred:          g.direccion  ?? '',
            id_via:             g.idVia     ?? '',
            nroPredio:          g.nroPredio  ?? '',
            intPredio:          g.intPredio  ?? '',
            mzPredio:           g.mzPredio   ?? '',
            ltPredio:           g.ltPredio   ?? '',
            areaConstr:         g.areaConstr ?? '',
            refEstablecimiento: g.refEstablecimiento ?? '',
          }));
          this.cargando = false; 
        },
        error: (err) => {
          console.error('Error al cargar predios:', err);
          this.cargando = false; 
        }
      });
  }
}