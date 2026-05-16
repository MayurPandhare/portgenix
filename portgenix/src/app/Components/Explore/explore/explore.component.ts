import { CommonModule } from '@angular/common';
import { Component, Renderer2 } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DashbordService } from '../../../Services/dashbordService/dashbord.service';

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, ReactiveFormsModule,],
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.css'
})
export class ExploreComponent {


  categoriesActive = false;

  exploreActive = false;

  searchKeyword: string = '';

  posts: any[] = [];

  suggestions:string[]=[];


  openedMenuPostId:number | null = null;






  constructor(
    private renderer: Renderer2,
    private router: Router,
    private route: ActivatedRoute,
    private dashbordService: DashbordService
  ) { }






  ngOnInit(){

    this.dashbordService.getAllPosts()
    .subscribe((data: any) =>{
      this.posts = data;
    })

  this.route.queryParams
  .subscribe(params=>{

    const keyword = params['keyword'];

    if(keyword){

      this.searchPosts(keyword);

    }

  });

}



searchPosts(keyword:string){

  this.dashbordService
      .searchPosts(keyword)
      .subscribe((data:any)=>{

        this.posts = data;

      });

}



goToSearch(){

  this.router.navigate(
    ['/explore'],
    {
      queryParams:{
        keyword:this.searchKeyword
      }
    }
  );

}

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

  this.goToSearch();

}









   onInputChange(): void {
    // Logic can be added here if needed when the input changes
  }

  clearSearch(): void {

    this.searchKeyword = '';
     this.suggestions = [];
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
  

}
