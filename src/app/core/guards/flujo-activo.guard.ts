
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SolicitudStateService } from '../services/solicitud-state.service';

export const flujoActivoGuard: CanActivateFn = () => {
    const state = inject(SolicitudStateService);
    const router = inject(Router);

    if (state.flujoActivo) return true;

    router.navigate(['/principal']);    
    return false;
};