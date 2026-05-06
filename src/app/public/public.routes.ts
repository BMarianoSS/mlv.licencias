import { Routes } from "@angular/router";
import { LoginGuard } from "../core/guards/login.guard";
import { registroStateGuard } from "../core/guards/registro-state.guard";

export const PUBLIC_ROUTES: Routes = [
  { 
    path: 'login', 
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
    canActivate: [LoginGuard]
  },
  {
    path: 'registro',
    loadComponent: () => import('./registro/registro.component').then(m => m.registroComponent),
    children: [
      { 
        path: 'paso-1', 
        loadComponent: () => import('../components/registro-paso-1/registro-paso-1.component').then(m => m.RegistroPaso1Component)
      },
      { 
        path: 'paso-2', 
        loadComponent: () => import('../components/registro-paso-2/registro-paso-2.component').then(m => m.RegistroPaso2Component),
        canActivate: [registroStateGuard],
        data: { paso: 2 }
      },
      { 
        path: 'paso-3', 
        loadComponent: () => import('../components/registro-paso-3/registro-paso-3.component').then(m => m.RegistroPaso3Component),
        canActivate: [registroStateGuard],
        data: { paso: 3 }
      },
      { path: '', redirectTo: 'paso-1', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];