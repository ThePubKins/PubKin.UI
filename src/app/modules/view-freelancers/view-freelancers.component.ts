import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobpostService, UserauthenticateService } from '../../shared';

@Component({
  selector: 'app-view-freelancers',
  templateUrl: './view-freelancers.component.html',
  styleUrls: ['./view-freelancers.component.scss']
})
export class ViewFreelancersComponent implements OnInit {
  texct: string = '2';
  Posts: any[];
  JobPostId: string | null;
  Author: any;
  JobPosts: any;
  UserData: any;

  constructor(public userservice: UserauthenticateService,
    public jobService: JobpostService, private route: ActivatedRoute) { }

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
  toggleIcons(post: any): void {
    this.Posts.forEach((p: any) => {
        p.showIcons = (p === post) ? !p.showIcons : false;
    });
}

  ngOnInit() {
    this.getAllPosts();
    this.getUserData();

  }

  getAllPosts() { 
    this.jobService.getJobPost().subscribe(data => {  
      this.Posts = data;
    })
  }
}
