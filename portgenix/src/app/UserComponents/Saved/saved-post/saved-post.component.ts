import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../Services/AuthServices/auth.service';
import { DashbordService } from '../../../Services/dashbordService/dashbord.service';
import { GetDataService } from '../../../Services/GetDataServices/get-data.service';
import { UserProfileService } from '../../../Services/UserServices/user-profile.service';

@Component({
  selector: 'app-saved-post',
  standalone: true,
  imports: [MatProgressBarModule, CommonModule,RouterModule],
  templateUrl: './saved-post.component.html',
  styleUrl: './saved-post.component.css'
})
export class SavedPostComponent implements OnInit{


    showMoreFlag: boolean = false;
      isLoading: boolean = false;
      Firstname: string = '';
      imageUrl: string = '';
      Location: string = '';
      savedPosts:any[] = [];
       openedMenuPostId:number | null = null;
       currentUser:any;

       savedPostIds:number[] = [];
    
    
    
      constructor(
      
        private getdataService: GetDataService,
        private authService: AuthService,
        private route: ActivatedRoute,
        private dashbordService: DashbordService,
        private userProfileService: UserProfileService,
        private router: Router
        //private toastr: ToastrService
      ){
    
      }
    
    
      /* -------------------------------------------ngOnit Profile -------------------------------------------*/ 
    
      ngOnInit(): void {
    
       this.GetData();
    
       this.route.params
      .subscribe(params=>{
    
        const userId = params['id'];
    
         this.userProfileService
      .getCurrentUser()

      .subscribe((data:any)=>{

        console.log(data);

        this.currentUser = data;

      });
     

      this.loadSavedPosts();
       
    
      });
      }
    
    
      loadSavedPosts(){

  this.userProfileService
      .getSavedPosts()

      .subscribe((data:any)=>{

        console.log(data);

        this.savedPosts = data;
         this.loadSavedIds()

      });

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
    
    
    
      toggleMoreMenu(postId:number){
    
      // Close if same menu clicked
      if(this.openedMenuPostId === postId){
    
        this.openedMenuPostId = null;
    
      }
    
      // Open clicked menu
      else{
    
        this.openedMenuPostId = postId;
        console.log('Opened menu for post ID:', postId);
    
      }
    
    }
    
    
    
    postView(postId:number){
    
      console.log('Navigating to post with ID click explore component');
    
      this.router.navigate(['/post', postId]);
    }


    toggleSave(post:any){

  this.userProfileService
      .toggleSave(post.id)

      .subscribe((res:any)=>{

        post.saved = res.saved;

      });

}
  

loadSavedIds(){

  this.userProfileService
      .getSavedIds()

      .subscribe((data:any)=>{

        console.log("saved id data ",data);

        this.savedPostIds = data;

        this.markSavedPosts();

      });

}


markSavedPosts(){

  this.savedPosts.forEach((post:any)=>{

      post.saved =
      this.savedPostIds.includes(post.id);

  });

}





}
