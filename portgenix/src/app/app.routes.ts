import { Routes } from '@angular/router';
import { DashbordComponent } from './Components/dashbord/dashbord.component';
import { ExploreComponent } from './Components/Explore/explore/explore.component';
import { GetStartedComponent } from './Components/get-started/get-started.component';
import { LoginComponent } from './Components/login/login.component';
import { OtpVerifyComponent } from './Components/otp-verify/otp-verify.component';
import { PostDetailComponent } from './Components/PostDetail/post-detail/post-detail.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { AccountComponent } from './UserComponents/account/account.component';
import { CreateComponent } from './UserComponents/create/create.component';
import { ProfileComponent } from './UserComponents/profile/profile.component';
import { SavedPostComponent } from './UserComponents/Saved/saved-post/saved-post.component';
import { SecurityComponent } from './UserComponents/security/security.component';
import { UserDahsbordComponent } from './UserComponents/user-dahsbord/user-dahsbord.component';

export const routes: Routes = [

  { path: '', 
    component: DashbordComponent 
  },
  { path: 'dashbord', 
    component: DashbordComponent 
  },

  { path: 'sign-up',
    component: SignUpComponent 
  },

  { path: 'login', 
    component: LoginComponent 
  },

  { path: 'get-started', 
    component: GetStartedComponent 
  }, 
  
  { path: 'otp_verify', 
    component: OtpVerifyComponent 
  },

  {
    path: 'explore',
    component: ExploreComponent
  },

  {
    path: 'post/:id',
    component:PostDetailComponent
  },

  
 
  
  //{ path: '', redirectTo: '', pathMatch: 'full' }, // Default route

  {
    path: 'user',
    children: [
      { path: 'profile/:id', component: ProfileComponent },
      { path: 'account', component: AccountComponent },
      { path: 'security', component: SecurityComponent },
      { path: 'dashbord', component: UserDahsbordComponent },
      { path: 'create', component: CreateComponent },
      { path: 'saved', component: SavedPostComponent}
      
    ]
  },

]


