import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private jwtHelper = new JwtHelperService();
  private apiUrl = 'http://localhost:8080/auth'; // Replace with your backend URL
  private loggedIn = new BehaviorSubject<boolean>(false);
  private accessToken: string | null = null; // Store in memory
  private refreshTimer: any;

  constructor(private http: HttpClient, private router: Router) {}


   // Public method to check if the token is expired
   isTokenExpired(token: string): boolean {
    return this.jwtHelper.isTokenExpired(token);
  }


  // Public method to update the session (useful in the AuthInterceptor)
  updateSession(token: string): void {
    this.accessToken = token; // Store in memory
    localStorage.setItem('accessToken', token); // Store in localStorage

    // Decode JWT payload to get expiration
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiresInMs = payload.exp * 1000 - Date.now();
    console.log(`Token expires in: ${expiresInMs / 1000} seconds`);

    // Refresh token 1 minute before expiry
    const refreshTime = expiresInMs - 60 * 1000;

    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
    }

    this.refreshTimer = setTimeout(() => {
      console.log('Refreshing token...');
      this.refreshTokenSilently().subscribe();
    }, refreshTime);
  }


  // Login method
  login(credentials: { email: string; password: string }): Observable<{ accessToken: string }> {
    return this.http.post<{ accessToken: string }>(`${this.apiUrl}/login`, credentials, { withCredentials: true }).pipe(
      tap((response) => {
        // Store the access token in localStorage
        localStorage.setItem('accessToken', response.accessToken);
        this.updateSession(response.accessToken); // Update session with token
      })
    );
  }

  // Get token
  getToken(){

    const token = localStorage.getItem('accessToken');

    if(!token){
      console.log("No token found, while get token method ");
      return null;

    }

    return token;
  }

  // Token refresh method
  refreshToken() {
    const token = localStorage.getItem("accessToken"); // Get stored token
  
    return this.http.get("http://localhost:8080/auth/refresh", {
      headers: {
        Authorization: `Bearer ${token}` // Include token in request
      }
    });
  }


  

  // Silent token refresh method
  refreshTokenSilently(): Observable<void> {
    return new Observable((observer) => {
      // The refresh token is stored in the HTTP-only cookie, so we don't need to manually retrieve it here
      // We'll rely on the backend to read the refresh token from the cookie
  
      this.http.post<any>(`${this.apiUrl}/refresh`, {}, { withCredentials: true })
        .pipe(
          tap((data) => {
            // After successfully refreshing the token, the server should send a new access token
            this.accessToken = data.accessToken; // Store new access token in memory
            localStorage.setItem('accessToken', data.accessToken); // Store new access token in localStorage
            console.log('Silent token refresh successful');
            observer.next();
            observer.complete();
          })
        )
        .subscribe({
          error: (err) => {
            console.error('Silent token refresh failed', err);
            observer.error(err);
          }
        });
    });
  }

  // Logout method
  logout(): void {
    // Remove the access token from localStorage
    localStorage.removeItem('accessToken');
    this.accessToken = null;
    this.loggedIn.next(false); // Update the authentication status
    this.router.navigate(['/login']);
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    const token = this.getToken();

    if(token == null) {
      console.log("No token found, while checking login status");
      return false;
    }

    if (this.jwtHelper.isTokenExpired(token)) {
      
      this.logout();
    }
    return true;
  }

  

  // Get authentication status
  getAuthStatus(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
}