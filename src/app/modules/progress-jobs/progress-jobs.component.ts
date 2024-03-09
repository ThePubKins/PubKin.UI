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
  selectedhire: any;


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
  // formData = {
  //   actualValue: null as number | null,
  //   subtractValue: 2,
  //   displaySubtractValue: '2%',
  // };
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
