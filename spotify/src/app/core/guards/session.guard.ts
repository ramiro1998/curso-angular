import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class SessionGuard {

//   constructor(
//     private cookieService: CookieService,
//     private router: Router) {

//   }

//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//     return this.checkCookieSession();
//   }

//   checkCookieSession(): boolean {
//     try {

//       const token: boolean = this.cookieService.check('token')
//       if (!token) {
//         this.router.navigate(['/', 'auth'])
//       }
//       return token

//     } catch (e) {
//       console.log('Algo sucedio ?? 🔴', e);
//       return false
//     }

//   }

// }

export const sessionGuardFunctional = (): boolean => {
  const cookieService = inject(CookieService);
  const router = inject(Router);

  try {
    const token: boolean = cookieService.check('token');
    console.log('token guard', token)
    if (!token) {
      router.navigate(['/', 'auth'])
    }
    return token;
  } catch (error) {
    return false
  }
}