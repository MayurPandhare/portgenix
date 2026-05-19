import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {


  
  commentText: any;

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

    console.log("get current user fired");

  return this.http.get(
    'http://localhost:8080/user/current-user'
  );

  }

  toggleLike(postId: number, userId: number){

    return this.http.post(
      `http://localhost:8080/portgenix/like/${postId}/${userId}`,{}
    );

  }

  saveComment(postId:number, text:string){

  return this.http.post(

    `http://localhost:8080/user/comment/${postId}`,

    null,

    {
      params:{
        text:text
      }
    }

  );

  }

  toggleSave(postId:number){

    console.log("inside toggle save angular api");

  return this.http.post(

    `http://localhost:8080/user/save/${postId}`,

    {}

  );

  }


  getSavedPosts(){

  return this.http.get(

    'http://localhost:8080/user/savedPosts'

  );

}


getSavedIds(){

  return this.http.get<number[]>(

    'http://localhost:8080/user/saved-ids'

  );

}






}

