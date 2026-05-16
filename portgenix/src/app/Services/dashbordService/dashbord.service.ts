import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashbordService {

  constructor(private http: HttpClient) { }


  getAllPosts() {

  return this.http.get(
    'http://localhost:8080/portgenix/posts'
  );


  }

  searchPosts(keyword:string){

  return this.http.get(

    `http://localhost:8080/portgenix/search?keyword=${keyword}`

  );

  

}


  getSuggestions(keyword:string){

  return this.http.get(

    `http://localhost:8080/portgenix/suggestions?keyword=${keyword}`

  );

}



}
