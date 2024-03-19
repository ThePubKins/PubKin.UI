import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AppliedUserService, UserauthenticateService } from '../../shared';


@Component({
  selector: 'app-applied-jobs',
  templateUrl: './applied-jobs.component.html',
  styleUrls: ['./applied-jobs.component.scss']
})
export class AppliedJobsComponent {

  selectedButton: string = "button1";
  filteredJobs: any[] | undefined;
  hide = false;
  searchTerm: string;
  currentUser: any;
  Applies: any;
  selectedrequest: any;


  constructor(
    public userService: UserauthenticateService,
    public appliedService: AppliedUserService,
  ) { }


  onSearchChange(event: any) {
    this.searchTerm = event.target.value;
  }

  hidden() {
    this.hide = !this.hide
  }

  onButtonClick(buttonName: string): void {
    this.selectedButton = buttonName;
  }

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
        },
        error: (err) => {
          console.error('Error fetching data:', err);
        }
      });
    } else {
    }
  }

  getApplyPosts() {
    this.appliedService.getAppliedUsers().subscribe((posts) => {
      this.Applies = posts;
    });
  }

  getCurrentUserOpenJobs(): any[] {
    const userOpenJobs = this.Applies.filter((Apply: { status: string; userId: string; }) => Apply.status === 'applied' && Apply.userId === this.currentUser[0].id );
    return userOpenJobs; 
}

anyJobInProgress() {
  return this.getCurrentUserOpenJobs().length === 0;
}

  logout(): void { }

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
      return diffDays + ' day ago';
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

  openModal(Apply: any) {
    this.selectedrequest = Apply;
  }
}
