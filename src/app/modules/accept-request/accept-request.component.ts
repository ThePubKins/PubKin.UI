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
  Applies: any;
  Hire: any;
  selectedJobPostId: any;
  user: any;
  users: any[] = [];
  chatTarget: any;
  payment: number = 0;
  selectedhire: any;
  selectedrequest: any;
  User: any;
  imageUrl: string = 'https://localhost:7172';
  showicons: boolean[] = [];
  constructor(public route: ActivatedRoute, public userauthservice: UserauthenticateService, public bankservice: BankDetailsService,
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
    this.Applies.forEach(() => {
      this.showicons.push(false);
    });
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

  onSubmitStatus(form: NgForm) {
    if (form.valid && this.applyService.applyData) {
      this.applyService.PutStatus(form.value).subscribe();
    }
  }


  //Banking Details Submit to Post Function
  onSubmitBankDetails(form: NgForm) {
    if (form.valid && this.bankservice.bankData) {
      this.bankservice.postBankDetails(form.value).subscribe();
    }
  }
  
  ChangeStatus() { 
    this.Applies.status = "offers"
  }

  GoNext: string = "button1";

  GoNextBtn(GoBtnName: string): void {
    this.GoNext = GoBtnName;
  }
  openModal(Apply: any) {
    this.selectedrequest = Apply;
  }

  ApplyModal(Apply: any) {
    this.selectedhire = Apply;
  }
  showicon(index: number) {
    this.showicons[index] = !this.showicons[index];
    for (let i = 0; i < this.showicons.length; i++) {
      if (i !== index) {
        this.showicons[i] = false;
      }
    }
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


