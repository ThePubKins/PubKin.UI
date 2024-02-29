import { Component, OnInit } from '@angular/core';
import { UserauthenticateService } from '../../shared';

@Component({
  selector: 'app-freeprofile',
  templateUrl: './freeprofile.component.html',
  styleUrls: ['./freeprofile.component.scss']
})
export class FreeprofileComponent implements OnInit {
  Freelancers: any;
  Author: any;
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

  getProgressBarColor(): string {
    const progress = this.Freelancers[0].ProfilePercentage;

    if (progress < 35) {
      return '#666666'; 
    } else if (progress < 80) {
      return '#333333'; 
    } 
    else {
      return '#000000';
    }
  }
  
  GoNext: string  = "";
  GoNextBtn(GoBtnName: string): void {
    this.GoNext = GoBtnName;
  }
}
