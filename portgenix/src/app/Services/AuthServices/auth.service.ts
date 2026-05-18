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

  constructor(private http: HttpClient, private router: Router) {
    const savedToken = sessionStorage.getItem('accessToken');
    if (savedToken) {
      this.accessToken = savedToken;
    }
  }

  // ✅ Save token in session
  setToken(token: string): void {
    sessionStorage.setItem('accessToken', token);
    this.accessToken = token;
  }

  getToken(): string | null {
    return sessionStorage.getItem('accessToken');
  }

  isTokenExpired(token: string): boolean {
    return this.jwtHelper.isTokenExpired(token);
  }

  // ✅ Called when user logs in or token refreshes
  updateSession(token: string): void {
    this.setToken(token);

    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiresInMs = payload.exp * 1000 - Date.now();

    if (expiresInMs <= 0) {
      console.warn('Token already expired!');
      this.logout(token);
      return;
    }

    console.log(`Token expires in: ${Math.floor(expiresInMs / 1000)} seconds`);

    const refreshTime = Math.max(expiresInMs - 60 * 1000, 0);

    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
    }

    this.refreshTimer = setTimeout(() => {
      console.log('Refreshing token silently...');
      this.refreshTokenSilently().subscribe({
        next: () => console.log('Token refreshed successfully'),
        error: () => {
          console.error('Silent refresh failed');
          this.logout(token);
        }
      });
    }, refreshTime);
  }

  // ✅ Login method
  login(credentials: { email: string; password: string }): Observable<{ accessToken: string }> {
    console.log("indside login api :")
    return this.http.post<{ accessToken: string }>(`${this.apiUrl}/login`, credentials, { withCredentials: true })
      .pipe(
        tap((response) => {
          console.log("login api response:")
          this.updateSession(response.accessToken);
          this.loggedIn.next(true);
        })
      );
  }

  // ✅ Refresh token (manual call)
  refreshToken(): Observable<{ accessToken: string }> {
    const token = this.getToken();
    return this.http.post<{ accessToken: string }>(`${this.apiUrl}/refresh`, {}, { withCredentials: true });
  }

  // ✅ Silent token refresh
  refreshTokenSilently(): Observable<void> {
    return new Observable((observer) => {
      this.http.post<{ accessToken: string }>(`${this.apiUrl}/refresh`, {}, { withCredentials: true })
        .pipe(
          tap((data) => {
            this.updateSession(data.accessToken);
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

  // ✅ Logout
  logout(token: string): Observable<any> {
  sessionStorage.removeItem('accessToken');
  this.accessToken = null;
  this.loggedIn.next(false);

  // Example API call to invalidate refresh token on backend
  return this.http.post(`${this.apiUrl}/logout`, { token }, { withCredentials: true });
  }

  // ✅ Check login status
  isLoggedIn(): boolean {
    const token = this.getToken();

    if (!token) {
      console.log('No token found, while checking login status');
      return false;
    }

    if (this.jwtHelper.isTokenExpired(token)) {
      console.log('Token expired');
      this.logout(token);
      return false;
    }

    return true;
  }

  getAuthStatus(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  
 /* getUserStatus(): Observable<any> {
 return this.http.get('https://localhost:8080/user/auth-user-dashbord', { withCredentials: true });
  }*/
}