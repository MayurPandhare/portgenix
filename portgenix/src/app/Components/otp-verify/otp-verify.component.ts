import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SendDataServiceService } from '../../Services/Send-data-Service/send-data-service.service';


@Component({
  selector: 'app-otp-verify',
  standalone: true, // ✅ Mark as standalone
  imports: [ ReactiveFormsModule,],
  templateUrl: './otp-verify.component.html',
  styleUrls: ['./otp-verify.component.css']
})
export class OtpVerifyComponent {
  otpForm: FormGroup;
  countdown: number = 30;
  timer: any;



  ngOnInit() {
    this.toastr.info('OTP sent to your email.', 'Verify Email');
  this.startCountdown(); // Start the timer on load
}


  constructor(private toastr: ToastrService, private fb: FormBuilder , private SendDataServiceService: SendDataServiceService, private http: HttpClient) {
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

 onVerify() {
  /*if (this.otpForm.valid) {
    const otpGroup = this.otpForm.get('otp')?.value;
    const otp = Object.values(otpGroup).join('');

    this.http.post('http://localhost:8080/verify-otp', 
      { otp }, 
      { withCredentials: true } // THIS IS REQUIRED
    ).subscribe({
      next: (res) => {
        this.toastr.info('✅ OTP verified successfully');
        // Navigate to next step
      },
      error: (err) => {
        this.toastr.error('❌ OTP verification failed', err.error);
      }
    });
  }*/
 console.log('onVerify-work');
}

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


}
