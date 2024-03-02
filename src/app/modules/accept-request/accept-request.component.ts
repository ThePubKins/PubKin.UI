import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AppliedUserService, BankDetailsService, UserauthenticateService } from '../../shared';

@Component({
  selector: 'app-accept-request',
  templateUrl: './accept-request.component.html',
  styleUrls: ['./accept-request.component.scss']
})
export class AcceptRequestComponent implements OnInit {
  Applies: any[] = [];
  Hire: any;
  selectedJobPostId: string | null = null;
  user: any;
  users: any[] = [];
  chatTarget: any;
  payment: number = 0;
  selectedJobPost: any;
  selectedhire: any;
  selectedrequest: any;
  User: any;
  imageUrl: string = 'https://localhost:7172';

  constructor(private route: ActivatedRoute, public userauthservice: UserauthenticateService, public bankservice: BankDetailsService,
    public applyService: AppliedUserService) { }

  getUserData() {
    const Email = this.userauthservice.getUserEmail() ?? sessionStorage.getItem('email');
    if (Email) {
      this.userauthservice.getUserData().subscribe({
        next: (data) => {
          this.User = data?.filter((User: any) => User.email === Email);
        },
      });
    } else {
    }
  }

  onChatTargetClick(targetUser: any): void {
    this.chatTarget = targetUser;
  }


  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.selectedJobPostId = params.get('JobId');
      if (this.selectedJobPostId) {
        this.getApplies(this.selectedJobPostId);
      }
    });
    this.getUserData();
  }

  getApplies(jobId: string): void {
    this.applyService.getAppliedUserById(jobId).subscribe({
      next: (result: any) => {
        this.Applies = result;
        console.log(this.Applies);
      },
      error: (err: any) => {
        console.error('Error fetching applied users:', err);
      }
    });
  }

  //Banking Details Submit to Post Function
  onSubmitBankDetails(form: NgForm) {
    if (form.valid && this.bankservice.bankData) {
      this.bankservice.postBankDetails(form.value).subscribe();
    }
  }

  // showthedetails() { 
  //   this.service.formData.ApplyId = this.selectedhire.ApplyId;
  // }

  // AcceptRequest() { 
  //   this.service.formData.isProgressJobs = true;
  // }

  selectedButton: string = "button1";

  onButtonClick(buttonName: string): void {
    this.selectedButton = buttonName;
  }

  openModal(Apply: any) {
    this.selectedrequest = Apply;
  }

  ApplyModal(Apply: any) {
    this.selectedhire = Apply;
  }


  calculateFees() {
    const platformFeePercentage = 2;
    const taxesPercentage = 6;
    const platformFee = (platformFeePercentage / 100) * this.selectedhire.biddingRate;
    const taxes = (taxesPercentage / 100) * this.selectedhire.biddingRate;
    const payableAmount = this.selectedhire.biddingRate + platformFee + taxes;
    return {
      platformFee: platformFee.toFixed(2),
      taxes: taxes.toFixed(2),
      payableAmount: payableAmount.toFixed(2)
    };
  }
}


interface Proposal {
  id: string;
  name: string;
  date: Date;
}


