import { Component } from '@angular/core';
import { JobpostService, UserauthenticateService } from '../../shared';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authors-completed-jobs',
  templateUrl: './authors-completed-jobs.component.html',
  styleUrls: ['./authors-completed-jobs.component.scss']
})

export class AuthorsCompletedJobsComponent {

  userSkillSet: string = '';
  hide = false;
  searchTerm: string;
  currentUser: any;
  jobPosts : any;


  constructor(
    public userService: UserauthenticateService,
    public router: Router,
    public jobService: JobpostService) { }


  onSearchChange(event: any) {
    this.searchTerm = event.target.value;
  }

  submitwork : boolean = false;
  submitworks()  { 
     this.submitwork = true;
  } 

  //Jobdetails Component details will be click the fn.
  showJobDetails(jobUniqueId: string): void {
    this.router.navigate(['/comments', jobUniqueId]);
  }

  getCurrentUserOpenJobs(): any[] {
    const userOpenJobs = this.jobPosts.some((jobPost: { status: string;userId:string; }) => jobPost.status === 'Ongoing' && jobPost.userId === this.currentUser[0].id);
    return userOpenJobs ? userOpenJobs : [];
}

  anyJobInProgress() {
    return this.getCurrentUserOpenJobs().length > 0;
  }


  ngOnInit() {
    this.getUserData(); this.getApplyPosts();
  }

  getUserData() {
    const Email = this.userService.getUserEmail() ?? sessionStorage.getItem('email');
    if (Email) {
      this.userService.getUserData().subscribe({
        next: (data: any[]) => {
          this.currentUser = data?.filter((currentUser: any) => currentUser.email === Email);
          console.log(this.currentUser)
        },
        error: (err: any) => {
          console.error('Error fetching data:', err);
        }
      });
    } else {
    }
  }

  getApplyPosts() {
    this.jobService.getJobPost().subscribe((posts) => {
      this.jobPosts = posts;
    });
  }
  
}
