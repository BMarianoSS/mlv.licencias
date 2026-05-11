import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CambiarContrasenaResponse } from '../../core/interfaz/ILoginLicencia';

@Component({
    selector: 'app-cambiar-contrasena',
    standalone: true,
    imports: [CommonModule, RouterModule, ReactiveFormsModule],
    templateUrl: './cambiar-contrasena.component.html',
    styleUrl: './cambiar-contrasena.component.css'
})
export class CambiarContrasenaComponent implements OnInit {
    form: FormGroup;
    loading = false;
    messageError = '';
    messageSuccess = '';
    showPassword = false;
    showConfirmPassword = false;
    emailRecibido = '';

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        this.form = this.fb.group({
            codigo: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
            nuevaContrasena: ['', [Validators.required, Validators.minLength(8)]],
            confirmarContrasena: ['', Validators.required]
        }, { validators: this.passwordMatchValidator });
    }

    ngOnInit() {
        // Recuperar datos de la sesión
        const email = sessionStorage.getItem('changePasswordEmail');

        if (!email) {
            this.router.navigate(['/solicitar-cambio-contrasena']);
            return;
        }

        this.emailRecibido = email;
    }

    passwordMatchValidator(formGroup: FormGroup) {
        const password = formGroup.get('nuevaContrasena')?.value;
        const confirmPassword = formGroup.get('confirmarContrasena')?.value;

        if (password !== confirmPassword) {
            formGroup.get('confirmarContrasena')?.setErrors({ 'passwordMismatch': true });
            return { passwordMismatch: true };
        }
        return null;
    }

    togglePasswordVisibility(field: string) {
        if (field === 'password') {
            this.showPassword = !this.showPassword;
        } else if (field === 'confirm') {
            this.showConfirmPassword = !this.showConfirmPassword;
        }
    }

    onCambiar() {
        if (this.form.invalid) return;

        this.loading = true;
        this.messageError = '';
        this.messageSuccess = '';

        const { codigo, nuevaContrasena } = this.form.value;

        this.authService.cambiarContrasena({
            correo: this.emailRecibido,
            codigo: codigo,
            nuevaContrasena: nuevaContrasena
        }).subscribe({
            next: (response: CambiarContrasenaResponse) => {
                this.loading = false;

                if (response.resultado === 1) {
                    this.messageSuccess = 'Contraseña actualizada correctamente. Redirigiendo al login...';

                    sessionStorage.removeItem('changePasswordEmail');
                    sessionStorage.removeItem('changePasswordCode');

                    setTimeout(() => {
                        this.router.navigate(['/login']);
                    }, 2000);
                } else {
                    this.messageError = response.mensaje || 'Error al cambiar la contraseña';
                }
                this.authService.desbloquearUsuario({ login: this.emailRecibido })
                    .subscribe({
                    next: (userResp) => {},
                    error: (err) => {
                        console.error('Error al obtener usuario:', err);
                    }
                });
            },
            error: (err) => {
                this.loading = false;
                console.error('Error:', err);
                this.messageError = 'Error al cambiar la contraseña. Verifica el código y que no haya expirado.';
            }
        });
    }

    irAlLogin() {
        sessionStorage.removeItem('changePasswordEmail');
        sessionStorage.removeItem('changePasswordCode');
        this.router.navigate(['/login']);
    }

    irASolicitar() {
        this.router.navigate(['/solicitar-cambio-contrasena']);
    }
}
