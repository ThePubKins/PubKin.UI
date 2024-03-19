import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppliedUserService, JobpostService, UserauthenticateService } from '../../shared';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-progress-jobs',
  templateUrl: './progress-jobs.component.html',
  styleUrls: ['./progress-jobs.component.scss']
})
export class ProgressJobsComponent {

  Applies: any;
  showSkillMatchButton = true;
  selectedFreelancer: any;
  FreelancerSkillSet: string = '';
  userSkillSet: string = '';
  currentUser: any;
  selectedhire: any;
  jobPosts: any;

  constructor(
    public userService: UserauthenticateService,
    public router: Router,
    public jobService: JobpostService,
    public appliedService: AppliedUserService,
  ) { }


  ngOnInit() {
    this.getUserData(); this.getApplyPosts();
    this.getJobPosts();
  }


  @ViewChild('submitbutton') submitbutton: ElementRef;
  submitNow() {
    this.submitbutton.nativeElement.click();
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

  formData = {
    actualValue: null as number | null,
    subtractValue: 0,
    displaySubtractValue: '0%',
    platformFee: 0,
    paymentAfterTax: 0
  };

  calculateResult(): void {
    if (this.selectedhire && this.selectedhire.biddingRate !== null) {
      const biddingRate = this.selectedhire.biddingRate;
      const afterTaxRate = biddingRate * (1 - 0.04);
      const platformFee = biddingRate * 0.02;
      const paymentAfterTax = afterTaxRate - platformFee;
      this.formData.actualValue = biddingRate;
      this.formData.subtractValue = afterTaxRate;
      this.formData.displaySubtractValue = '4%';
      this.formData.platformFee = platformFee;
      this.formData.paymentAfterTax = paymentAfterTax;
    }
  }


  ApplyModal(Apply: any) {
    this.selectedhire = Apply;
  }


  onSubmitStatus(form: NgForm) {
    if (form.valid && this.appliedService.applyData) {
      this.appliedService.PutStatus(form.value).subscribe();
    }
  }


  onSubmitJobStatus(form: NgForm) {
    if (form.valid && this.jobService.jobData) {
      this.jobService.JobStatus(form.value).subscribe();
    }
  }

  getJobPosts() {
    this.jobService.getJobPost().subscribe((data) => {
      this.jobPosts = data;
    });
  }
  
  ChangeStatusRevert() { 
    this.selectedhire.status = "offers";
  }

  ChangeStatus() {
    this.selectedhire.status = "accepted";
    this.jobPosts[0].status = "Ongoing";
  }



  getCurrentUserOpenJobs(): any[] {
    const userOpenJobs = this.Applies.some((Apply: { status: string; userId: string; }) => Apply.status === 'offers' && Apply.userId === this.currentUser[0].id);
    return userOpenJobs ? userOpenJobs : [];
  }

  anyJobInProgress() {
    return this.getCurrentUserOpenJobs().length === 0;
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