import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { PubKinAppModule } from './modules';
import { NgToastModule } from 'ng-angular-popup';
import { NotificationService, SignalrService } from './shared';

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

   constructor(private singlarService:SignalrService, private notificationService: NotificationService) {
    this.singlarService.startConnection();
    this.singlarService.addNotificationListener();  
   }
  
   delay(ms: number) {
     return new Promise( resolve => setTimeout(resolve, ms) );
   }

   userId = '572b456e-3cc9-4d2f-9c00-1b66a5a5ace7'; 

   sendNotification() {
     const notificationData = {   notification: 'Your notification message here', };
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
    console.log(message)
  }
}
