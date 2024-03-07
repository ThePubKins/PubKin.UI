import { Component, OnInit } from '@angular/core';
import { AuthprofileComponent } from '../authprofile/authprofile.component';
import { MatDialog } from '@angular/material/dialog';
import { JobpostService, UserauthenticateService } from '../../shared';
import { Router } from '@angular/router';

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
  searchTerm: string;

  constructor(
    public jobService: JobpostService, public userService: UserauthenticateService,
    public dialog: MatDialog, public router: Router) { }

  ngOnInit(): void {
    this.getUserData();
    this.openDeliveryDialog();
    this.getAllPosts();
  }

  getAllPosts() {
    this.jobService.getJobPost().subscribe(data => {
      this.Posts = data;
    })
  }

  //Search input functionality
  onSearchChange(event: any) {
    this.searchTerm = event.target.value;
  }


  //ProgressBar 
  calculateTotal(): number {
    const num1 = parseInt(this.UserData[0].details);
    const num2 = parseInt(this.UserData[0].govtIdDetails);
    const num3 = parseInt(this.UserData[0].bankingDetails);

    const total = num1 + num2 + num3;
    return total;
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

