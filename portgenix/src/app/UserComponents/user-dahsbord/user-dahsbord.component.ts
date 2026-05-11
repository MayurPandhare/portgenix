import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../Services/AuthServices/auth.service';

@Component({
  selector: 'app-user-dahsbord',
  standalone: true,
  imports: [CommonModule,RouterModule,ReactiveFormsModule,FormsModule],
  templateUrl: './user-dahsbord.component.html',
  styleUrl: './user-dahsbord.component.css'
})
export class UserDahsbordComponent implements OnInit{


  // declaration 

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










    // Methods------

     constructor(private authService: AuthService , private router: Router){

      
  }

  ngOnInit(): void {
  const authToken = this.authService.getToken();

  console.log('user-dashbora', authToken);

  if (!authToken) {
    console.warn("No token found — redirecting to login");
    this.router.navigateByUrl('/login');
    return;
  }

  // Optional: you can decode JWT and check expiration here
  if (this.authService.isTokenExpired(authToken)) {
    console.warn("Token expired — redirecting to login");
    this.authService.logout(authToken);
    this.router.navigateByUrl('/login');
    return;
  }

  // If token exists and is valid, call backend to get user info
 
}

   clearSearch(): void {
    this.searchText = 'null';
  }

  onInputChange(): void {
    // Logic can be added here if needed when the input changes
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


}
