import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobpostService } from '../Service/jobpost.service';
import { UserauthenticateService } from '../Service/userauthenticate.service';

@Component({
  selector: 'app-view-freelancers',
  templateUrl: './view-freelancers.component.html',
  styleUrls: ['./view-freelancers.component.css']
})
export class ViewFreelancersComponent implements OnInit{
  texct:string='2';
  Posts: any[];
  JobPostId: string | null;
  Author: any;
  JobPosts: any;
  UserData: any;
 
  constructor( public userservice : UserauthenticateService,
     public jobService:JobpostService, private route: ActivatedRoute) {}

  getUserData() {
    const email = this.userservice.getUserEmail() ?? sessionStorage.getItem('email');
    console.log(email, "email")
    if (email) {
      this.userservice.getUserData().subscribe({
        next: (data) => {
          this.UserData = data?.filter((UserData: any) => UserData.email === email);
        }
      });
    } else {
    }
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.JobPostId = params.get('JobPostId');
      this.getJobPosts();
    });
    this.getUserData();
  
  }

  getJobPosts() {
    this.jobService.getJobPosts().subscribe((result: any) => {
      this.JobPosts = result;
    });
  }
}
