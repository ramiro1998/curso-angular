import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const isLoggedGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const router = inject(Router);
  try {
    const token: boolean = cookieService.check('token');
    if (token) {
      router.navigate(['/', 'tracks'])
    }
    return true;
  } catch (error) {
    return false
  }
};
