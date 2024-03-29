import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { comments } from '../models';
import { ApiService } from '../../core';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private apiService: ApiService) { }

  commentData: comments = {} as comments;
  list: comments[] = [];

  getComments(): Observable<comments[]> {
    return this.apiService.get(`Comment`); 
  }

  postComments(commentData: any) {
    return this.apiService.post(`Comment`, commentData)
  }
}
