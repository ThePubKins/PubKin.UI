import { Injectable } from "@angular/core";
import { ApiService } from "../../core";
import { Comment } from "../models";
import { HttpClient } from "@angular/common/http";
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

  postComments(formData: FormData): Observable<any> {
    return this.apiService.post(`Comment`, formData);
  }
}
