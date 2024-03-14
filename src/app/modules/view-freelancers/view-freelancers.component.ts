import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobpostService, UserauthenticateService } from '../../shared';
import { NgForm } from '@angular/forms';


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
  UserData: any;
  searchTerm: string;
  selectedhire : any;
  
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

    //Search input functionality
    onSearchChange(event: any) {
      this.searchTerm = event.target.value;
    }
  

  toggleIcons(post: any): void {
    this.Posts.forEach((p: any) => {
        p.showIcons = (p === post) ? !p.showIcons : false;
    });
}

  ngOnInit() {
    this.getJobPosts();
    this.getUserData();
  }
    
  ApplyModal(Posts: any) {
    this.selectedhire = Posts;
  }

  ChangeStatus() { 
     this.selectedhire.status = 'delete';
  }
  onSubmitStatus(form: NgForm) {
    if (form.valid && this.jobService.jobData) {
      this.jobService.JobStatus(form.value).subscribe();
    }
  }

  getCurrentUserOpenJobs(): any[] {

    const userOpenJobs = this.Posts.filter((Post: { status: string; userId: string }) => Post.status === 'Open' && Post.userId === this.UserData[0].id);
    return userOpenJobs ? userOpenJobs : [];
  }
  anyJobInProgress() {
    return this.getCurrentUserOpenJobs().length > 0;
  }

  getJobPosts() {
    this.jobService.getJobPost().subscribe((data) => {
      this.Posts = data;
    });
  }
}
