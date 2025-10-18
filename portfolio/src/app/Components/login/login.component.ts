import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr'; // Import ToastrModule
import { AuthService } from '../../Services/AuthServices/auth.service';
import { EncryptionService } from '../../Services/EncryptionServices/encryption.service';
import { UserProfileService } from '../../Services/UserServices/user-profile.service';


@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, RouterModule,
        ReactiveFormsModule,
        MatProgressBarModule,
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {

 
  form: FormGroup;
  isLoading: boolean = false; // To control the loader visibility


  constructor(private toastr: ToastrService, private fb: FormBuilder ,private authService: AuthService, private router: Router,
     private userProfileService: UserProfileService, private encryptionService: EncryptionService,) {
    this.form = this.fb.group({
      inputField1: ['', Validators.required],
      inputField2: ['', Validators.required]
    });
  }

  
  
  onSubmit(): void {
  console.log('onSubmit');
  
  // Activate loader
  this.isLoading = true;

  if (this.form.valid) {
    const userData = {
      email: this.form.get('inputField1')?.value,
      password: this.form.get('inputField2')?.value,
    };

    console.log(userData);

    this.authService.login(userData).subscribe(
      (response: any) => {
        console.log('login -Response from backend:', response);

              setTimeout(() => {
                this.isLoading = false; // Stop loader
                this.router.navigateByUrl('/user/dashbord').then(() => {
                 // window.location.reload(); // Force a full-page reload
                });
              }, 3000);
        
        
      },
      (error) => {
        this.isLoading = false; // Stop loader if there is an error during login
        // Show error if credentials are incorrect
        this.toastr.error('Incorrect credentials. Please try again.', 'Login Failed');
      }
    );
  } else {
    this.isLoading = false; // Stop loader if form is invalid
    this.toastr.error('Please fill in the required fields.', 'Form Error');
  }
}

}
