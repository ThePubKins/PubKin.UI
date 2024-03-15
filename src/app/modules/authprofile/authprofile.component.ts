import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { UserauthenticateService } from '../../shared/services/userauthenticate.service';


@Component({
  selector: 'app-authprofile',
  templateUrl: './authprofile.component.html',
  styleUrls: ['./authprofile.component.scss']
})
export class AuthprofileComponent implements OnInit {
  Author: any;
  User: any;
  imageUrl: string = 'https://localhost:7172';
  
  constructor(public userauthservice: UserauthenticateService) { }

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


  calculateTotal(): number {
    const num1 = parseInt(this.User[0].details || 0);
    const num2 = parseInt(this.User[0].govtIdDetails || 0);
    const num3 = parseInt(this.User[0].bankingDetails || 0);

    const total = num1 + num2 + num3;
    return total;
  }

}
