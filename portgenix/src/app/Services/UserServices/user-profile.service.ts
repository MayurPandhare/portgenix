import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {


   constructor(private http: HttpClient) {}
   
   getUserData(credentials: { response: string; }) {
    const token = credentials.response;  // Get the token you saved earlier
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.post('http://localhost:8080/auth/profile', {}, { headers, responseType: 'json' });
  }
}

