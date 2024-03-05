import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppliedUserService, UserauthenticateService } from '../../shared';

@Component({
  selector: 'app-progress-jobs',
  templateUrl: './progress-jobs.component.html',
  styleUrls: ['./progress-jobs.component.scss']
})
export class ProgressJobsComponent {

  Applies :any;
  showSkillMatchButton = true;
  selectedFreelancer: any;
  FreelancerSkillSet: string = '';
  userSkillSet: string = '';
  currentUser: any;


  constructor(
    public userService: UserauthenticateService,
    public router: Router,
    public appliedService: AppliedUserService) { }


  ngOnInit() {
    this.getUserData(); this.getApplyPosts();
  }

  getUserData() {
    const Email = this.userService.getUserEmail() ?? sessionStorage.getItem('email');
    if (Email) {
      this.userService.getUserData().subscribe({
        next: (data) => {
          this.currentUser = data?.filter((currentUser: any) => currentUser.email === Email);
          console.log(this.currentUser)
        }
      });
    } else {
    }
  }

  
  anyJobInProgress(): boolean {
    return this.Applies.some((Apply: { status: string; }) => Apply.status === 'offers');
  }

  getApplyPosts() {
    this.appliedService.getAppliedUsers().subscribe((posts) => {
      this.Applies = posts;
    });
  }

  logout(): void { }
  

  showJobDetails(jobUniqueId: string): void {
    this.router.navigate(['/freelancers/job-details', jobUniqueId]);
  }

}
