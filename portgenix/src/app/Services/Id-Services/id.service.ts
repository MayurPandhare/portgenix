import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdServiceService {

  private userId: string | null = null;

  setUserId(id: string): void {
    this.userId = id;
  }

  getUserId(): string | null {
    return this.userId;
  }
}
