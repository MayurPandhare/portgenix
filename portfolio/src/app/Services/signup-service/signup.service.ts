import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',

})


export class SignupService {

  private apiUrl = 'http://localhost:8080/auth/signup';

  constructor(private http: HttpClient) {}

  signup(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user,{ responseType: 'text' });
  }
}
