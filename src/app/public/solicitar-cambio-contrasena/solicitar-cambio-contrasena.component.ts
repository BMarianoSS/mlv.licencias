import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SolicitarCodigoCambioContrasenaResponse } from '../../core/interfaz/ILoginLicencia';

@Component({
    selector: 'app-solicitar-cambio-contrasena',
    standalone: true,
    imports: [CommonModule, RouterModule, ReactiveFormsModule],
    templateUrl: './solicitar-cambio-contrasena.component.html',
    styleUrl: './solicitar-cambio-contrasena.component.css'
})
export class SolicitarCambioContrasenaComponent {
    form: FormGroup;
    loading = false;
    messageError = '';
    messageSuccess = '';
    codigoGenerado = '';
    emailEnviado = '';

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        this.form = this.fb.group({
            correo: ['', [Validators.required, Validators.email]]
        });
    }

    onSolicitar() {
        if (this.form.invalid) return;

        this.loading = true;
        this.messageError = '';
        this.messageSuccess = '';
        this.codigoGenerado = '';
        this.emailEnviado = '';

        const correo = this.form.value.correo;

        this.authService.solicitarCodioCambioContrasena(correo).subscribe({
            next: (response: SolicitarCodigoCambioContrasenaResponse) => {
                this.loading = false;

                if (response.resultado === 1) {
                    this.codigoGenerado = response.codigo || '';
                    this.emailEnviado = response.email || '';
                    this.messageSuccess = `Se ha enviado un código de 6 dígitos al correo ${correo}. El código expira en 15 minutos.`;

                    // Guardar datos temporales en sessionStorage
                    sessionStorage.setItem('changePasswordEmail', correo);

                    // Redirigir al componente de cambio de contraseña después de 2 segundos
                    setTimeout(() => {
                        this.router.navigate(['/cambiar-contrasena']);
                    }, 2000);
                } else {
                    this.messageError = response.mensaje || 'Error al solicitar el código';
                }
            },
            error: (err) => {
                this.loading = false;
                console.error('Error:', err);
                this.messageError = 'Error al solicitar el código. Por favor, verifica el correo ingresado.';
            }
        });
    }

    irAlLogin() {
        this.router.navigate(['/login']);
    }
}
