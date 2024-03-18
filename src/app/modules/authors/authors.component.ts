import { Component, OnInit } from '@angular/core';
import { AuthprofileComponent } from '../authprofile/authprofile.component';
import { MatDialog } from '@angular/material/dialog';
import { AppliedUserNotificationService, JobpostService, UserauthenticateService } from '../../shared';
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
  isFilterApplied: boolean = false;
  itemsPerPage: number = 10;
  currentPage: number = 1;
  jobUniqueId:any;
  filteredJobPosts: any[] = [];

  constructor(
    public jobService: JobpostService, public userService: UserauthenticateService,
    public dialog: MatDialog, public router: Router) { 
 
    }

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
    const num1 = parseInt(this.UserData[0].details || 0);
    const num2 = parseInt(this.UserData[0].govtIdDetails || 0);
    const num3 = parseInt(this.UserData[0].bankingDetails || 0);
    
    const total = num1 + num2 + num3;
    return total;
  }

  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  //Get the Current userData
  getUserData() {
    const Email = this.userService.getUserEmail() ?? sessionStorage.getItem('email');
    console.log(Email, "email")
    if (Email) {
      this.userService.getUserData().subscribe({
        next: (data) => {
          this.UserData = data?.filter((UserData: any) => UserData.email === Email);
          this.openDeliveryDialog();
        },
        error: (err) => {
          console.error('Error fetching data:', err);
        }
      });
    } else {
    }
  }

  get paginatedDataList(): { value: string; date: string }[] {
    const dataToPaginate = this.isFilterApplied ? this.filteredJobPosts : this.Posts;
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return dataToPaginate.slice(startIndex, endIndex);
  }



  //Open dialog for Profile
  total : any;
  openDeliveryDialog() {
    if (this.UserData && this.UserData.length > 0) {
      const total = this.calculateTotal();
      if (total < 99) {
        this.dialog.open(AuthprofileComponent);
      }
    }
  }

}

