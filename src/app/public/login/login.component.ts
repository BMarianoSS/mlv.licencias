import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

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

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    const payload = this.loginForm.value;

    this.authService.login(payload).subscribe({
      next: (response) => {        
        const token = response.data.token;
        const idSolicitante = response.data.id_solicitante;

        localStorage.setItem('authToken', token);

        this.authService.obtenerUsuario({ id_solicitante: idSolicitante })
        .subscribe({
          next: (userResp) => {
            this.authService.setSession(token, userResp.data[0]); 
            this.router.navigate(['/dashboard']);
          },
          error: (err) => {
            console.error('Error al obtener usuario:', err);
          }
        });
      },
      error: (err) => {
        console.error('Error en login:', err);
        alert('Usuario o contraseña incorrectos');
      }
    });
  }
}
