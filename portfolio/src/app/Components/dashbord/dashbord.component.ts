import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../Services/AuthServices/auth.service';
import { EncryptionService } from '../../Services/EncryptionServices/encryption.service';
import { HeaderVisibilityService } from '../../Services/HeaderVisibilityService/header-visibility.service';




@Component({
    selector: 'app-dashbord',
    standalone: true,
    imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
    templateUrl: './dashbord.component.html',
    styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {


  categoriesActive = false;

  exploreActive = false;

  isLoading: boolean = true; // Flag for showing loader

  


  isLoggedIn: boolean = false; // Initial state assumes user is not logged in
  profileImage: string = 'assets/Images/default-pro.jpg'; // Default profile image
  userName: string = ''; // Add a variable to hold the username
  currentPosition = 0; // Start position for any scroll-based logic (if needed)
  token: string ='';


  searchText: string = '';

  onInputChange(): void {
    // Logic can be added here if needed when the input changes
  }

  clearSearch(): void {
    this.searchText = 'null';
  }


  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private authService: AuthService,
    private renderer: Renderer2,
    private router: Router,
    private encryptionService: EncryptionService,
    private headerVisibilityService: HeaderVisibilityService
    
  ){

    
  }
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    console.log('dashbord - isLoggedIn:', this.isLoggedIn);
    

     
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


                                                        //Slider fuctionality

     suggestions: string[] = [
    'Designers',
    'Photographers',
    'Developers',
    'Videographers',
    'Marketers',
    'Entrepreneurs',
    'Illustrator',
  ];

  // Scroll the slider left
  scrollLeft() {
    const slider = document.querySelector('.slider-wrapper') as HTMLElement;
    slider.scrollBy({
      left: -200, // Scroll 200px to the left
      behavior: 'smooth',
    });
  }

  // Scroll the slider right
  scrollRight() {
    const slider = document.querySelector('.slider-wrapper') as HTMLElement;
    slider.scrollBy({
      left: 200, // Scroll 200px to the right
      behavior: 'smooth',
    });
  }                    
  
  

            // ---------------------------------------------- Common header -------------------------------------- 
 // Detect scroll events
 /*@HostListener('window:scroll', ['$event'])
 onWindowScroll(event: Event): void {
   const scrollY = window.scrollY; 
   console.log('Scroll position:', scrollY); 

   if (scrollY > 500) {
     console.log('Setting header visibility to true'); 
     this.headerVisibilityService.setHeaderVisibility(true); 
   } else {
     console.log('Setting header visibility to false'); 
     this.headerVisibilityService.setHeaderVisibility(false); 
   }
 }    */                                           
                                                
}
