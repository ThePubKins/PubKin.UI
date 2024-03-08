import { Component, OnInit } from '@angular/core';
import { JobpostService, UserauthenticateService } from '../../shared';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authors-ongoing-jobs',
  templateUrl: './authors-ongoing-jobs.component.html',
  styleUrls: ['./authors-ongoing-jobs.component.scss']
})
export class AuthorsOngoingJobsComponent implements OnInit {

  constructor(public jobService: JobpostService,     public router: Router,
    public userService : UserauthenticateService) {}
  
  ngOnInit(): void {
    this.getAllPosts();
    this.getUserData(); 
  }

  viewwork : boolean = false;
  Posts: any;
  UserData : any;

  showViewedWork() { 
     this.viewwork = true;
  }

  showJobDetails(jobUniqueId: string): void {
    this.router.navigate(['/comments', jobUniqueId]);
  }


  getAllPosts() { 
    this.jobService.getJobPost().subscribe(data => {  
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

}
