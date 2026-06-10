import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { WelcomeScreenComponent } from '../../shared';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, WelcomeScreenComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;
  loginErrorMessage: string | null = null;

  // Welcome screen
  mostrarBienvenida = false;
  nombreBienvenida  = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      codigo:       ['', Validators.required],
      userpassword: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.invalid) return;

    this.loginErrorMessage = null;
    localStorage.removeItem('authToken');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    const payload = this.loginForm.value;

    this.authService.login(payload).subscribe({
      next: (response) => {
        if (response.data.bloqueado == '1') {
          localStorage.removeItem('authToken');
          this.loginErrorMessage = 'Usuario bloqueado. Debe cambiar su contraseña.';
          return;
        }

        const token         = response.data.token;
        const idSolicitante = response.data.idSolicitante;
        localStorage.setItem('authToken', token);

        this.authService.obtenerUsuario({ id_solicitante: idSolicitante }).subscribe({
          next: (userResp) => {
            this.authService.setSession(token, userResp.data[0]);

            // Armar nombre para la bienvenida
            const u = userResp.data[0];
            this.nombreBienvenida = u.nombres
              ? `${u.nombres} ${u.apellidoPaterno ?? ''}`.trim()
              : u.razonSocial ?? '';

            // Mostrar pantalla de bienvenida
            this.mostrarBienvenida = true;
          },
          error: (err) => console.error('Error al obtener usuario:', err)
        });

        this.authService.desbloquearUsuario({ login: payload.codigo }).subscribe({
          error: (err) => console.error('Error al desbloquear:', err)
        });
      },

      error: (err) => {
        this.loginErrorMessage = err.error?.message || 'Usuario o contraseña incorrectos';

        this.authService.intentosUsuario({ login: payload.codigo }).subscribe({
          error: (err) => console.error('Error al actualizar intentos:', err)
        });
      }
    });
  }

  onBienvenidaLista() {
    this.mostrarBienvenida = false;
    this.router.navigate(['/dashboard']);
  }
}