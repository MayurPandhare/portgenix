import { animate, style, transition, trigger } from '@angular/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { IdServiceService } from '../../Services/Id-Services/id.service';



@Component({
    selector: 'app-get-started',
    standalone: true,
    imports: [MatInputModule, MatFormFieldModule, ReactiveFormsModule,
        // TODO: `HttpClientModule` should not be imported into a component directly.
        // Please refactor the code to add `provideHttpClient()` call to the provider list in the
        // application bootstrap logic and remove the `HttpClientModule` import from this component.
        HttpClientModule],
    templateUrl: './get-started.component.html',
    styleUrl: './get-started.component.css',
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
export class GetStartedComponent {

   // Access the file input element using ViewChild
   @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;



   fileToUpload: File | null = null; // To store the selected file


    // To store the selected image's URL
    selectedImage: string = 'assets/Images/default-pro.jpg';


  locationFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(50),
  ]);


  form: FormGroup;

  constructor(private fb: FormBuilder ,  private http: HttpClient , private idservice: IdServiceService , private router: Router) {
    // Initialize the form group with validation
    this.form = this.fb.group({
      inputField: ['', Validators.required]
    });
  }









  // Trigger the file input click event
            /* ---------------------------------- Trigger the file input click event   --------------------------------*/


 triggerFileInput(): void {
  this.fileInput.nativeElement.click();
  console.log('trigger file input click');
}

// Handle file selection and display the selected image
onFileSelected(event: Event): void {
  console.log('onFileSelected click')
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    const selectedFile = input.files[0];

    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target?.result) {
        this.selectedImage = e.target.result as string; // Update the image source
      }
    };
    reader.readAsDataURL(selectedFile);
    this.fileToUpload = selectedFile;
    console.log('file to upload pass done')
    console.log(this.fileToUpload);
  }
}


        /*---------------------------------------------------- OnInit------------------------------------------------------ */



  ngOnInit(): void{
    const userId = this.idservice.getUserId();
    console.log('Received User ID:', userId);
  }



          /*---------------------------------------------------- OnSubmit ----------------------------------------------------- */



          // Submit form and send data
  onSubmit(): void {
    if (this.form.valid && this.fileToUpload) {
      console.log('Uploading file ' + this.fileToUpload);
      this.uploadImageToCloudinary(this.fileToUpload);
    }else{
      
      const userData = {
        id: this.idservice.getUserId(),  // The userId from the signup response
        location: this.form.get('inputField')?.value,  // Assuming this is the location
        imageUrl: this.selectedImage  // Assuming this is the image URL
      };

      console.log(' no file select' + this.selectedImage);
      console.log(userData);
  
      // Send user data to your backend API for storage in the database
      this.http.post('http://localhost:8080/auth/save_user', userData ,{ responseType: 'text' }).subscribe(
        (response: any) => {
          console.log('User data saved:', response);
          this.router.navigate(['/login']);
        }, 
        (error: any) => {
          console.error('Error saving user data:', error);
        }
      );
    }
  }



      /*-------------------------------------------------- uploadImageToCloudinary ------------------------------------------------ */



  // Upload image to Cloudinary
  uploadImageToCloudinary(file: File): void {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', environment.cloudinary.uploadPreset);

    this.http.post(`https://api.cloudinary.com/v1_1/${environment.cloudinary.cloudName}/image/upload`, formData)
      .subscribe(
        (response: any) => {
          
          const imageUrl = response.secure_url; // Get the name of the uploaded image
          this.saveUserDataToBackend(imageUrl); // Save the image URL to the backend
          console.log('Cloudinary img saved successfully');
        },
        (error: any) => {
          console.error('Error uploading image:', error);
        }
      );
  }


  

  // Save the user's data along with image URL to your backend
  saveUserDataToBackend(imagename : string): void {
    const userData = {
      location: this.form.get('inputField')?.value,
      imageUrl: imagename,
      id: this.idservice.getUserId()  // The userId from the signup response
    };

    console.log('User data ' + userData.id + userData.location + userData.imageUrl);


    // Send user data to your backend API for storage in the database
    this.http.post('http://localhost:8080/auth/save_user', userData , { responseType: 'text' }).subscribe(
      (response: any) => {
        console.log('User data saved:', response);
        this.router.navigate(['/login']);
        
      },
      (error: any) => {
        console.error('Error saving user data:', error);
      }
    );
  }

}
