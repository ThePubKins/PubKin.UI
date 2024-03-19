import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { CommentsService, JobpostService, UserauthenticateService, WorkfileService, comments, workfile } from '../../shared';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  jobPost: any;
  Freelancers: any;
  currentDate: Date = new Date();
  dateFormatted: any;
  commentData: comments = {} as comments;
  workfileData: workfile = {} as workfile;
  workFile: any;
  comments: any;
  hideFolderIcon: boolean = false;
  viewwork: boolean = false;
  submitwork: boolean = false;
  selectedFiles: string[] = [];
  selectedFiles1: string[] = [];
  User: any;
  imageUrl: string = 'https://localhost:7172';
  jobPosts: any;

  constructor(private route: ActivatedRoute, public datePipe: DatePipe, public userauthservice: UserauthenticateService,
    public jobservice: JobpostService, private router: Router, public commentservice: CommentsService, public workfileservice: WorkfileService) { }

  @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement>;

  ngOnInit() {
    this.getPosts();
    this.getCommentNow();
    this.getWorkFiles();
    this.getUserData();
    this.getJobPosts();
    this.getCommentNow();
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
      this.jobservice.getJobPostById(jobId).subscribe(
        (details) => {
          this.jobPost = details;
          this.jobPost.forEach((jobPost: any) => {
            jobPost[0].skillSet = jobPost[0].skillSet.split(',');
          });
        });
    });
  }


  selectedFile: File | null = null;

  onFileSelected12(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  selectFile() {
    document.getElementById('fileInput')?.click();
  }

  hideFolder() {
    this.hideFolderIcon = true;
  }

  getCommentNow() {
    this.commentservice.getComments().subscribe(data => {
      this.comments = data;
      this.comments.sort((a: { commentDateTime: string | number | Date; }, b: { commentDateTime: string | number | Date; }) => {
        const dateA = new Date(a.commentDateTime);
        const dateB = new Date(b.commentDateTime);
        return dateA.getTime() - dateB.getTime();
      });
    });
  }
  
  getWorkFiles() {
    this.workfileservice.getfile().subscribe(data => {
      this.workFile = data;
    });
  }


  onSubmitJobStatus(form: NgForm) {
    if (form.valid && this.jobservice.jobData) {
      this.jobservice.JobStatus(form.value).subscribe();
    }
  }

  getJobPosts() {
    this.jobservice.getJobPost().subscribe((data) => {
      this.jobPosts = data;
    });
  }

  ChangeStatus() {
    this.jobPosts[0].status = "completed";
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
  submitForm(form: NgForm) {
    // const formData = new FormData();
    // formData.append('id', this.commentData.id);
    // formData.append('Comments', this.commentData.Comments);
    // formData.append('createdBy', this.commentData.createdBy);
    // if (this.commentData.File) {
    //   formData.append('File', this.commentData.File);
    // }

    // this.commentservice.postComments(formData).subscribe(
    //   response => {
    //     console.log('Comment added successfully:', response);
    //     this.commentData = {} as comments;
    //   },
    //   error => {
    //     console.error('Error adding comment:', error);
    //   }
    // );

    if (form.valid && this.commentservice.commentData) {
      this.commentservice.postComments(form.value).subscribe();
      setTimeout(() => {
        window.location.reload();
      }, 50);
    }
  }

  submitform1() {
    const formData1 = new FormData();
    formData1.append('Id', this.workfileData.id);
    formData1.append('FileName', this.workfileData.FileName);
    formData1.append('FileUrl', this.workfileData.FileUrl);
    formData1.append('JobId', this.workfileData.JobId);
    formData1.append('UserId', this.workfileData.UserId);

    if (this.workfileData.FileUrl) {
      formData1.append('File', this.workfileData.File);
    }

    this.workfileservice.postFile(formData1).subscribe(
      response => {
        console.log('Comment added successfully:', response);
        this.workfileData = {} as workfile;
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
    console.log('Selected file:', selectedFile);
    this.selectedFiles.push(selectedFile.name);
    console.log('Selected files array:', this.selectedFiles);
    this.commentData.File = selectedFile;
    this.workfileData.FileName = selectedFile.name;
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
    this.dateFormatted = this.datePipe.transform(this.currentDate, 'MMM dd hh:mma');
    this.commentData.commentDateTime = this.dateFormatted;
    this.commentData.jobId = this.jobPost.id;
    this.commentData.createdBy = this.User[0].firstName;
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
