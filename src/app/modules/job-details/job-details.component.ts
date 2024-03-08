import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobpostService } from '../../shared';

interface JobPost {
  skillSet: string[];
}
@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})

export class JobDetailsComponent implements OnInit {

  jobPost: any;
  Freelancers: any;
  constructor( private route: ActivatedRoute, public jobservice: JobpostService,  private router: Router, public cdr: ChangeDetectorRef) { }
success:boolean=true;
savejob() {
  this.success = !this.success;
  if (!this.success) {
    setTimeout(() => {
      this.router.navigate(['/freelancers']); 
    }, 1000); 
  }
}
  ngOnInit() {
    this.getPosts();
  }
  // getPosts() {
  //   this.route.params.subscribe((params) => {
  //     const jobUniqueId = params['id'];
  //     this.jobservice.getJobPostById(jobUniqueId).subscribe(
  //      (details) => {
  //         this.jobPost = details;
  //       });
  //   });
  // }
  skills: any[] = [];
  getPosts() {
    this.route.params.subscribe((params) => {
      const jobUniqueId = params['id'];
      this.jobservice.getJobPostById(jobUniqueId).subscribe(
        (details: JobPost) => {
          this.jobPost = details;
          console.log('Job Post:', this.jobPost); 
          if (this.jobPost && this.jobPost.skillSet) {
            this.skills = this.jobPost.skillSet.split(',');
            console.log('Skills:', this.skills); 
          }
        }
      );
    });
  }

  showApplyNow(jobUniqueId: string): void {
    this.router.navigate(['/freelancers/apply-now', jobUniqueId]);
  }

  getPostStatus(postDate: string): string {
    const today = new Date();
    const parts = postDate.split('-');
    const post = new Date(+parts[2], +parts[1] - 1, +parts[0]) ;
    const diffTime = today.getTime() - post.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24) - 1);
    const diffMonths = (today.getFullYear() - post.getFullYear()) * 12 + (today.getMonth() - post.getMonth());
    const diffYears = today.getFullYear() - post.getFullYear();
  
   console.log(diffDays)

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
