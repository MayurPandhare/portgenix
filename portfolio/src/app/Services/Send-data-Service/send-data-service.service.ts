import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SendDataServiceService {

  private baseUrl = 'http://localhost:8080'; // change if needed

  constructor(private http: HttpClient) {}

  verifyOtp(payload: { otp: string }) {
    return this.http.post(`${this.baseUrl}/verify-otp`, payload);
  }
}
