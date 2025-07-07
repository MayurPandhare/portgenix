import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, Observable, switchMap } from 'rxjs';
import { AuthService } from './auth.service';

export const AuthInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn // Use the correct type for 'next'
): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  if (token) {
    // Check if the token is expired
    if (authService.isTokenExpired(token)) {
      return authService.refreshTokenSilently().pipe(
        switchMap(() => {
          // Get the new token after refresh
          const newToken = authService.getToken();

          // Clone the request with the new token
          const clonedReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${newToken}`,
            }
          });

          return next(clonedReq); // Retry the request with the new token
        }),
        catchError((err) => {
          // If refreshing the token fails, return the original request
          console.error('Token refresh failed', err);
          return next(req);
        })
      );
    } else {
      // If token is not expired, proceed with the original request
      const clonedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        }
      });
      return next(clonedReq); // Proceed with the original request
    }
  }

  // If no token, pass the original request
  return next(req);
};