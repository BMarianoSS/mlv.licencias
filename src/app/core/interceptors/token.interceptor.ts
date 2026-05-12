import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { isTokenExpired } from '../interfaz/token.util';

export const TokenInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const token = localStorage.getItem('authToken');

  if (token) {
    if (isTokenExpired(token)) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      router.navigate(['/login']);
      return next(req);
    }

    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req);
};
