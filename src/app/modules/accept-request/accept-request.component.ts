import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AppliedUserNotificationService, AppliedUserService, BankDetailsService, NotificationService, SignalrService, UserauthenticateService } from '../../shared';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-accept-request',
  templateUrl: './accept-request.component.html',
  styleUrls: ['./accept-request.component.scss']
})
export class AcceptRequestComponent implements OnInit {
  Applies: any;
  Hire: any;
  deleteProposal: any;
  selectedJobPostId: any;
  user: any;
  users: any[] = [];
  chatTarget: any;
  payment: number = 0;
  selectedhire: any;
  selectedrequest: any;
  currentDate: any = new Date();
  User: any;
  imageUrl: string = 'https://localhost:7172';
  showicons: boolean[] = [];
  filteredData: any[];

  constructor(public route: ActivatedRoute, public userauthservice: UserauthenticateService, public bankservice: BankDetailsService,
    public applyService: AppliedUserService, public datePipe: DatePipe, public singlarService:SignalrService,
    public notificationsService:NotificationService) {
    this.currentDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
  }


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

  ApplyDeleteModal(Applies: any) {
    this.deleteProposal = Applies;
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
        result.sort((a: any, b: any) => {
          const dateA = this.parseDate(a.applyDate);
          const dateB = this.parseDate(b.applyDate);
          return dateA.getTime() - dateB.getTime();
        });
        this.Applies = result;
      },
      error: (err: any) => {
        console.error('Error fetching applied users:', err);
      }
    });
  }

  private parseDate(dateString: string): Date {
    const parts = dateString.split('-');
    return new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
  }

  onSubmitStatus(form: NgForm) {
    if (form.valid && this.applyService.applyData) {
      this.applyService.PutStatus(form.value).subscribe();
    }
  }

success:boolean=false;
successmsg(){
  this.notificationButton.nativeElement.click();
  this.success = !this.success;
  if (this.success) {
    setTimeout(() => {
      this.success = false;
    }, 1500);
  }
}
//Banking Details Submit to Post Function
  onSubmitBankDetails(form: NgForm) {
    if (form.valid && this.bankservice.bankData) {
      this.bankservice.postBankDetails(form.value).subscribe();
    }
  }
  
  resetStatusAfterDelay() {
    setTimeout(() => {
      this.Applies[0].status = "";
    }, 3000);
  }

  dateFormated1:any;
  dateFormatted = this.datePipe.transform(this.currentDate, 'dd MMM');

  showNotificationDetails() {  
    this.dateFormated1= this.dateFormatted;
    this.notificationsService.notificationData.userId = this.selectedhire.userId;
    sessionStorage.setItem("userId", this.notificationsService.notificationData.userId);
    this.notificationsService.notificationData.notificationDate =  this.dateFormated1;
    this.notificationsService.notificationData.notification = "You got the new offer for "  + this.selectedhire.jobUniqueId;
  }
  
  ChangeStatus() { 
    this.selectedhire.status = "offers"
    this.resetStatusAfterDelay();
  }

  DeleteStatus() {
    this.Applies[0].status = "reject"
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


    //Notifications Form 
    // onSubmitNotification(form: NgForm, userId:string) {
    //   if (form.valid && this.notificationsService.notificationData) {
    //     this.notificationsService.postNotification(userId, form.value).subscribe();      }
    // }
  
    @ViewChild('notificationButton') notificationButton: ElementRef;   


    userId =sessionStorage.getItem('authorId')?.toString() || '';;
 
 sendNotification() {
   const notificationData = { 
    notification: 'Your notification message here', };
   this.notificationsService.postNotification(this.userId, notificationData)
     .subscribe(response => {
       console.log('Notification posted successfully:', response);
     }, error => {
       console.error('Error posting notification:', error);
     });
 }


  sendNotifications() {
   const message = 'Your notification message here';
   this.singlarService.sendNotification(message);
 }
}



interface Proposal {
  id: string;
  name: string;
  date: Date;
}


