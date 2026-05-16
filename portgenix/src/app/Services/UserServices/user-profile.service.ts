import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {


   constructor(private http: HttpClient) {}
   
   getUserData(credentials: { response: string; }) {
    const token = credentials.response;  // Get the token you saved earlier
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.post('http://localhost:8080/auth/profile', {}, { headers, responseType: 'json' });
  }


  getUserPosts(userId:number){

  return this.http.get(

    `http://localhost:8080/user/${userId}`

  );

  }

  getCurrentUser(){

  return this.http.get(
    'http://localhost:8080/user/current-user'
  );

  }

  toggleLike(postId: number, userId: number){

    return this.http.post(
      `http://localhost:8080/portgenix/like/${postId}/${userId}`,{}
    );

  }
}

