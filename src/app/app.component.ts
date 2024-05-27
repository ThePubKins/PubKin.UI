import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { PubKinAppModule } from './modules';
import { NgToastModule } from 'ng-angular-popup';
import {  JobpostService, NotificationService, SignalrService } from './shared';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [],
  imports: [CommonModule, RouterOutlet, RouterModule, RouterLink, PubKinAppModule, NgToastModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'pubkin.ui';
  jobUniqueId: any;

   userId = sessionStorage.getItem('authorId')?.toString() || '';
   constructor(private singlarService:SignalrService, private notificationService: NotificationService, public commentService: JobpostService) {
    this.singlarService.startConnection();
    this.singlarService.addNotificationListener(this.userId);  
   }
  
   delay(ms: number) {
     return new Promise( resolve => setTimeout(resolve, ms) );
   }


   
   selectedFile: File | null = null;
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }


    submitComment(): void {
    if (this.selectedFile) {
      const formData: FormData = new FormData();
      formData.append('Id', this.commentService.jobData.id);
      formData.append('DateLastModified', this.commentService.jobData.dateLastModified);
      formData.append('LastModifiedBy', this.commentService.jobData.lastModifiedBy);
      formData.append('DateCreated', this.commentService.jobData.dateCreated);
      formData.append('CreatedBy', this.commentService.jobData.createdBy);
      formData.append('FileName', this.commentService.jobData.fileName);
      formData.append('JobUniqueId', this.commentService.jobData.jobUniqueId);
      formData.append('UsersId', this.commentService.jobData.usersId);
      formData.append('JobTitle', this.commentService.jobData.jobTitle);
      formData.append('Description', this.commentService.jobData.description);   
      formData.append('SkillSet', this.commentService.jobData.skillSet);
      formData.append('Complexity', this.commentService.jobData.complexity);
      formData.append('ProjectStartDate', this.commentService.jobData.projectStartDate);
      formData.append('ProjectEndDate', this.commentService.jobData.projectEndDate);
      formData.append('DurationOfProject', this.commentService.jobData.durationOfProject);
      formData.append('Experience', this.commentService.jobData.experience);
      formData.append('RateBasis', this.commentService.jobData.rateBasis);
      formData.append('FromBudget', this.commentService.jobData.fromBudget);
      formData.append('ToBudget', this.commentService.jobData.toBudget);
      formData.append('Currency', this.commentService.jobData.currency);
      formData.append('UserEmail', this.commentService.jobData.userEmail);
      formData.append('Service', this.commentService.jobData.service);
      formData.append('AttachFile', this.commentService.jobData.attachFile);
      formData.append('PostDate', this.commentService.jobData.postDate);
      formData.append('AttachUrl', this.commentService.jobData.attachUrl);
      formData.append('file', this.selectedFile, this.selectedFile.name);
      formData.append('File', this.selectedFile, this.selectedFile.name);

      this.commentService.postJobPost(formData).subscribe(
        response => {
          console.log('Upload successful', response);
          window.location.reload();
        },
        error => {
          console.error('Upload failed', error);
        }
    
      );
    } else {
      console.error('No file selected');
    }
  }

}