import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { PubKinAppModule } from './modules';
import { AppliedUserNotificationService } from './shared/services/applied-user-notification.service';
import { NgToastModule } from 'ng-angular-popup';

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

   constructor(private singlarService:AppliedUserNotificationService) {
       this.singlarService.startConnection();
     this.singlarService.addProductListener(); 
   }
  
   delay(ms: number) {
     return new Promise( resolve => setTimeout(resolve, ms) );
   }

}
