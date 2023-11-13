import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const adminRoleGuard: CanActivateFn = (route, state) => {
  const cookie = inject(CookieService);
  const router = inject(Router);
  const userData = JSON.parse(cookie.get('user'));
  if (userData.role == 'admin') return true
  alert('No tienes autorización para ingresar a configuración')
  router.navigate([router.url])
  return false;
};
