
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, PLATFORM_ID, Renderer2 } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Router, RouterModule } from '@angular/router';
import { Modal } from 'bootstrap';
import { AuthService } from '../../Services/AuthServices/auth.service';
import { EncryptionService } from '../../Services/EncryptionServices/encryption.service';
import { GetDataService } from '../../Services/GetDataServices/get-data.service';
import { UserActivityService } from '../../Services/header-data-snd/user-activity.service';
import { HeaderVisibilityService } from '../../Services/HeaderVisibilityService/header-visibility.service';
import { UserProfileService } from '../../Services/UserServices/user-profile.service';



@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule,MatProgressBarModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent{
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

  createModal!: Modal;
  currentUser:any;


  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private authService: AuthService,
    private renderer: Renderer2,
    private router: Router,
    private encryptionService: EncryptionService,
    private headerVisibilityService: HeaderVisibilityService,
    private userActivityService: UserActivityService,
    private cdRef: ChangeDetectorRef, // Inject ChangeDetectorRef
    private getdataService: GetDataService,
    private userProfileService: UserProfileService
    
  ){}



  
  

  //   header dynamic content


  ngOnInit(): void {
         this.isLoggedIn = this.authService.isLoggedIn();

         if (this.isLoggedIn) {

          this.isLoading = true; // Show loader while fetching data

        const authToken = this.authService.getToken();

        if (!authToken) {
          console.warn('No auth token found — skipping profile fetch.');
          return;
          }

            console.log('AuthToken for user profile:', authToken);

            this.getdataService.getheader(authToken).subscribe(
              (data) => {
                console.log('data:', data);
                this.userName = data.userName;
                this.profileImage = data.imageUrl;
                this.isLoading = false;
              },
                (error) => {
                console.error('Error:', error);
                this.isLoading = false;
              }
            );
          }



        this.userProfileService
      .getCurrentUser()
      .subscribe((data:any)=>{

        this.currentUser = data;

      });
    }

  
    
  
    onInputChange(): void {
      // Logic can be added here if needed when the input changes
    }
  
    clearSearch(): void {
      this.searchText = '';
    }
  
  
   
  
  
    onLogout(): void {

      const authToken = this.authService.getToken();

       if (!authToken) {
          console.warn('No auth token found — skipping logout fetch.');
          return;
          }

            console.log('AuthToken for user profile:', authToken);

           this.authService.logout(authToken).subscribe({
              next: () => window.location.href = '/dashbord',
             error: (err) => console.error('Logout failed:', err)
           });
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


  Usercheck() {

  // Close modal properly
  this.createModal.hide();

  setTimeout(() => {

    if (this.isLoggedIn) {

      this.router.navigate(['/user/create']);

    } else {

      this.router.navigate(['/login']);

    }

  }, 300);

}



  // -------------------- create modal -------------------

  ngAfterViewInit() {
    const createModalElement = document.getElementById('create-Modal');
    if (createModalElement) {
      this.createModal = new Modal(createModalElement, {
        backdrop: 'static',
        keyboard: false
      });
    }

  }


  openModal(modalType: 'create' ) {
    if (modalType === 'create' && this.createModal) {
      this.createModal.show();
    } 
  }

  closeModal(modalType: 'create') {
    if (modalType === 'create' && this.createModal) {
      this.createModal.hide();
    } 
    
  }
}