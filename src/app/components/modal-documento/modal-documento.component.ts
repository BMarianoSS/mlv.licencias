import { Component, EventEmitter, Output, Input, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SolicitudService } from '../../core/services/solicitud.service'
import { ModalWrapperComponent } from '../../shared'

@Component({
  selector: 'app-modal-documento',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalWrapperComponent],
  templateUrl: './modal-documento.component.html',
})
export class ModalDocumentoComponent implements OnDestroy {
  @Output() cerrar = new EventEmitter<void>();
  @Input() id_solicitud:any = '';

  documentUrl: SafeResourceUrl | null = null;
  private blobUrl: string | null = null;

  constructor(private solicitudService: SolicitudService, private sanitizer: DomSanitizer) { }

  cargando = true;

  ngOnInit() {
    this.obtenerDocumentos();
  }

  obtenerDocumentos() {
    this.cargando = true;
    const payload = { id_solicitud: this.id_solicitud};

    this.solicitudService.obtenerRutaArchivo(payload)
      .subscribe({
        next: (blob) => {
          if (this.blobUrl) {
            URL.revokeObjectURL(this.blobUrl);
          }
          this.blobUrl = URL.createObjectURL(blob);
          this.documentUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.blobUrl);
          this.cargando = false;
        },
        error: (err) => {
          console.error('Error al obtener documentos:', err);
          this.cargando = false;
        }
      });
  }

  ngOnDestroy() {
    if (this.blobUrl) {
      URL.revokeObjectURL(this.blobUrl);
      this.blobUrl = null;
    }
  }
}