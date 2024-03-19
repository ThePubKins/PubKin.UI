import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { AppliedUserService, CommentsService, JobpostService, UserauthenticateService, applied_user } from '../../shared';


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
  constructor(public datePipe: DatePipe, private route: ActivatedRoute,
  public userservice: UserauthenticateService, public commentservice: CommentsService,
    public appliedservice: AppliedUserService, public jobservice: JobpostService,public router: Router) { this.calculateCharactersLeft(); }

  ngOnInit(): void {
    this.getPosts(); this.getUserData();
    const initialChatTarget = null;
    this.onChatTargetClick(initialChatTarget);
  }


  onSubmitApply(form: NgForm) {
    if (this.appliedservice.applyData) {
      this.appliedservice.postApply(form.value).subscribe();
    }
  }



  submitForm() {
    const formData = new FormData();
    formData.append('dateCreated', this.jobpostData.dateCreated);
    formData.append('userId', this.jobpostData.userId);
    formData.append('jobId', this.jobpostData.jobId);
    formData.append('skillSet', this.jobpostData.skillSet);
    formData.append('applyCoverLetter', this.jobpostData.applyCoverLetter);
    formData.append('biddingRate', this.jobpostData.biddingRate.toString());
    formData.append('userEmail', this.jobpostData.userEmail);
    formData.append('status', this.jobpostData.status);
    formData.append('id', this.jobpostData.id);
    formData.append('jobTitle', this.jobpostData.jobTitle);
    formData.append('jobDescription', this.jobpostData.jobDescription);
    formData.append('rate', this.jobpostData.rate);
    formData.append('postBy', this.jobpostData.postBy);
    formData.append('fileUrl', this.jobpostData.fileUrl);
    if (this.jobpostData.AttachFile) {
      formData.append('AttachFile', this.jobpostData.AttachFile);
    }

    this.appliedservice.postApply(formData).subscribe(
      response => {
        console.log('Comment added successfully:', response);
        this.jobpostData = {} as applied_user;
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
}
