import { CommonModule } from '@angular/common';
//import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
//import { ToastrService } from 'ngx-toastr'; // Import ToastrModule
import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GetDataService } from '../../Services/GetDataServices/get-data.service';



@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [MatProgressBarModule, CommonModule,RouterModule],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{


  showMoreFlag: boolean = false;
  isLoading: boolean = false;
  Firstname: string = '';
  imageUrl: string = '';
  Location: string = '';


  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private getdataService: GetDataService
    //private toastr: ToastrService
  ){

  }


  /* -------------------------------------------ngOnit Profile -------------------------------------------*/ 

  ngOnInit(): void {
   this.GetData();
  }



  GetData(): void {
    console.log('GetData progress start');
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
      this.getdataService.getData(authToken).subscribe(
        (data) => {
          console.log('data:', data);
          this.Firstname = data.firstname; // Bind fetched name to variable
          this.imageUrl = data.imageUrl;
          this.Location = data.location; // Bind fetched picture URL to variable
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
  /* -------------------------------------------Edit Profile -------------------------------------------*/ 

  editProfile(): void {
    alert('Edit profile functionality goes here!');
  }



    /* -------------------------------------------delete Profile -------------------------------------------*/ 

  deleteAccount(): void {
    const confirmDelete = confirm('Are you sure you want to delete your account?');
    if (confirmDelete) {
      alert('Account deleted successfully.');
    }
  }

  /* ------------------------------------------- view collection -------------------------------------------*/ 

  
  viewCollection(): void {
    alert('Collection functionality goes here!');
  }

}
