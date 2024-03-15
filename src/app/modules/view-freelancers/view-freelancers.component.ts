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
    return this.getCurrentUserOpenJobs().length === 0;
  }

  getJobPosts() {
    this.jobService.getJobPost().subscribe((data) => {
      this.Posts = data;
    });
  }

  getPostStatus(postDate: string) {
    const today = new Date();
    const parts = postDate.split('-');
    const post = new Date(+parts[2], +parts[1] - 1, +parts[0]);
    const diffTime = today.getTime() - post.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24) - 1);
    const diffMonths = (today.getFullYear() - post.getFullYear()) * 12 + (today.getMonth() - post.getMonth());
    const diffYears = today.getFullYear() - post.getFullYear();
    if (diffDays === 0) {
      return 'at Today';
    } else if (diffDays === 1) {
      return '1 day ago';
    } else if (diffDays <= 6) {
      return diffDays + ' days ago';
    } else if (diffDays <= 13) {
      return '1 week ago';
    } else if (diffDays <= 20) {
      return '2 weeks ago';
    } else if (diffDays <= 27) {
      return '3 weeks ago';
    } else if (diffMonths === 1) {
      return '1 month ago';
    } else if (diffMonths > 1 && diffMonths < 12) {
      return diffMonths + ' months ago';
    } else if (diffYears === 1) {
      return '1 year ago';
    } else {
      return diffYears + ' years ago';
    }
  }
}
