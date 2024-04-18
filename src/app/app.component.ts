import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { PubKinAppModule } from './modules';
import { NgToastModule } from 'ng-angular-popup';
import { FormsModule, NgForm } from '@angular/forms';
import { CommentsService, NotificationService, SignalrService, comments } from './shared';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [],
  imports: [CommonModule, RouterOutlet, RouterModule, RouterLink, PubKinAppModule, NgToastModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'pubkin.ui';
  jobUniqueId: any;

   userId = sessionStorage.getItem('authorId')?.toString() || '';
   constructor(private singlarService:SignalrService, private notificationService: NotificationService, public commentService: CommentsService) {
    this.singlarService.startConnection();
    this.singlarService.addNotificationListener(this.userId);  
   }
  
   delay(ms: number) {
     return new Promise( resolve => setTimeout(resolve, ms) );
   }

  selectedFile: File;
  commentData: any = {};
 

  onFileSelected(event: any) {
    this.commentService.commentData.file = event.target.files[0];
  }

   sendNotification() {
     const notificationData = { 
      notification: 'Your notification message here', };
     this.notificationService.postNotification(this.userId, notificationData)
       .subscribe(response => {
         console.log('Notification posted successfully:', response);
       }, error => {
         console.error('Error posting notification:', error);
       });
   }


   sendNotifications() {
    const message = 'Your notification message here';
    this.singlarService.sendNotification(message);
  }


  comments: any[] = [];

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.commentService.getComments().subscribe(response => {
      this.comments = response;
    });
  }

  // @ViewChild('fileInput') fileInput!: ElementRef;

  // onSubmit() {
  //   const formData = new FormData();
  //   formData.append('FileName', this.fileName);
  //   formData.append('DateLastModified', this.dateLastModified);
  //   formData.append('FileUrl', this.fileUrl);
  //   formData.append('Comments', this.comments);
  //   formData.append('LastModifiedBy', this.lastModifiedBy);
  //   formData.append('JobId', this.jobId);
  //   formData.append('CommentDateTime', this.commentDateTime);
  //   formData.append('DateCreated', this.dateCreated);
  //   formData.append('Id', this.id);
  //   formData.append('File', this.file);
  //   formData.append('CreatedBy', this.createdBy);

  //   this.yourService.postData(formData).subscribe(response => {
  //     console.log(response); // Handle the response here
  //   });
  // }

  // onFileSelected(event: any) {
  //   this.file = event.target.files[0];
  // }


  
  comment: comments = {
    fileName: '',
    dateLastModified: '',
    fileUrl: '',
    comments: '',
    lastModifiedBy: '',
    jobId: '',
    commentDateTime: '',
    dateCreated: '',
    id: '',
    file: {} as File, 
    createdBy: ''
  };


  onSubmit() {
    this.commentService.postData(this.comment, this.comment.file).subscribe(response => {
      console.log(response); // Handle the response here
    });
  }
}
