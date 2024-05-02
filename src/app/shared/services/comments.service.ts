import { Injectable } from "@angular/core";
import { ApiService } from "../../core";
import { Comment } from "../models";
import { HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class CommentsService {
  constructor(private apiService: ApiService) { }

  
  commentData: Comment = {} as Comment;
  list: Comment[] = [];

  // addComment(commentData: any) {
  //   return this.apiService.post(`Comment`, this.commentData);
  // }

  addComment(commentData: any, headers: HttpHeaders) {
    return this.apiService.post(`Comment`, commentData,  headers);
  }
}
