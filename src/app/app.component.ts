import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { PubKinAppModule } from './modules';
import { NgToastModule } from 'ng-angular-popup';
import { CommentsService, NotificationService, SignalrService } from './shared';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [],
  imports: [CommonModule, RouterOutlet, RouterModule, RouterLink, PubKinAppModule, NgToastModule],
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

  commentData: any = {};

  //  sendNotification() {
  //    const notificationData = { 
  //     notification: 'Your notification message here',
  //     userId : 'e17fe8a3-496b-4ea0-b79f-692f76571f72' };
  //    this.notificationService.postNotification(this.userId, notificationData)
  //      .subscribe(response => {
  //        console.log('Notification posted successfully:', response);
  //      }, error => {
  //        console.error('Error posting notification:', error);
  //      });
  //  }

  //  sendNotifications() {
  //   const message = 'Your notification message here';
  //   this.singlarService.sendNotification(message);
  // }

  comments: any[] = [];

  selectedFile: File | null = null;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
 
}
