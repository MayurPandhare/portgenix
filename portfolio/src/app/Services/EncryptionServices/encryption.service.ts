import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EncryptionService {
  
  private secretKey = environment.encryptionKey; // Access the key from the environment object

  // Encrypt data
  encrypt(data: any): string {
    try {
      return CryptoJS.AES.encrypt(JSON.stringify(data), this.secretKey).toString();
    } catch (error) {
      console.error('Encryption failed:', error);
      return '';
    }
  }

  // Decrypt data
  decrypt(encryptedData: string): any {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedData, this.secretKey);
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (error) {
      console.error('Decryption failed:', error);
      return null;
    }
  }
}
