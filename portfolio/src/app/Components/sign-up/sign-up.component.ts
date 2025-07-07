import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IdServiceService } from '../../Services/Id-Services/id.service';
import { SignupService } from '../../Services/signup-service/signup.service';




@Component({
    selector: 'app-sign-up',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
    templateUrl: './sign-up.component.html',
    styleUrl: './sign-up.component.css',
    animations: [
      trigger('slideInFromRight', [
        transition(':enter', [
          style({ transform: 'translateX(100%)', opacity: 0 }),
          animate('500ms ease-in-out', style({ transform: 'translateX(0)', opacity: 1 })),
        ]),
       /* transition(':leave', [
          animate('300ms ease-in-out', style({ transform: 'translateX(100%)', opacity: 0 })),
        ]),*/
      ]),
    ],
})
export class SignUpComponent implements OnInit {
  showEmailForm = false; // Initially false to show buttons

  // Show the email signup form
  showEmailSignup() {
    this.showEmailForm = true;
  }

  // Cancel and reset the form
  cancel() {
    this.showEmailForm = false; // Go back to the initial state
    this.signupForm.reset();    // Reset form fields to ensure no pre-filled data
  }

  // Data model for the form submission (optional if you want to store the values explicitly)
  user = { userName: '', email: '', password: '', firstname: '', terms: false };

  serverErrorMessage: string | null = null;

  signupForm: FormGroup;

  constructor(private toastr: ToastrService,private signupService: SignupService , private router: Router , private http: HttpClient , private idservice:IdServiceService) {
    // Initialize the form group with form controls and validators
    this.signupForm = new FormGroup({
      userName: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20), this.validUsernameValidator()]),
      email: new FormControl('', [Validators.required, Validators.email,this.validEmailValidator()]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
      firstname: new FormControl('', [Validators.required]),
      terms: new FormControl(false, [Validators.requiredTrue])
    });
  }

  ngOnInit(): void {
    // Ensure the form is empty when the component is initialized
  }

  // Submit the form to the backend
  onSubmit() {
    if (this.signupForm.invalid) {
      // If the form is invalid, mark all controls as touched so errors show up
      this.signupForm.markAllAsTouched();
      return;
    }
  
    // Use the form values instead of `this.user`
    const userData = this.signupForm.value;
  
    // Map form values to the user object
    this.user.userName = userData.userName;
    this.user.email = userData.email;
    this.user.password = userData.password;
    this.user.firstname = userData.firstname;
  
    this.http
      .post<{ userId: string; accessToken: string; refreshToken: string }>(
        'http://localhost:8080/auth/signup',
        userData
      )
      .subscribe({
        next: (response) => {
          this.serverErrorMessage = null; // Clear any previous errors
  
          // Toastr success notification
          this.toastr.success(
            'Your account has been created successfully!',
            'Signup Successful'
          );
  
          const userId = response.userId;
          const accessToken = response.accessToken;
          const refreshToken = response.refreshToken;
  
          console.log('User ID received from server: ' + userId); // Log the user ID
          this.idservice.setUserId(userId); // Save the ID
          this.router.navigate(['/get-started']);
        },
  
        error: (err) => {
          // Extract error message from the server response
          const errorMessage =
            err.error?.message || 'An unexpected error occurred. Please try again.';
  
          // Toastr error notification
          this.toastr.error(errorMessage, 'Signup Failed');
        },
  
        complete: () => {
          console.log('Signup request completed.');
          this.router.navigate(['/get-started']);
        },
      });
  }

  // Custom validator for username
  validUsernameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const usernamePattern = /^[a-zA-Z0-9._]+$/;
      const isValid = usernamePattern.test(control.value);
      return isValid ? null : { invalidCharacters: true };
    };
  }


  // Custom email validator
validEmailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValid = emailPattern.test(control.value);
    return isValid ? null : { invalidEmail: true };
  };
}

  // Clear the form fields
  clearForm() {
    this.signupForm.reset({
      userName: '',
      email: '',
      password: '',
      firstname: '',
      terms: false
    });
  }
}
  





  
