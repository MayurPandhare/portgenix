import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatProgressBar } from "@angular/material/progress-bar";
import { Router, RouterModule } from '@angular/router';
import { Modal } from 'bootstrap';
import { ToastrService } from 'ngx-toastr';
import { IdServiceService } from '../../Services/Id-Services/id.service';
import { SignupService } from '../../Services/signup-service/signup.service';



@Component({
    selector: 'app-sign-up',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, MatProgressBar],
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
export class SignUpComponent  {
  showEmailForm = false; // Initially false to show buttons
  isLoading: boolean = false; // To control the loader visibility


   otpForm: FormGroup;
  countdown: number = 30;
  timer: any;

   otpModal!: Modal;

   otpToken: string = '';
   
   
   




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

  constructor(private toastr: ToastrService, private fb: FormBuilder,    private signupService: SignupService , private router: Router , private http: HttpClient , private idservice:IdServiceService) {
    // Initialize the form group with form controls and validators
    this.signupForm = new FormGroup({
      userName: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20), this.validUsernameValidator()]),
      email: new FormControl('', [Validators.required, Validators.email,this.validEmailValidator()]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
      firstname: new FormControl('', [Validators.required]),
      terms: new FormControl(false, [Validators.requiredTrue])
    });


     this.otpForm = this.fb.group({
      otp: this.fb.group({
        digit1: ['', Validators.required],
        digit2: ['', Validators.required],
        digit3: ['', Validators.required],
        digit4: ['', Validators.required],
        digit5: ['', Validators.required],
        digit6: ['', Validators.required]
      })
    });
  }

 

  // Submit the form to the backend

  onSubmit() {
    this.isLoading = true;

  if (this.signupForm.invalid) {
    this.signupForm.markAllAsTouched();
    return;
  }

  // Extract only email and username
  const { userName, email } = this.signupForm.value;

  // Call validate-user with username & email
  this.http.post('http://localhost:8080/auth/validate-user', { userName, email }, { withCredentials: true })
    .subscribe({
      next: (response: any) => {
        console.log('Validation response received:', response);

        // Send OTP now
        this.http.post('http://localhost:8080/send-otp',  { email }, {responseType: 'text', withCredentials: true })
        .subscribe({
          next: (otpToken) => {

            this.otpToken = otpToken;
            console.log("response from backend for send-otp", otpToken);
           // this.toastr.info('OTP sent to your email.', 'Verify Email');
         
               this.isLoading = false;
            // ✅ Show OTP modal
            const modal = new Modal(document.getElementById('otp-Modal')!);
            modal.show();


          },
          error: (error: any) => {
            console.error('Error sending OTP:', error);
            this.isLoading = false;
            this.toastr.error('Failed to send OTP. Please try again.', 'Error');
          }
        });
      },
      error: (err) => {
        console.error('Validation failed:', err);
        this.isLoading = false;
        this.toastr.error('Validation Failed');
      }
    });
}

 verifyOtp(){

  this.isLoading = true;

  if (this.otpForm.valid) {
    const otpGroup = this.otpForm.get('otp')?.value;
    const otp = Object.values(otpGroup).join('');

    this.http.post('http://localhost:8080/verify-otp', {otpToken: this.otpToken, otp: otp}, { responseType: 'text' })
      .subscribe({
        next: () => {
          this.toastr.success('✅ OTP verified successfully');
           console.log('varified user');
          // Now send full user data to backend
          const userData = this.signupForm.value;

          this.http.post<{userId: string; }>('http://localhost:8080/auth/signup', userData, { withCredentials: true })
            .subscribe({
              next: (response) => {

               

                const userId = response.userId;
               

               const modalElement = document.getElementById('otp-Modal');
                if (modalElement) {
                  const modal = Modal.getInstance(modalElement);
                  modal?.hide();
                }
                 this.isLoading = false;

                console.log('User ID received from server: ' + userId); // Log the user ID
                
                this.idservice.setUserId(userId); // Save the ID
                this.router.navigateByUrl('/get-started');
              },
              error: () => {
                this.isLoading = false;
                this.toastr.error('❌ Failed to create account');
              }
            });
        },
        error: (err) => {
          this.isLoading = false;
          this.toastr.error('❌ OTP verification failed', err.error);
        }
      });
  }
}
  /*onSubmit() {
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
    /*this.user.password = userData.password;
    this.user.firstname = userData.firstname;*/
  
    /*console.log('Starting validation call...');

    this.http.post('http://localhost:8080/auth/validate-user', userData, { withCredentials: true }).subscribe({


  next: (response: any) => {

    console.log('Validation response received:', response);
    const email = response.email;

    console.log('Sending OTP to:', email);

    this.http.post('http://localhost:8080/send-otp', { email }, {

      responseType: 'text',
      withCredentials: true

    }).subscribe({

      next: (response: any) => {

        console.log("response from backend for send-otp", response);
        this.toastr.info('OTP sent to your email.', 'Verify Email');
        this.isLoading = false;

        this.router.navigateByUrl('/otp_verify');
      },
      error: (error: any) => {

        console.error('Error sending OTP:', error);
        this.isLoading = false;
        this.toastr.error('Failed to send OTP. Please try again.', 'Error');
      }
    });
  },
  error: (err) => {
    console.error('Validation failed:', err);
    this.isLoading = false;
    this.toastr.error('Validation Failed');
  }
});
  }*/

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



  /*  -----------------------------------------------    this is otp form methods ----------------------------------------*/


 

moveToNext(event: any, nextInput: any) {
  const input = event.target as HTMLInputElement;
  if (input.value && nextInput) {
    nextInput.focus();
  }
}

moveToPrev(event: KeyboardEvent, prevInput: any) {
  const input = event.target as HTMLInputElement;
  if (event.key === 'Backspace' && !input.value && prevInput) {
    prevInput.focus();
  }
}


startCountdown() {
  this.countdown = 30;
  this.timer = setInterval(() => {
    this.countdown--;
    if (this.countdown === 0) {
      clearInterval(this.timer);
    }
  }, 1000);
}

resendOtp() {
  // 🔁 Call backend API to re-send OTP here
  console.log("Resending OTP...");

  // Restart countdown
  this.startCountdown();

}


ngAfterViewInit() {
    const emailModalElement = document.getElementById('email-Modal');
    if (emailModalElement) {
      this.otpModal = new Modal(emailModalElement, {
        backdrop: 'static',
        keyboard: false
      });
    }

}


openModal(modalType: 'otp' ) {
    if (modalType === 'otp' && this.otpModal) {
      this.otpModal.show();
    } 
  }

  closeModal(modalType: 'otp') {
    if (modalType === 'otp' && this.otpModal) {
      this.otpModal.hide();
    }
  }




}






  





  
