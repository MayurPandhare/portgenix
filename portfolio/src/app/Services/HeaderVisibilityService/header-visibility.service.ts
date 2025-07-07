import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root', // This makes it a global singleton service
})
export class HeaderVisibilityService {
  private showHeaderSubject = new BehaviorSubject<boolean>(false); // Initially false
  showHeader$ = this.showHeaderSubject.asObservable();

  // Set the visibility of the header
  setHeaderVisibility(isVisible: boolean): void {
    console.log('Header visibility changed to:', isVisible); // Debug
    this.showHeaderSubject.next(isVisible);
  }
}
