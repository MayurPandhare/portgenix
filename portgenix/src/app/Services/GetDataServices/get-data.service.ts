import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  constructor(private http: HttpClient) {}

  // Method to send the access token in the Authorization header
  getData(authToken: string): Observable<any> {
    // Set the headers to include the access token in Authorization header as 'Bearer token'
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,  // Include token in Authorization header
    });

    // Send the GET request to the backend with the token in the headers
    return this.http.post('http://localhost:8080/user/profile', {}, { headers, responseType: 'json' });
  }

  getheader(authToken: string): Observable<any> {
    // Set the headers to include the access token in Authorization header as 'Bearer token'
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,  // Include token in Authorization header
    });

    // Send the GET request to the backend with the token in the headers
    return this.http.post('http://localhost:8080/user/header', {}, { headers, responseType: 'json' });
  }


  getPostId(postId: number){

    return this.http.get(`http://localhost:8080/portgenix/post/${postId}`);
  }


  getRelatedPosts(postId: number){
    return this.http.get(`http://localhost:8080/portgenix/post/${postId}/related`);
  }


  getUserById(id:number){

  return this.http.get(`http://localhost:8080/portgenix/user/${id}`);

  }

  getComments(postId:number){

    console.log("load post comment about to start :")

  return this.http.get(

    `http://localhost:8080/portgenix/comments/${postId}`

  );

}
}