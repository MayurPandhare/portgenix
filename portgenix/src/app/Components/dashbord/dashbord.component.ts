import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../Services/AuthServices/auth.service';
import { DashbordService } from '../../Services/dashbordService/dashbord.service';
import { EncryptionService } from '../../Services/EncryptionServices/encryption.service';
import { HeaderVisibilityService } from '../../Services/HeaderVisibilityService/header-visibility.service';
import { UserProfileService } from '../../Services/UserServices/user-profile.service';



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



  posts: any[] = [];

  suggestions:string[]=[];

  searchKeyword:string='';

  openedMenuPostId:number | null = null;

  savedPostIds:number[] = [];















  onInputChange(): void {
    // Logic can be added here if needed when the input changes
  }

  clearSearch(): void {

    
    this.searchKeyword = '';

     this.suggestions = [];
  }


  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private authService: AuthService,
    private renderer: Renderer2,
    private router: Router,
    private encryptionService: EncryptionService,
    private headerVisibilityService: HeaderVisibilityService,
    private dashbordService: DashbordService,
    private userProfileService: UserProfileService
    
  ){

    
  }
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    console.log('dashbord - isLoggedIn:', this.isLoggedIn);


     this.dashbordService.getAllPosts()
    .subscribe((data: any) => {

      console.log('console img data',data);

      this.posts = data;

      this.loadSavedIds();

    });
    

     
  }

  

   
  // Search functionality for the dashboard


  

onSearchChange(){

  if(this.searchKeyword.trim()===''){

    this.suggestions=[];

    return;
  }

  this.dashbordService
      .getSuggestions(this.searchKeyword)
      .subscribe((data:any)=>{

        this.suggestions = data;

      });

}

selectSuggestion(suggestion:string){

  this.searchKeyword = suggestion;

   // Hide dropdown
  this.suggestions = [];

  this.goToSearch(suggestion);

}


goToSearch(keyword:string){

  if(keyword.trim()){

    this.router.navigate(
      ['/explore'],
      {
        queryParams:{
          keyword: keyword
        }
      }
    );

  }

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

     sliderSuggestions: string[] = [
    'Tattoos',
    'Nail',
    'Cars',
    'Cooking',
    'animals',
    'Party',
    'Weddings',
    'Travel',
    'Aesthetics',
    'Photography',
    'Drawing',
    'Plants',
    'Relaxation',
    'phone',
    'greetings',
    'renovation',
    'Sneakers',
    'Hair',
    'Quotes',
    'Baking',
    'Popculture',
    'Classroom',
    'Home',
    'Outfit',
    'game',
    'Workouts',
    'Anime',
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

  console.log('Navigating to post with ID click');

  this.router.navigate(['/post', postId]);
}
  


/*-----------------save post toggles ----------------- */

toggleSave(post:any){

    console.log("saved button press :");
  this.userProfileService
      .toggleSave(post.id)

      .subscribe((res:any)=>{


        post.saved = res.saved;
        console.log("image saved");

      });




    }



    loadSavedIds(){

  this.userProfileService
      .getSavedIds()

      .subscribe((data:any)=>{

        console.log(data);

        this.savedPostIds = data;

        this.markSavedPosts();

      });

}


markSavedPosts(){

  this.posts.forEach((post:any)=>{

      post.saved =
      this.savedPostIds.includes(post.id);

  });

}

}