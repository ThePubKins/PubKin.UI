import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FirebaseAuthService } from '../Service/firebaseauth.service';
import { UserService } from '../Service/messgaeuser.service';
import { DatePipe } from '@angular/common';
import { UserauthenticateService } from '../Service/userauthenticate.service';
import { AppliedUserService } from '../Service/applied-user.service';
import { JobpostService } from '../Service/jobpost.service';
import { CommentsService } from '../Service/comments.service';
import { comments } from '../Service/comments.model';
import { applied_user } from '../Service/applied-user.model';
@Component({
  selector: 'app-apply-now',
  templateUrl: './apply-now.component.html',
  styleUrls: ['./apply-now.component.css']
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
  dateFormatted :any;
  success : boolean =true;

  jobpostData = new applied_user;
  filesdetails : any;
  constructor(public datePipe: DatePipe, private userService: UserService, private route: ActivatedRoute,
    public authService: FirebaseAuthService, public userservice: UserauthenticateService,public commentservice: CommentsService,
    public appliedservice: AppliedUserService, public jobservice : JobpostService) {this.calculateCharactersLeft(); }

  ngOnInit(): void {
    this.getPosts(); this.getUserData();
    const initialChatTarget = null;
    this.onChatTargetClick(initialChatTarget);
  }
  submitForm() {
    const formData = new FormData();
    formData.append('createDate', this.jobpostData.createDate);
    formData.append('userId', this.jobpostData.userId);
    formData.append('jobId', this.jobpostData.jobId);
    formData.append('skillSet', this.jobpostData.skillSet);
    formData.append('applyCoverLetter', this.jobpostData.applyCoverLetter);
    formData.append('biddingRate', this.jobpostData.biddingRate.toString());
    formData.append('userEmail', this.jobpostData.userEmail);
    formData.append('status', this.jobpostData.status);
    formData.append('applyId', this.jobpostData.applyId);
    formData.append('jobTitle', this.jobpostData.jobTitle);
    formData.append('jobDescription', this.jobpostData.jobDescription);
    formData.append('rate', this.jobpostData.rate);
    formData.append('postBy', this.jobpostData.postBy);
    formData.append('FileUrl', this.jobpostData.FileUrl);
    if (this.jobpostData.AttachFile) {
      formData.append('AttachFile', this.jobpostData.AttachFile);
    }

    this.appliedservice.postApply(formData).subscribe(
      response => {
        console.log('Comment added successfully:', response);
        this.jobpostData = new applied_user();
      }
    );
  }
  uploadedFileName: string = ''; 
  selectedFiles: string[] = [];
  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
    this.selectedFiles.push(selectedFile.name);
    this.jobpostData.AttachFile = selectedFile;
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0];
    this.uploadedFileName = file ? file.name : ''; 
  }

  SuccessModal() { 
     this.success = false;
     setTimeout(() => {
      this.success = false;
    }, 3000);
  }

  formData = {
    actualValue: null as number | null,
    subtractValue: 2,
    displaySubtractValue: '2%',
  };

  calculateResult(): void {
    if (this.formData.actualValue !== null) {
      const percentToSubtract = (2 / 100) * this.formData.actualValue;
      const afterTaxReport = (4 / 100) * this.formData.actualValue;
      this.formData.subtractValue = afterTaxReport;
      this.formData.displaySubtractValue = percentToSubtract.toFixed(2);
      this.jobpostData.biddingRate = this.formData.actualValue - afterTaxReport;
    }
  }

  AppliedJobs() {  
    this.dateFormatted = this.datePipe.transform(this.currentDate, 'dd-MM-yyyy');  
    this.jobpostData.createDate = this.dateFormatted;
    this.jobpostData.status= 'applied';
    this.jobpostData.jobTitle = this.JobPost.jobTitle;
    this.jobpostData.userId = this.UserData[0].userId;
    this.jobpostData.userEmail = this.UserData[0].firstName;
    this.jobpostData.jobDescription = this.JobPost.description;
    this.jobpostData.rate = this.JobPost.toBudget;
    this.jobpostData.jobId = this.JobPost.jobId;
    this.jobpostData.postBy = this.JobPost.createdBy;
    this.jobpostData.skillSet = this.JobPost.skillSet;
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
      this.jobservice.getJobDetails(jobUniqueId).subscribe(
        (details) => {
          this.JobPost = details;
          this.jobservice.jobData.jobId = this.JobPost[0].jobUniqueId;
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

  sendFriendRequest(targetUser: any): void {
    const senderId = this.user.uid;
    console.log(senderId);
    const receiverId = targetUser.uid;
    this.userService.sendFriendRequest(senderId, receiverId)
      .then(() => {
        console.log('Friend request sent successfully');
      })
      .catch(error => {
        console.error('Error sending friend request:', error);
      });
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
}
