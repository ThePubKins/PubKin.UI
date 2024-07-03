import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { PubKinAppModule } from './modules';
import { NgToastModule } from 'ng-angular-popup';
import {  JobpostService, NotificationService, SignalrService, WorkfileService } from './shared';
import { HttpHeaders } from '@angular/common/http';

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
   constructor(private singlarService:SignalrService, private notificationService: NotificationService, public commentService: JobpostService, 
    public workFileService:WorkfileService
   ) {
    this.singlarService.startConnection();
    this.singlarService.addNotificationListener(this.userId);  
   }
  
   delay(ms: number) {
     return new Promise( resolve => setTimeout(resolve, ms) );
   }

}