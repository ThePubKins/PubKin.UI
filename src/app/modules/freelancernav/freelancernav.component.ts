import { Component, OnInit } from '@angular/core';
import { UserauthenticateService } from '../../shared/services/userauthenticate.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-freelancernav',
  templateUrl: './freelancernav.component.html',
  styleUrls: ['./freelancernav.component.scss']
})
export class FreelancernavComponent implements OnInit {
  hide: any;
  selectedButton: any;
  User : any;
  imageUrl: string = 'https://localhost:7172';
  constructor(public userauthservice:UserauthenticateService) {}
  ngOnInit(): void {
   this.getUserData();
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
  
    onLogoutClick(): void {
      // this.authService.logout();
      // this.authService.signOut();
    }
}
