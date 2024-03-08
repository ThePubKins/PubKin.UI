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
  
}
