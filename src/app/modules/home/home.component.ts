import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, throwError } from 'rxjs';
import { CommentsService, comments } from '../../shared';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent  {
 
  constructor(private router: Router,public http: HttpClient, public commentService : CommentsService) { }

  user1  = "'author'";
  hide = false;

  hide1() {
    this.hide = !this.hide
  }
  
  navigateToProfile(action: string): void {
    this.router.navigate(['/signup', action]);
  }

  navigateToPubkin(content: string): void {
    this.router.navigate(['/docs', content]);
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });}
 
    selectedOption: string = '1'; 
    onSelectionChange(event: Event) {}
    selectedFile: File | null = null;
    uploadUrl = 'https://localhost:7172/api/1.0/Comment'; // Replace with your actual API endpoint
  
    onFileSelected(event: any) {
      this.commentService.commentData.file = event.target.files[0];
      console.log(this.commentService.commentData.file); 
    }

  //   onSubmit(form:NgForm) {
  //     if (form.valid && this.commentService.commentData) {
  //     this.commentService.postComments(this.commentService.commentData)
  //       .subscribe(
  //         response => {
  //           console.log('Comment added successfully:', response);
  //           // Handle success response
  //         },
  //         error => {
  //           console.error('Failed to add comment:', error);
  //           // Handle error response
  //         }
  //       );
  //   }
  // }

  onSubmit(form: NgForm) {
    if (form.valid && this.commentService.commentData) {
      const formData = new FormData();

  // Append fields to formData if they are defined
  if (this.commentService.commentData.jobId !== undefined) {
    formData.append('jobId', this.commentService.commentData.jobId);
  }

  if (this.commentService.commentData.comments !== undefined) {
    formData.append('comments', this.commentService.commentData.comments);
  }

  if (this.commentService.commentData.createdBy !== undefined) {
    formData.append('createdBy', this.commentService.commentData.createdBy);
  }

  if (this.commentService.commentData.dateCreated !== undefined) {
    formData.append('dateCreated', this.commentService.commentData.dateCreated);
  }

  if (this.commentService.commentData.commentDateTime !== undefined) {
    formData.append('commentDateTime', this.commentService.commentData.commentDateTime);
  }

  if (this.commentService.commentData.fileName !== undefined) {
    formData.append('fileName', this.commentService.commentData.fileName);
  }

  if (this.commentService.commentData.file !== undefined) {
    formData.append('file', this.commentService.commentData.file, this.commentService.commentData.file.name);
  }
}

  
      this.commentService.postComments(this.commentService.commentData)
        .subscribe(
          response => {
            console.log('Comment added successfully:', response);
            // Handle success response
          },
          error => {
            console.error('Failed to add comment:', error);
            // Handle error response
          }
        );
    }

}

