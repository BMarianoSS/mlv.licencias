import {
  Component, EventEmitter, Output,
  AfterViewInit, OnDestroy, ElementRef, ViewChild, OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SolicitudService } from '../../core/services/solicitud.service';
import { ModalWrapperComponent } from '../../shared';
import * as L from 'leaflet';
import proj4 from 'proj4';

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

const UTM18S = '+proj=utm +zone=18 +south +datum=WGS84 +units=m +no_defs';

export interface PredioMapa {
  codPredio:          string;
  direccion:          string;
  lat:                string;
  lng:                string;
  tipo_via:           string;
  direcPred:          string;
  id_via:             string;
  nroPredio:          string;
  intPredio:          string;
  mzPredio:           string;
  ltPredio:           string;
  areaConstr:         string;
  refEstablecimiento: string;
  geometry:           string;
}

@Component({
  selector: 'app-modal-mapa',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalWrapperComponent],
  templateUrl: './modal-mapa.component.html',
})
export class ModalMapaComponent implements OnInit, AfterViewInit, OnDestroy {
  @Output() cerrar = new EventEmitter<void>();
  @Output() predioSeleccionado = new EventEmitter<{
    codPredio:          string;
    direccion:          string;
    tipo_via:           string;
    direcPred:          string;
    id_via:             string;
    nroPredio:          string;
    intPredio:          string;
    mzPredio:           string;
    ltPredio:           string;
    areaConstr:         string;
    refEstablecimiento: string;
    lat:                string;
    lng:                string;
  }>();
  @ViewChild('mapaContainer') mapaContainer!: ElementRef;

  private map!: L.Map;
  private clickMarker: L.Marker | null = null;
  private predioPolygon: L.Polygon | null = null;

  predios: PredioMapa[] = [];
  predioActivo: PredioMapa | null = null;
  cargando = false;
  listaPanelVisible = false;
  mensajeEstado = 'Haz clic en el mapa para buscar predios cercanos.';

  constructor(
    private solicitudService: SolicitudService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => this.initMap(), 100);
  }

  private initMap(): void {
    this.map = L.map(this.mapaContainer.nativeElement).setView([-12.0770, -77.0224], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19
    }).addTo(this.map);

    this.map.on('click', (e: L.LeafletMouseEvent) => {
      this.onMapClick(e.latlng.lat, e.latlng.lng);
    });
  }

  private onMapClick(lat: number, lng: number): void {
    // Limpiar polígono anterior
    this.limpiarPoligono();

    if (this.clickMarker) {
      this.map.removeLayer(this.clickMarker);
    }
    this.clickMarker = L.marker([lat, lng])
      .addTo(this.map)
      .bindPopup('Buscando predios...')
      .openPopup();

    this.predios = [];
    this.predioActivo = null;
    this.cargando = true;
    this.listaPanelVisible = true; // ← mostrar panel al hacer clic
    this.mensajeEstado = 'Buscando predios...';

    this.solicitudService.listarCodLotePredios({
      lat: lat.toString(),
      lon: lng.toString()
    }).subscribe({
      next: (resp) => {
        const raw = Array.isArray(resp.data) ? resp.data : [resp.data];
        this.predios = raw
          .filter(g => g && g.codPred)
          .map(g => ({
            codPredio:          g.codPred,
            direccion:          g.direccion,
            lat:                g.lat,
            lng:                g.lon,
            tipo_via:           g.tipoVia            ?? '',
            direcPred:          g.direccion          ?? '',
            id_via:             g.idVia              ?? '',
            nroPredio:          g.nroPredio          ?? '',
            intPredio:          g.intPredio          ?? '',
            mzPredio:           g.mzPredio           ?? '',
            ltPredio:           g.ltPredio           ?? '',
            areaConstr:         g.areaConstr         ?? '',
            refEstablecimiento: g.refEstablecimiento ?? '',
            geometry:           g.geometry           ?? '',
          }));

        this.clickMarker?.setPopupContent(
          this.predios.length > 0
            ? `${this.predios.length} predio(s) encontrado(s)`
            : 'Sin predios en esta zona'
        );
        this.mensajeEstado = this.predios.length > 0
          ? 'Selecciona un predio de la lista.'
          : 'No se encontraron predios. Intenta otro punto.';
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al buscar predios:', err);
        this.clickMarker?.setPopupContent('Error al buscar predios.');
        this.mensajeEstado = 'Ocurrió un error. Intenta nuevamente.';
        this.cargando = false;
      }
    });
  }

  dibujarPoligono(predio: PredioMapa): void {
    this.predioActivo = predio;
    this.limpiarPoligono();

    if (!predio.geometry) return;

    const latlngs = this.wktUtmToLatLng(predio.geometry);
    if (!latlngs.length) return;

    this.predioPolygon = L.polygon(latlngs, {
      color:       '#1d4ed8',
      weight:      2,
      opacity:     1,
      fillColor:   '#3b82f6',
      fillOpacity: 0.25,
    }).addTo(this.map);

    this.map.fitBounds(this.predioPolygon.getBounds(), { padding: [40, 40] });
  }

  private limpiarPoligono(): void {
    if (this.predioPolygon) {
      this.map.removeLayer(this.predioPolygon);
      this.predioPolygon = null;
    }
  }

  private wktUtmToLatLng(wkt: string): L.LatLngTuple[] {
    const match = wkt.match(/POLYGON\s*\(\(([^)]+)\)\)/i);
    if (!match) return [];

    const proj4Fn: Function = (proj4 as any).default ?? proj4;

    return match[1].split(',').map(pair => {
      const [eStr, nStr] = pair.trim().split(/\s+/);
      const easting  = parseFloat(eStr);
      const northing = parseFloat(nStr);
      const [lng, lat] = proj4Fn(UTM18S, 'WGS84', [easting, northing]) as [number, number];
      return [lat, lng] as L.LatLngTuple;
    });
  }

  cerrarListaPanel(): void {
    this.listaPanelVisible = false;
    this.predioActivo = null;
    this.limpiarPoligono();
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
      lat:                predio.lat,
      lng:                predio.lng,
    });
    this.cerrar.emit();
  }

  ngOnDestroy(): void {
    this.limpiarPoligono();
    if (this.clickMarker) this.map.removeLayer(this.clickMarker);
    if (this.map) this.map.remove();
  }
}