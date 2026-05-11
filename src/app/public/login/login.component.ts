import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;
  loginErrorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {

    this.loginForm = this.fb.group({
      codigo: ['', Validators.required],
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
        if (response.data.bloqueado == '1' || response.data.bloqueado == "1") {

          localStorage.removeItem('authToken');
          localStorage.removeItem('token');
          localStorage.removeItem('usuario');

          this.loginErrorMessage = 'Usuario bloqueado. Debe cambiar su contraseña.';
          return;
        }

        const token = response.data.token;
        const idSolicitante = response.data.idSolicitante;

        localStorage.setItem('authToken', token);

        this.authService.obtenerUsuario({
          id_solicitante: idSolicitante
        })
        .subscribe({

          next: (userResp) => {

            this.authService.setSession(
              token,
              userResp.data[0]
            );

            this.router.navigate(['/dashboard']);
          },

          error: (err) => {
            console.error('Error al obtener usuario:', err);
          }

        });

      },

      error: (err) => {
        console.error('Error en login:', err);

        this.loginErrorMessage =
          err.error?.message || 'Usuario o contraseña incorrectos';

        this.authService.intentosUsuario({
          login: payload.codigo
        })
        .subscribe({

          next: () => {},

          error: (err) => {
            console.error('Error al actualizar intentos:', err);
          }

        });

      }

    });

  }

}