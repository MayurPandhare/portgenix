import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { catchError, Observable, switchMap, take, throwError } from "rxjs";
import { AuthService } from "./auth.service";


export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the current token from AuthService
    let token = this.authService.getToken();

    // If there is no token, pass the request without the Authorization header
    if (!token) {
      return next.handle(req);
    }

    // Clone the request to add the Authorization header
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    // Proceed with the request
    return next.handle(clonedRequest).pipe(
      catchError((error) => {
        if (error.status === 401) {
          // Token is expired or invalid, attempt to refresh it
          return this.authService.refreshToken().pipe(
            take(1), // Take only the first emission
            switchMap((newToken) => {
              // Update session with the new token
              this.authService.updateSession(newToken);

              // Retry the original request with the new token
              const clonedRetryRequest = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newToken}`
                }
              });

              return next.handle(clonedRetryRequest);
            }),
            catchError(err => {
              // Handle refresh token errors, such as user being logged out
              this.authService.logout();
              return throwError(err);
            })
          );
        }

        // If it's not a 401 error, just pass the error along
        return throwError(error);
      })
    );
  }
}