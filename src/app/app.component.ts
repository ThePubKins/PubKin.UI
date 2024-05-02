import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { PubKinAppModule } from './modules';
import { NgToastModule } from 'ng-angular-popup';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommentsService, NotificationService, SignalrService, Comment } from './shared';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [],
  imports: [CommonModule, RouterOutlet, RouterModule, RouterLink, PubKinAppModule, NgToastModule, FormsModule,HttpClientModule],
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



  
}
