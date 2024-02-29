import { Component, OnInit } from '@angular/core';
import { AuthprofileComponent } from '../authprofile/authprofile.component';
import { MatDialog } from '@angular/material/dialog';
import { JobpostService, UserauthenticateService } from '../../shared';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit {
  Author: any;
  isLoading: boolean = true;
  JobPostId: string | null;
  Posts: any;
  UserData: any;

  constructor(
    public jobService:JobpostService, public userService : UserauthenticateService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getUserData();
    this.openDeliveryDialog();
     this.getAllPosts();
  }

  getAllPosts() { 
    this.jobService.getJobPosts().subscribe(data => {  
      this.Posts = data;
    })
  }

//Get the Current userData
  getUserData() {
    const Email = this.userService.getUserEmail() ?? sessionStorage.getItem('email');
    console.log(Email, "email")
    if (Email) {
      this.userService.getUserData().subscribe({
        next: (data) => {
          this.UserData = data?.filter((UserData: any) => UserData.email === Email);
        },
        error: (err) => {
          console.error('Error fetching data:', err);
        }
      });
    } else {
    }
  }
  
  //Progress Bar  Functionality
  // getProgressBarColor(): string {
  //   const progress = this.Author[0].ProfilePercentage;
  //   if (progress < 40) {
  //     return '#666666'; 
  //   } else if (progress < 80) {
  //     return '#333333'; 
  //   } 
  //   else {
  //     return '#000000';
  //   }
  // }

  //Open dialog for Profile
  openDeliveryDialog() {
    this.dialog.open(AuthprofileComponent);
  }
}

