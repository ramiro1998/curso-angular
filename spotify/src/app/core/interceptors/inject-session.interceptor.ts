import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHandlerFn
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

// @Injectable()
// export class InjectSessionInterceptor implements HttpInterceptor {

//   constructor(private cookieService: CookieService) { }

//   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
//     try {
//       const token = this.cookieService.get('token')
//       let newRequest = request
//       newRequest = request.clone(
//         {
//           setHeaders: {
//             authorization: `Bearer ${token}`,
//             CUSTOM_HEADER: 'HOLA' 
//           }
//         }
//       )

//       return next.handle(newRequest);

//     } catch (e) {
//       console.log('🔴🔴🔴 Ojito error', e)
//       return next.handle(request);

//     }
//   }
// }

export const authorizationInterceptor = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {

  const cookieService = inject(CookieService);
  try {
    const token = cookieService.get('token');
    let newRequest = request;
    newRequest = request.clone(
      {
        setHeaders: {
          authorization: `Bearer ${token}`,
          CUSTOM_HEADER: 'HOLA'
        }
      }
    )
    return next(newRequest)
  } catch (error) {
    return next(request)
  }

}