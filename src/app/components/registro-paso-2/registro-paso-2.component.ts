import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { RegistroStateService } from '../../core/services/registro-state.service';
import { ComboService } from '../../core/services/combo.service';
import { filtrarSoloNumeros } from '../../core/utils/form.utils';
import { SectionHeaderComponent, NavButtonsComponent } from '../../shared';

@Component({
  selector: 'app-registro-paso-2',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, SectionHeaderComponent, NavButtonsComponent],
  templateUrl: './registro-paso-2.component.html',
})
export class RegistroPaso2Component {
  correo     = '';
  telefono   = '';
  password   = '';
  rePassword = '';

  direccion            = '';
  numero               = '';
  interior             = '';
  manzana              = '';
  lote                 = '';
  denominacion         = '';  
  departamentos: any[] = [];
  provincias: any[]    = [];
  distritos: any[]     = [];
  departamentoSeleccionado = '';
  provinciaSeleccionada    = '';
  distritoSeleccionado     = '';

  nroRuc            = '';  
  tieneDiscapacidad = '';

  mostrarModal = false;
  modalExito   = false;
  modalMensaje = '';
  cargando     = false;
  
  filtrarNumeros = filtrarSoloNumeros;

  constructor(
    private authService: AuthService,
    public state: RegistroStateService,
    private comboService: ComboService,
    private router: Router
  ) {}

  ngOnInit() {
    this.listarDepartamentos();
  }

  listarDepartamentos() {
    this.comboService.listarUbigeo({ accion: '8', id_departamento: '', id_provincia: '' })
      .subscribe(resp => this.departamentos = resp.data);
  }

  listarProvincias() {
    this.comboService.listarUbigeo({ accion: '9', id_departamento: this.departamentoSeleccionado, id_provincia: '' })
      .subscribe(resp => this.provincias = resp.data);
  }

  listarDistritos() {
    this.comboService.listarUbigeo({ accion: '10', id_departamento: this.departamentoSeleccionado, id_provincia: this.provinciaSeleccionada })
      .subscribe(resp => this.distritos = resp.data);
  }

  onDepartamentoChange() {
    this.provinciaSeleccionada = '';
    this.distritoSeleccionado  = '';
    this.provincias = [];
    this.distritos  = [];
    if (this.departamentoSeleccionado) this.listarProvincias();
  }

  onProvinciaChange() {
    this.distritoSeleccionado = '';
    this.distritos = [];
    if (this.provinciaSeleccionada) this.listarDistritos();
  }

  get passwordsCoinciden(): boolean {
    return this.password === this.rePassword;
  }

  get passwordValida(): boolean {
    return /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/.test(this.password);
  }

  get correoValido(): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.correo);
  }

  get formularioValido(): boolean {
    let baseValid = !!(this.correoValido && this.telefono &&
      this.password && this.rePassword && this.passwordsCoinciden && this.passwordValida &&
      this.direccion && this.departamentoSeleccionado &&
      this.provinciaSeleccionada && this.distritoSeleccionado &&
      this.tieneDiscapacidad !== '' && !!this.nroRuc && !!this.denominacion);

    return baseValid;
  }

  siguiente() {
    this.state.paso2 = {
      correo:       this.correo,
      telefono:     this.telefono,
      nroRuc:       this.nroRuc,
      direccion:    this.direccion,
      numero:       this.numero,
      interior:     this.interior,
      manzana:      this.manzana,
      lote:         this.lote,
      denominacion: this.denominacion,
      departamento: this.departamentoSeleccionado,
      provincia:    this.provinciaSeleccionada,
      distrito:     this.distritoSeleccionado,
      discapacidad: this.tieneDiscapacidad,
      password:     this.password,
      rePassword:   this.rePassword,
    };

    if (this.state.paso1.tipoPersona === '2') {
      this.router.navigate(['/registro/paso-3']);
    } else {
      this.registrar();
    }
  }

  registrar(): void {
    const { paso1, paso2 } = this.state;

    const payload = {
      tipo_persona:               paso1.tipoPersona,
      tipo_documento:             paso1.tipoDocumento,
      nro_documento:              paso1.nroDocumento,
      nombres:                    paso1.nombres,
      apellido_paterno:           paso1.apellidoPaterno,
      apellido_materno:           paso1.apellidoMaterno,
      correo:                     paso2.correo,
      password_hash:              paso2.password,
      telefono:                   paso2.telefono,
      nro_ruc:                    paso2.nroRuc,
      denominacion:               paso2.denominacion,
      direccion:                  paso2.direccion,
      numero_direccion:           paso2.numero,
      interior:                   paso2.interior,
      manzana:                    paso2.manzana,
      lote:                       paso2.lote,
      departamento:               paso2.departamento,
      provincia:                  paso2.provincia,
      distrito:                   paso2.distrito,
      rep_legal_nombre:           '',
      rep_legal_tipo_documento:   '',
      rep_legal_nro_documento:    '',
      rep_legal_nro_partida:      '',
      rep_legal_telefono:         '',
      flag_discapacidad:          this.tieneDiscapacidad,
      nro_partida_electronica:    '',
      nro_asiento_sunarp:         '',
      operador:                   'Sistemas',
      estacion:                   '',
    };

    this.cargando = true;

    this.authService.crearUsuario(payload).subscribe({
      next: (resp) => {
        this.modalExito   = resp.data.success === 'True';
        this.modalMensaje = resp.data.mensaje;
        this.mostrarModal = true;
        this.cargando     = false;
      },
      error: () => {
        this.modalExito   = false;
        this.modalMensaje = 'Ocurrió un error al conectar con el servidor. Inténtelo nuevamente.';
        this.mostrarModal = true;
        this.cargando     = false;
      }
    });
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    if (this.modalExito) {
      this.router.navigate(['/login']);
    }
  }
}