import { Component } from '@angular/core';
import { Modal } from 'bootstrap'; // Import Modal from Bootstrap


@Component({
  selector: 'app-account',
  standalone: true,
  imports: [],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {


  isExpanded: boolean = false;
  

  toggleText(): void {
    this.isExpanded = !this.isExpanded;
  }


  emailModal!: Modal;
  passwordModal!: Modal;

  ngAfterViewInit() {
    const emailModalElement = document.getElementById('email-Modal');
    if (emailModalElement) {
      this.emailModal = new Modal(emailModalElement, {
        backdrop: 'static',
        keyboard: false
      });
    }

    const passwordModalElement = document.getElementById('password-Modal');
    if (passwordModalElement) {
      this.passwordModal = new Modal(passwordModalElement, {
        backdrop: 'static',
        keyboard: false
      });
    }
  }

  openModal(modalType: 'email' | 'password') {
    if (modalType === 'email' && this.emailModal) {
      this.emailModal.show();
    } else if (modalType === 'password' && this.passwordModal) {
      this.passwordModal.show();
    }
  }

  closeModal(modalType: 'email' | 'password') {
    if (modalType === 'email' && this.emailModal) {
      this.emailModal.hide();
    } else if (modalType === 'password' && this.passwordModal) {
      this.passwordModal.hide();
    }
  }


}
