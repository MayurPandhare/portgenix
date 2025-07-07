import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { EncryptionService } from '../EncryptionServices/encryption.service';

@Injectable({
  providedIn: 'root'
})
export class UserActivityService {

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  private userNameSubject = new BehaviorSubject<string | null>(null);
  private profileImageSubject = new BehaviorSubject<string | null>(null);

  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  userName$ = this.userNameSubject.asObservable();
  profileImage$ = this.profileImageSubject.asObservable();

  constructor(
    private encryptionService: EncryptionService,
    @Inject(PLATFORM_ID) private platformId: Object // Inject PLATFORM_ID to check if we're in the browser
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeUserData();
    }
  }

  private initializeUserData(): void {
    const accessToken = localStorage.getItem('accessToken');
    const encryptedUsd = localStorage.getItem('Usd');

    if (accessToken && encryptedUsd) {
      const decryptedUsd = this.encryptionService.decrypt(encryptedUsd);

      if (decryptedUsd) {
        this.isLoggedInSubject.next(true);
        this.userNameSubject.next(decryptedUsd.userName);
        this.profileImageSubject.next(decryptedUsd.imageUrl);
      } else {
        this.isLoggedInSubject.next(false);
      }
    } else {
      this.isLoggedInSubject.next(false);
    }
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('Usd');
    }
    this.isLoggedInSubject.next(false);
    this.userNameSubject.next(null);
    this.profileImageSubject.next(null);
  }
}
