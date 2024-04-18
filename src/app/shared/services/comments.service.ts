import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { comments } from "../models";
import { ApiService } from "../../core";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: "root",
})
export class CommentsService {
  constructor(private apiService: ApiService) {}

  commentData: comments = {} as comments;
  list: comments[] = [];

  getComments(): Observable<comments[]> {
    return this.apiService.get(`Comment`);
  }

  postComments(commentData: any): Observable<any> {
    return this.apiService.post(`Comment`, commentData);
  }

 
  postData(comment: comments, file: File): Observable<any> {


    const formData = new FormData();
    formData.append('FileName', comment.fileName);
    formData.append('DateLastModified', comment.dateLastModified);
    formData.append('FileUrl', comment.fileUrl);
    formData.append('Comments', comment.comments);
    formData.append('LastModifiedBy', comment.lastModifiedBy);
    formData.append('JobId', comment.jobId);
    formData.append('CommentDateTime', comment.commentDateTime);
    formData.append('DateCreated', comment.dateCreated);
    formData.append('Id', comment.id);
    formData.append('File', file);
    formData.append('CreatedBy', comment.createdBy);

    const headers = new HttpHeaders({
      'accept': '*/*'
    });
    return this.apiService.post('Comment',  formData );
  }
}
