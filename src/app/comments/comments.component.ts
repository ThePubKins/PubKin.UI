import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobpostService } from '../Service/jobpost.service';
import { NgForm } from '@angular/forms';
import { CommentsService } from '../Service/comments.service';
import { DatePipe } from '@angular/common';
import { comments } from '../Service/comments.model';
import { workfile } from '../Service/workfile.model';
import { WorkfileService } from '../Service/workfile.service';
import { FileuploadService } from '../Service/fileupload.service';
import { UserauthenticateService } from '../Service/userauthenticate.service';
@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  jobPost: any;
  Freelancers: any;
  currentDate: Date = new Date();
  dateFormatted: any;
  commentData = new comments();
  workfileData = new workfile();
  workFile : any;
  comments: any;
  hideFolderIcon: boolean = false;
  viewwork: boolean = false;
  submitwork: boolean = false;
  selectedFiles: string[] =[ ];
  selectedFiles1: string[] = [];
  User :any;
  imageUrl: string = 'https://localhost:7172';
  
  constructor(private route: ActivatedRoute, public datePipe: DatePipe, public userauthservice :UserauthenticateService,
    public jobservice: JobpostService, private router: Router, public commentservice: CommentsService, public workfileservice: FileuploadService) { }

  @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement>;

  ngOnInit() {
    this.getPosts();
    this.getCommentNow();
    this.getWorkFiles();
    this.getUserData();
  }

  submitworks() {
    this.submitwork = true;
  }

  showViewedWork() {
    this.viewwork = true;
  }

  getPosts() {
    this.route.params.subscribe((params) => {
      const jobId = params['id'];
      this.jobservice.getJobDetails(jobId).subscribe(
        (details) => {
          this.jobPost = details;
          this.jobPost.forEach((jobPost: any) => {
            jobPost.skillSet = jobPost.skillSet.split(',');
          });
        });
    });
  }

  hideFolder() {
    this.hideFolderIcon = true;
  }

  getCommentNow() {
    this.commentservice.getcomment().subscribe(data => {
      this.comments = data;
    });
  }

  getWorkFiles() {
    this.workfileservice.getFiles().subscribe(data => {
      this.workFile = data;
    });
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
  submitForm() {
    const formData = new FormData();
    formData.append('JobId', this.commentData.JobId);
    formData.append('Comments', this.commentData.Comments);
    formData.append('CreatedBy', this.commentData.CreatedBy);
    if (this.commentData.File) {
      formData.append('File', this.commentData.File);
    }

    this.commentservice.postComment(formData).subscribe(
      response => {
        console.log('Comment added successfully:', response);
        this.commentData = new comments();
      },
      error => {
        console.error('Error adding comment:', error);
      }
    );
  }

  submitform1() {
    const formData1 = new FormData();
    formData1.append('FileId', this.workfileData.FileId);
    formData1.append('FileName', this.workfileData.FileName);
    formData1.append('FileUrl', this.workfileData.FileUrl);
    formData1.append('JobId', this.workfileData.JobId);
    formData1.append('UserId', this.workfileData.UserId);

    if (this.workfileData.FileUrl) {
      formData1.append('File', this.workfileData.File);
    }

    this.workfileservice.postFiles(formData1).subscribe(
      response => {
        console.log('Comment added successfully:', response);
        this.workfileData = new workfile();
      },
      error => {
        console.error('Error adding comment:', error);
      }
    );
  }
  


  openFileUploadDialog() {
    this.fileInput.nativeElement.click();
  }
  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
    this.selectedFiles.push(selectedFile.name);
    this.commentData.File = selectedFile;
    this.workfileData.FileName =  selectedFile.name;
  }
  
  onFileSelected1(event: any) {
    const selectedFile = event.target.files[0];
    this.selectedFiles1.push(selectedFile.name);
    this.workfileData.File = selectedFile;
  }

  showWorkDetails() {
    // this.dateFormatted = this.datePipe.transform(this.currentDate, 'dd-MM-yyyy');
    // this.workfileData.CreateDate = this.dateFormatted;
    this.workfileData.JobId = this.jobPost.jobId;
    this.workfileData.FileUrl = 'Hello'
    this.workfileData.UserId = 'KarthiKeyan';
  }


  showDetails() {
    this.dateFormatted = this.datePipe.transform(this.currentDate, 'dd-MM-yyyy');
    this.commentData.CreateDate = this.dateFormatted;
    this.commentData.JobId = this.jobPost.jobId;
    this.commentData.CreatedBy = 'KarthiKeyan';
  }

  getPostStatus(postDate: string): string {
    const today = new Date();
    const parts = postDate.split('-');
    const post = new Date(+parts[2], +parts[1] - 1, +parts[0]);
    const diffTime = today.getTime() - post.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24) - 1);
    const diffMonths = (today.getFullYear() - post.getFullYear()) * 12 + (today.getMonth() - post.getMonth());
    const diffYears = today.getFullYear() - post.getFullYear();

    console.log(diffDays)

    if (diffDays === 0) {
      return 'at Today';
    } else if (diffDays === 1) {
      return '1 day ago';
    } else if (diffDays <= 6) {
      return diffDays + ' days ago';
    } else if (diffDays <= 13) {
      return '1 week ago';
    } else if (diffDays <= 20) {
      return '2 weeks ago';
    } else if (diffDays <= 27) {
      return '3 weeks ago';
    } else if (diffMonths === 1) {
      return '1 month ago';
    } else if (diffMonths > 1 && diffMonths < 12) {
      return diffMonths + ' months ago';
    } else if (diffYears === 1) {
      return '1 year ago';
    } else {
      return diffYears + ' years ago';
    }
  }
}
