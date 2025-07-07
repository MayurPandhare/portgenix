import { Routes } from '@angular/router';
import { DashbordComponent } from './Components/dashbord/dashbord.component';
import { GetStartedComponent } from './Components/get-started/get-started.component';
import { LoginComponent } from './Components/login/login.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { AccountComponent } from './UserComponents/account/account.component';
import { ProfileComponent } from './UserComponents/profile/profile.component';
import { SecurityComponent } from './UserComponents/security/security.component';

export const routes: Routes = [
  { path: 'dashboard', 
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
  
  //{ path: '', redirectTo: '', pathMatch: 'full' }, // Default route

  {
    path: 'user',
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'account', component: AccountComponent },
      { path: 'security', component: SecurityComponent },
      
    ]
  },

]


