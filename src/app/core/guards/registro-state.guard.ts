import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { RegistroStateService } from '../services/registro-state.service';

export const registroStateGuard: CanActivateFn = (route) => {
    const state = inject(RegistroStateService);
    const router = inject(Router);

    const paso = route.data['paso'] as number;

    if (paso === 3 && state.paso1.tipoPersona !== '2') {
        return router.createUrlTree(['/registro/paso-3']); // ir a confirmación o login
    }

    const guardMap: Record<number, () => boolean> = {
        2: () => !!state.paso1.tipoPersona,
        3: () => !!state.paso2.correo,
    };

    const check = guardMap[paso];
    if (!check || check()) return true;

    router.navigate(['/login']);
    return false;
};