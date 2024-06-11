import { Component, OnInit } from '@angular/core';
import { UserauthenticateService } from '../../shared/services/userauthenticate.service';
import { NgClass } from '@angular/common';
import { NotificationService, notification } from '../../shared';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-freelancernav',
  templateUrl: './freelancernav.component.html',
  styleUrls: ['./freelancernav.component.scss']
})
export class FreelancernavComponent implements OnInit {
  hide: any;
  selectedButton: any;
  User : any;
  showNotifications=false;
  notifications:any;
  userNotifications: notification[] = [];
  showDotIcon: boolean;
  previousNotificationCount: number = 0;
  private subscription: Subscription;
  imageUrl: string = 'https://localhost:7172';
  constructor(public userauthservice:UserauthenticateService,
    public notificationService: NotificationService,
    ) {}

  ngOnInit(): void {
   this.getUserData();
   this.subscription = this.notificationService.getNotificationsPeriodically().subscribe(
    (notifications: notification[]) => {
        if (notifications.length > this.previousNotificationCount) {
          this.showDotIcon = true;
        } else {
          this.showDotIcon = false;
        }
        this.notifications = notifications;
        this.previousNotificationCount = notifications.length;
        this.userNotifications = this.notifications.filter((notification: { userId: any; }) => notification.userId === this.User[0].id);
      },
    (error) => {
      console.error('Error fetching notifications:', error);
    }
  );
  }
  
  //get the Current User Details
  getUserData() {
    const Email = this.userauthservice.getUserEmail() ?? sessionStorage.getItem('email');
    if (Email) {
      this.userauthservice.getUserData().subscribe({
        next: (data) => {
          this.User = data?.filter((User: any) => User.email === Email);
        },
      });
    } else {
    }
  }
  
    hidden() {
      this.hide = !this.hide
    }
  
    onButtonClick(buttonName: string): void {
      this.selectedButton = buttonName;
    }
  
    logout(): void { 
      this.userauthservice.logout();
    }

    calculateTotal(): number {
      const num1 = parseInt(this.User[0].details || 0);
      const num2 = parseInt(this.User[0].govtIdDetails || 0);
      const num3 = parseInt(this.User[0].bankingDetails || 0);
      const num4 = parseInt(this.User[0].portfolioDetails || 0);
      const num5 = parseInt(this.User[0].workingDetails || 0);
      const num6 = parseInt(this.User[0].educationDetails || 0);
  
      const total = num1 + num2 + num3 + num4 + num5 + num6;
      return total;
    }
  

     showNotification() {
         this.showNotifications = !this.showNotifications;
         if (this.showNotifications) {
          this.showDotIcon = false;
        }
    }

    // getNotification() {
    //   this.notificationService.getNotificaions().subscribe((data: any[]) => {
    //     this.notifications = data;
    //   });
    // }
  }
