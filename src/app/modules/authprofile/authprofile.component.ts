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
     const progress = this.User[0].ProfilePercentage;
 
     if (progress < 40) {
       return '#666666'; 
     } else if (progress < 80) {
       return '#333333'; 
     } 
     else {
       return '#000000';
     }
   }

}
