
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../Services/AuthServices/auth.service';
import { EncryptionService } from '../../Services/EncryptionServices/encryption.service';
import { GetDataService } from '../../Services/GetDataServices/get-data.service';
import { HeaderVisibilityService } from '../../Services/HeaderVisibilityService/header-visibility.service';
import { UserActivityService } from '../../Services/header-data-snd/user-activity.service';



@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule,MatProgressBarModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  showHeader = false; // Default hidden
  categoriesActive = false;
  
  exploreActive = false;

  isLoading: boolean = false; // Flag for showing loader

  


  isLoggedIn = false;
  showNotification = true;
  userName: string | null = null;
  profileImage: string | null = null;
  currentPosition = 0; // Start position for any scroll-based logic (if needed)


  searchText: string = '';
  imageUrl: string = '';


  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private authService: AuthService,
    private renderer: Renderer2,
    private router: Router,
    private encryptionService: EncryptionService,
    private headerVisibilityService: HeaderVisibilityService,
    private userActivityService: UserActivityService,
    private cdRef: ChangeDetectorRef, // Inject ChangeDetectorRef
    private getdataService: GetDataService
    
  ){}



  ngOnInit(): void {
   
  
    this.isLoggedIn = this.authService.isLoggedIn();

    if(this.isLoggedIn){
      
      this.isLoading = true; // Start loader
       let authToken: string = '';
      
          // Check if running in the browser
          if (isPlatformBrowser(this.platformId)) {
            authToken = localStorage.getItem('accessToken') || ''; // Safely access localStorage
      
            if (!authToken) {
              console.error('No access token found in localStorage.');
              this.isLoading = false; // Stop loader
              return;
            }
      
            console.log('AuthToken for user profile :', authToken);
      
            // Call service to fetch data
            this.getdataService.getheader(authToken).subscribe(
              (data) => {
                console.log('data:', data);
                this.userName = data.userName; // Bind fetched name to variable
                this.profileImage = data.imageUrl;
                
                this.isLoading = false; // Stop loader
              },
              (error) => {
                console.error('Error:', error);
                this.isLoading = false; // Stop loader
                // Optionally, handle the error (e.g., show a message to the user)
              }
            );
          } else {
            console.warn('localStorage is not available (not running in the browser).');
          }
    }

  }


  //   header dynamic content

  
    
  
    onInputChange(): void {
      // Logic can be added here if needed when the input changes
    }
  
    clearSearch(): void {
      this.searchText = '';
    }
  
  
   
  
  
    onLogout(): void {
      this.authService.logout();
    }
  
    
    resendVerificationEmail(): void{
      console.log('resendVerificationEmail method is on');
    }
  
     
  
  
    toggleCategories() {
      // Toggle the categoriesActive state
      this.categoriesActive = !this.categoriesActive;
    
      // Lock or unlock page scrolling
      if (this.categoriesActive) {
        this.renderer.setStyle(document.documentElement, 'overflow', 'hidden');
      } else {
        this.renderer.removeStyle(document.documentElement, 'overflow');
      }
    }
  
  
  
     // To store the selected image's URL
  
     selectedImage:string = 'assets/Images/SVG/down-arrow-3.svg';
  
    toggleExplore() {
    // Toggle the exploreActive state
    this.exploreActive = !this.exploreActive;
  
    // Update the image based on the state
    this.selectedImage = this.exploreActive
      ? 'assets/Images/SVG/up-arrow-3.svg'
      : 'assets/Images/SVG/down-arrow-3.svg';
  
    // Adjust scrolling for the categories block
    const categoriesElement = document.querySelector('.categories') as HTMLElement;
  
    if (categoriesElement) {
      if (this.exploreActive) {
        // Enable scrolling for expanded dropdown
        categoriesElement.classList.add('scrollable');
      } else {
        // Disable scrolling for collapsed dropdown
        categoriesElement.classList.remove('scrollable');
      }
    }
  }
  

}
