import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { AppliedUserService, CommentsService, JobpostService, NotificationService, SignalrService, UserauthenticateService, applied_user } from '../../shared';


@Component({
  selector: 'app-apply-now',
  templateUrl: './apply-now.component.html',
  styleUrls: ['./apply-now.component.scss']
})
export class ApplyNowComponent {
  authors: any;
  newMessage: string = '';
  users: any;
  user: any;
  chatTarget: any;
  JobPost: any;
  maxCharacters = 450;
  inputText = '';
  charactersLeft: number;
  currentDate: any = new Date();
  //new
  UserData: any;
  dateFormatted: any;
  success: boolean = true;

  jobpostData: applied_user = {} as applied_user;
  filesdetails: any;
  constructor(public datePipe: DatePipe, private route: ActivatedRoute, public notificationsService : NotificationService,
  public userservice: UserauthenticateService, public commentservice: CommentsService, private singlarService:SignalrService,
    public appliedservice: AppliedUserService, public jobservice: JobpostService,public router: Router) { this.calculateCharactersLeft(); }

  ngOnInit(): void {
    this.getPosts(); this.getUserData();
    const initialChatTarget = null;
    this.onChatTargetClick(initialChatTarget);
  }


  // onSubmitApply(form: NgForm) {
  //   if (this.appliedservice.applyData) {
  //     this.appliedservice.postApply(form.value).subscribe();
  //   }
  // }


  
  selectedFile: File | null = null;
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }
               
         
    submitApplied(): void {
  
      const formData: FormData = new FormData();
      formData.append('Id', "08dc6ff1-4047-46ad-8146-6d5fa5960654");
      formData.append('DateLastModified', "0001-01-01 00:00:00");
      formData.append('LastModifiedBy', this.appliedservice.applyData.lastModifiedBy);
      formData.append('DateCreated', "0001-01-01 00:00:00");
      formData.append('CreatedBy', this.appliedservice.applyData.createdBy);
      formData.append('UserId', this.appliedservice.applyData.userId);
      formData.append('JobId', this.appliedservice.applyData.jobId);
      formData.append('SkillSet', this.appliedservice.applyData.skillSet);
      formData.append('JobTitle', this.appliedservice.applyData.jobTitle);
      formData.append('ApplyCoverLetter', this.appliedservice.applyData.applyCoverLetter);   
      formData.append('SkillSet', this.appliedservice.applyData.skillSet);
      formData.append('BiddingRate', this.appliedservice.applyData.biddingRate.toString());
      formData.append('UserEmail', this.appliedservice.applyData.userEmail);
      formData.append('Status', this.appliedservice.applyData.status);
      formData.append('JobDescription', this.appliedservice.applyData.jobDescription);
      formData.append('Rate', this.appliedservice.applyData.rate);
      formData.append('PostBy', this.appliedservice.applyData.postBy);
      formData.append('FileUrl', this.appliedservice.applyData.fileUrl);
      formData.append('JobUniqueId', this.appliedservice.applyData.jobUniqueId);
      formData.append('applideUserProfile', this.appliedservice.applyData.applideUserProfile);
      formData.append('ApplyDate', this.appliedservice.applyData.applyDate);
      if (this.selectedFile) {
      formData.append('file', this.selectedFile, this.selectedFile.name);
      formData.append('File', this.selectedFile, this.selectedFile.name);
      }
      this.appliedservice.postApply(formData).subscribe(
        response => {
          this.SuccessModal();
        },
        error => {
          console.error('Upload failed', error);
        }
    
      );
  }


  uploadedFileName: string = '';
  selectedFiles: string[] = [];
  
  UploadFileName(event: any) {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0];
    this.uploadedFileName = file ? file.name : '';
  }
  
  handleFormSubmission() {
    this.SuccessModal();
  }


  SuccessModal() {
    this.success = false;
    setTimeout(() => {
      this.router.navigate(['/freelancers']);
      
    }, 3000);
  }

  formData = {
    actualValue: null as number | null,
    subtractValue: 2,
    displaySubtractValue: '2%',
    taxValue : null as number |null,
  };

  calculateResult(): void {
    if (this.formData.actualValue !== null) {
      const percentToSubtract = (2 / 100) * this.formData.actualValue;
      const afterTaxReport = (4 / 100) * this.formData.actualValue;
      this.formData.subtractValue = afterTaxReport;
      this.formData.displaySubtractValue = percentToSubtract.toFixed(2);
      this.formData.taxValue = this.formData.actualValue - afterTaxReport;
      this.appliedservice.applyData.biddingRate = this.formData.actualValue;
    }
  }


  AppliedJobs() {
    this.dateFormatted = this.datePipe.transform(this.currentDate, 'dd-MM-yyyy');
    this.appliedservice.applyData.applyDate = this.dateFormatted;
    this.appliedservice.applyData.status = 'applied';
    this.appliedservice.applyData.skillSet=this.UserData[0].description ;
    this.appliedservice.applyData.jobTitle = this.JobPost.jobTitle;
    this.appliedservice.applyData.userId = this.UserData[0].id;
    this.appliedservice.applyData.userEmail = this.UserData[0].firstName;
    this.appliedservice.applyData.createdBy = this.UserData[0].firstName;
    this.appliedservice.applyData.jobDescription = this.JobPost.description;
    this.appliedservice.applyData.rate = this.JobPost.toBudget;
    this.appliedservice.applyData.jobId = this.JobPost.id;
    this.appliedservice.applyData.postBy = this.JobPost.createdBy;
    this.appliedservice.applyData.applideUserProfile=this.UserData[0].profileUrl;
    this.appliedservice.applyData.jobUniqueId=this.JobPost.jobUniqueId;
    this.notificationsService.notificationData.userId = this.JobPost.usersId;
    this.dateFormatted = this.datePipe.transform(this.currentDate, 'dd MMM');
    this.notificationsService.notificationData.notificationDate = this.dateFormatted;
    this.notificationsService.notificationData.notification = "Your job applied by " + this.UserData[0].firstName + " (" +this.JobPost.jobUniqueId+")" ;
  }

  //Submit  the form data 
  OnSubmitApply(form: NgForm) {
    if (form.valid && this.jobpostData) {
      this.appliedservice.postApply(form.value).subscribe()
    }
  }

  // Get the Current User Data
  getUserData() {
    const Email = this.userservice.getUserEmail() ?? sessionStorage.getItem('email');
    if (Email) {
      this.userservice.getUserData().subscribe({
        next: (data) => {
          this.UserData = data?.filter((UserData: any) => UserData.email === Email);
          console.log(this.UserData)
        },
        error: (err) => {
          console.error('Error fetching data:', err);
        }
      });
    } else {
    }
  }

  //Characters Left
  onInputChange() {
    this.calculateCharactersLeft();
  }

  private calculateCharactersLeft() {
    this.charactersLeft = this.maxCharacters - this.inputText.length;
  }

  isTextareaDisabled() {
    return this.charactersLeft < 0;
  }

  getCharacterCountClass() {
    return { 'character-limit-exceeded': this.isTextareaDisabled() };
  }

  getPosts() {
    this.route.params.subscribe((params) => {
      const jobUniqueId = params['id'];
      this.jobservice.getJobPostById(jobUniqueId).subscribe(
        (details) => {
          this.JobPost = details;
          this.jobservice.jobData.id = this.JobPost[0].jobUniqueId;
          this.JobPost.forEach((JobPost: any) => {
            if (JobPost.skillSet) {
              JobPost.skillSet = JobPost.skillSet.split(',');
            }
          });
        });
    });
  }

  onChatTargetClick(targetUser: any): void {
    this.chatTarget = targetUser;
  }

  checkbox1: boolean = false;
  checkbox2: boolean = false;

  toggleCheckboxes(): void {
    if (this.checkbox2) {
      this.checkbox1 = true;
    } else {
      this.checkbox1 = false;
    }
  }

  //Notification 
   onSubmitNotification(form: NgForm) {
    if (form.valid && this.notificationsService.notificationData) {
      const userId = this.notificationsService.notificationData.userId; 
      this.notificationsService.postNotification(userId, form.value).subscribe();    }
  }


  @ViewChild('notificationButton') notificationButton: ElementRef;
  
  notifyNow() {
    this.notificationButton.nativeElement.click();
  }

  
  userId =sessionStorage.getItem('authorId')?.toString() || '';
 
  sendNotification() {
    const notificationData = { 
     notification: 'Your job applied by " + this.UserData[0].firstName + " (" +this.JobPost.jobUniqueId+")',
     userId :  this.JobPost.usersId };
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
