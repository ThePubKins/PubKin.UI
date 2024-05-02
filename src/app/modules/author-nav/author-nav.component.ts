import { Component, OnInit } from "@angular/core";
import { UserauthenticateService } from "../../shared/services/userauthenticate.service";
import { NotificationService } from "../../shared";

@Component({
  selector: "app-author-nav",
  templateUrl: "./author-nav.component.html",
  styleUrls: ["./author-nav.component.scss"],
})
export class AuthorNavComponent implements OnInit {
  hide: boolean;
  User: any;
  notifications: any;
  showNotifications: boolean = false;

  hidden() {
    this.hide = !this.hide;
  }

  constructor(
    public notificationService: NotificationService,
    public userauthservice: UserauthenticateService
  ) {}

  ngOnInit(): void {
    this.getUserData();
    this.getNotification();
  }

  //get the Current User Details
  getUserData() {
    const Email =
      this.userauthservice.getUserEmail() ?? sessionStorage.getItem("email");
     
    if (Email) {
      this.userauthservice.getUserData().subscribe({
        next: (data) => {
          this.User = data?.filter((User: any) => User.email === Email);
          const userId = this.User[0].id;
          sessionStorage.setItem("authorId", userId);
        },
      });
    } else {
    }
  }

  getNotification() {
    this.notificationService.getNotificaions().subscribe((data: any[]) => {
      this.notifications = data;
    });
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
  }
}
