import { Injectable } from "@angular/core";
import { ApiService } from "../../core";
import { Comment } from "../models";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CommentsService {
  constructor(private apiService: ApiService, private http: HttpClient) { }
  
  commentData: Comment = {} as Comment;
  list: Comment[] = [];

  getComments(): Observable<Comment[]> {
    return this.apiService.get(`Comment`);
  }

  postComments(commentData: any) {
    return this.apiService.post(`Comment`, this.commentData);
  }

  // submitComment(formData: FormData): Observable<any> {
  //   let httpOptions = new HttpHeaders({
  //     'accept': '*/*'
  //   });

  //   httpOptions = httpOptions.append('Content-Type', 'multipart/form-data');

  //   return this.apiService.post(`Comment`, formData, httpOptions);
  // }
}
