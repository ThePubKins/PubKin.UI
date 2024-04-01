import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppliedUserService, JobpostService, UserauthenticateService, NotificationService } from '../../shared';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';

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
  currentDate: any = new Date();
  dateFormatted: any;

  constructor(
    public userService: UserauthenticateService,
    public router: Router,
    public datePipe: DatePipe,
    public jobService: JobpostService,
    public notificationsService: NotificationService,
    public appliedService: AppliedUserService,
  ) { }


  ngOnInit() {
    this.getUserData(); this.getApplyPosts();
    this.getJobPosts();
  }


  @ViewChild('submitbutton') submitbutton: ElementRef;
  @ViewChild('notificationButton') notificationButton: ElementRef;

  submitNow() {
    this.submitbutton.nativeElement.click();
    this.notificationButton.nativeElement.click();
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

  onSubmitNotification(form: NgForm, userId:string) {
    if (form.valid && this.notificationsService.notificationData) {
      this.notificationsService.postNotification(userId, form.value).subscribe();
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
    this.notificationsService.notificationData.userId = this.jobPosts[0].userId;
    this.dateFormatted = this.datePipe.transform(this.currentDate, 'dd MMM');
    this.notificationsService.notificationData.notificationDate = this.dateFormatted;
    this.notificationsService.notificationData.notification = "Yours " + this.selectedhire.jobUniqueId  + " offer accepeted by " + this.selectedhire.userEmail ;
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