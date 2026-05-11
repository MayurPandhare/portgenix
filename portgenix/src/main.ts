import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideToastr } from 'ngx-toastr'; // Import Toastr
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { AuthInterceptor } from './app/Services/AuthServices/auth.interceptor';


bootstrapApplication(AppComponent, {
  providers: [
    appConfig.providers,
    provideAnimationsAsync(),
    provideAnimations(), // Add animations support
    provideHttpClient(withInterceptors([AuthInterceptor])), // Add HTTP client and interceptors
    provideToastr({ // Configure Toastr globally
      positionClass: 'toast-top-center', // Position the toast at the top center
      timeOut: 0, // Prevent automatic dismissal by setting timeOut to 0
      extendedTimeOut: 0, // Ensure no extended timeout
      closeButton: true, // Add a close button to allow the user to dismiss the toast
      tapToDismiss: false, // Prevent dismissal when the user taps on the toast
    }),
  ],
}).catch((err) => console.error(err));