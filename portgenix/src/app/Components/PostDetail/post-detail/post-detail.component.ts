import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DashbordService } from '../../../Services/dashbordService/dashbord.service';
import { GetDataService } from '../../../Services/GetDataServices/get-data.service';
import { UserProfileService } from '../../../Services/UserServices/user-profile.service';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css'
})
export class PostDetailComponent {


  post:any;

  relatedPosts: any[] = [];

   openedMenuPostId:number | null = null;

   currentUser:any;



  constructor(
    private route: ActivatedRoute,
    private getDataService: GetDataService,
    private dashbordService: DashbordService,
    private router: Router,
    private userProfileService: UserProfileService
    
  
  ) { }

    ngOnInit(){


      this.route.params.subscribe(params=>{

        const postId = params['id'];

        this.loadPost(postId);

        this.loadRelatedPosts(postId);
      
      });


    this.userProfileService
      .getCurrentUser()
      .subscribe((data:any)=>{

        this.currentUser = data;

      });


      

    }



    loadPost(postId: number){

        this.getDataService.getPostId(postId)
        .subscribe((data: any)=>{
          this.post = data;
        })


      }

      loadRelatedPosts(postId: number){

        this.getDataService.getRelatedPosts(postId)
        .subscribe((data: any)=>{

          this.relatedPosts = data;

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

    window.scrollTo({

    top:0,

    behavior:'smooth'

  });
}


  toggleLike(post:any){

  if(!this.currentUser){

    console.log("no current user loaded");

    return;
  }

  console.log(
    "current user loaded",
    this.currentUser.id
  );

  this.userProfileService
    .toggleLike(post?.id, this.currentUser.id)
    .subscribe((res:any)=>{

      // FIXED
      post.likesCount = res.likesCount;

      post.liked = res.liked;

      console.log("liked:", post.liked);

      console.log(
        "likes count:",
        post.likesCount
      );

    });

}

}
