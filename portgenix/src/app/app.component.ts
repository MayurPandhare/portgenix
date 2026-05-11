import { CommonModule } from '@angular/common'; // Import CommonModule
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { FooterComponent } from './Components/footer/footer.component';
import { HeaderComponent } from './Components/header/header.component';
import { OtpVerifyComponent } from './Components/otp-verify/otp-verify.component';
import { AuthService } from './Services/AuthServices/auth.service';



@Component({
    selector: 'app-root',
    standalone: true, 
    imports: [RouterOutlet, HeaderComponent, CommonModule,FooterComponent,OtpVerifyComponent], // Correct imports
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'] // Fixed typo
})
export class AppComponent implements OnInit  {
  title = 'Portfolio-Platform';
  showNotification = false;

  showHeader: boolean = false; // Default to show header
  isLoggedIn: boolean = false; 

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    // Check if the user is logged in
    this.isLoggedIn = this.authService.isLoggedIn();
    console.log('App component - isLoggedIn:', this.isLoggedIn);
  
    const token = this.authService.getToken();
    if (token && this.isLoggedIn) {
      this.authService.updateSession(token); // Restart the session management
      
    }  
   

    // Subscribe to router events and filter for NavigationEnd
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd)) // Filter for NavigationEnd events only
      .subscribe((event) => {
        const navigationEvent = event as NavigationEnd; // Type assertion here
        // Hide header for login and signup routes
        if (navigationEvent.urlAfterRedirects === '/login' || navigationEvent.urlAfterRedirects === '/sign-up'|| 
              navigationEvent.urlAfterRedirects === '/get-started' || navigationEvent.urlAfterRedirects === '/otp_verify' || 
            navigationEvent.urlAfterRedirects === '/portgenix.com') {
          this.showHeader = false; // Hide header on login and sign-up pages
          this.showNotification = false;
        } else {
          this.showHeader = true; // Show header on all other pages
          this.showNotification = true;
        }
      });
  }


  resendVerificationEmail(): void{
    console.log('resendVerificationEmail method is on');
  }

}
