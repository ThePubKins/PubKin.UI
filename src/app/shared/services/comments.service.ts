import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { comments } from './comments.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(public http:HttpClient) { }
  private commentUrl = environment.environmentUrl;
  commentformData : comments = new comments();
  list : comments[];

  postComment(commentformData: any): Observable<any> {
    return this.http.post(`${this.commentUrl}/Comment`, commentformData);
  }
  
  getcomment() : Observable<comments[]> { 
    return this.http.get<comments[]>(`${this.commentUrl}/Comment`)
  }
}
