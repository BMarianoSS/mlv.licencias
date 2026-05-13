import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { SolicitudStateService } from '../../core/services/solicitud-state.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule,NgIf],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  sidebarOpen = false;
  nombreUsuario:string=''
  constructor(private authService: AuthService,private router: Router,private state: SolicitudStateService) {}
  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  ngOnInit(){
    const user = this.authService.getUser();
    if (!user || !user.codigo) {
      console.error('Usuario no encontrado o código no disponible');
      return;
    }
    this.nombreUsuario = user.nombres + ' ' + user.apellidoPaterno + ' ' + user.apellidoMaterno;
  }

  cambiarPantalla(ruta: string) {
    this.state.limpiarState();
    this.router.navigate([ruta]);    
  }

  logout() {
    this.state.limpiarState();
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
