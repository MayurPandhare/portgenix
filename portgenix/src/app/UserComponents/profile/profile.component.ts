import { CommonModule } from '@angular/common';
//import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
//import { ToastrService } from 'ngx-toastr'; // Import ToastrModule
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../Services/AuthServices/auth.service';
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
    private getdataService: GetDataService, private authService: AuthService
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

  const authToken = this.authService.getToken();

  if (!authToken) {
    console.error('No auth token found. User might be logged out.');
    this.isLoading = false;
    return; // Exit early if no token
  }

  // Call service to fetch data
  this.getdataService.getData(authToken).subscribe(
    (data) => {
      console.log('data:', data);
      this.Firstname = data.firstname; // Bind fetched name to variable
      this.imageUrl = data.imageUrl;
      this.Location = data.location; // Bind fetched location to variable
      this.isLoading = false; // Stop loader
    },
    (error) => {
      console.error('Error fetching user data:', error);
      this.isLoading = false; // Stop loader
      // Optionally, handle error (e.g., show a toast message)
    }
  );
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
