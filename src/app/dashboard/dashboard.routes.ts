import { Routes } from "@angular/router";
import { principalComponent } from "./principal/principal.component";
import { LayoutComponent } from "./layout/layout.component";
import { AuthGuard } from "../core/guards/auth.guard";
import { flujoActivoGuard } from "../core/guards/flujo-activo.guard";

export const DASHBOARD_ROUTES: Routes = [
    {
        path: '',
        component:LayoutComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'principal',
                loadComponent: () => import('./principal/principal.component').then(m => m.principalComponent)
            },{
                path: 'home',
                loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
            },{
                path: 'pantalla1',
                loadComponent: () => import('./pantalla1/pantalla1.component').then(m => m.pantalla1Component)
            },{
                path: 'pantalla2',
                canActivate: [flujoActivoGuard],
                loadComponent: () => import('./pantalla2/pantalla2.component').then(m => m.Pantalla2Component)
            },{
                path: 'pantalla3',
                canActivate: [flujoActivoGuard],
                loadComponent: () => import('./pantalla3/pantalla3.component').then(m => m.pantalla3Component)
            },{
                path: 'pantalla4',
                canActivate: [flujoActivoGuard],
                loadComponent: () => import('./pantalla4/pantalla4.component').then(m => m.pantalla4Component)
            },{
                path: 'pantalla5',
                canActivate: [flujoActivoGuard],
                loadComponent: () => import('./pantalla5/pantalla5.component').then(m => m.Pantalla5Component)
            },{
                path: 'pantalla6',
                canActivate: [flujoActivoGuard],
                loadComponent: () => import('./pantalla6/pantalla6.component').then(m => m.pantalla6Component)
            },{
                path: 'pantalla6-2',
                canActivate: [flujoActivoGuard],
                loadComponent: () => import('./pantalla6-2/pantalla6-2.component').then(m => m.pantalla62Component)
            },{
                path: 'RegistroRepresentante',
                loadComponent: () => import('./RegistroRepresentante/RegistroRepresentante.component').then(m => m.RegistroRepresentanteComponent)
            },
            { path: '', redirectTo: 'principal', pathMatch: 'full' }
        ]
    },
    { path: 'principal', component: principalComponent },
];