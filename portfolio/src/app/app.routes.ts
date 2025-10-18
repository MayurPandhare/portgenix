import { Routes } from '@angular/router';
import { DashbordComponent } from './Components/dashbord/dashbord.component';
import { GetStartedComponent } from './Components/get-started/get-started.component';
import { LoginComponent } from './Components/login/login.component';
import { OtpVerifyComponent } from './Components/otp-verify/otp-verify.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { AccountComponent } from './UserComponents/account/account.component';
import { ProfileComponent } from './UserComponents/profile/profile.component';
import { SecurityComponent } from './UserComponents/security/security.component';
import { UserDahsbordComponent } from './UserComponents/user-dahsbord/user-dahsbord.component';

export const routes: Routes = [

  { path: 'portgenix.com', 
    component: DashbordComponent 
  },
  { path: '', 
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
 
  
  //{ path: '', redirectTo: '', pathMatch: 'full' }, // Default route

  {
    path: 'user',
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'account', component: AccountComponent },
      { path: 'security', component: SecurityComponent },
      { path: 'dashbord', component: UserDahsbordComponent }
      
    ]
  },

]


