import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {

   selectedFile!: File;
  imagePreview: any = null;

  title = '';
  description = '';
  link = '';
  tags: string[] = [];
  board = '';

  allowComments = true;
  showProducts = true;
  altText = '';

  isMoreOpen = false;


  tagInput = '';

allTags: string[] = [
  
  'Technology',
  'Nature',
  'Travel',
  'Food',
  'Aesthetic',
  'Art',
  'Photography',
  'Motivation',
  'Fitness',
  'Fashion',
  'Music',
  'Books',
  'Outfits',
  'Mountains',
  'Beach',
  'Street Fashion',
  'Design',
  'Curly Hair',
  'Healthy',
  'Spain',
  'Italy',
  'France',
  'Anime',
  'Cartoons',
  'Tattoo',
  'Morning',
  'Night',
  'Kurta',
  'Long',
  'Hate',
  'Happiness',
  'Hair Style',
  'Bike',
  'car',
  'BMW'



];

filteredTags: string[] = [];

selectedTags: string[] = [];

showDropdown = false;

 @ViewChild('tagBox') tagBox!: ElementRef;


  constructor(private http: HttpClient, private router: Router) {}

  onFileSelect(event: any) {
    const file = event.target.files[0];

    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  toggleMore() {
    this.isMoreOpen = !this.isMoreOpen;
  }

  uploadPost() {
    const formData = new FormData();

    formData.append("file", this.selectedFile);
    formData.append("title", this.title);
    formData.append("description", this.description);
    formData.append("link", this.link);
    // FIXED
    formData.append(
      "tags",
      this.selectedTags.join(",")
    );

   

    console.log("Tags we upload: " + this.tagInput);

    this.http.post("http://localhost:8080/user/uploadPost", formData)
      .subscribe(res => {
        console.log("Uploaded:", res);
      });

      this.router.navigate(['/dashbord']);
  }




  /* FILTER TAGS */
filterTags() {

  const value = this.tagInput.toLowerCase();

  this.filteredTags = this.allTags.filter(tag =>
    tag.toLowerCase().includes(value) &&
    !this.selectedTags.includes(tag)
  );

}


/* ADD TAG */
addTag(tag: string) {

  this.selectedTags.push(tag);

  this.tagInput = '';

  this.filteredTags = [];

  this.showDropdown = false;
}


/* REMOVE TAG */
removeTag(tag: string) {

  this.selectedTags = this.selectedTags.filter(t => t !== tag);

}

/* CLICK OUTSIDE */
  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {

    if (
      this.tagBox &&
      !this.tagBox.nativeElement.contains(event.target)
    ) {
      this.showDropdown = false;
    }

  }

}
