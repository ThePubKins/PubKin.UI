import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { CommentsService, JobpostService, NotificationService, UserauthenticateService, WorkfileService, Comment, workfile, AppliedUserService } from '../../shared';
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
  dateFormatted1: any;
  commentData: Comment = {} as Comment;
  workfileData: workfile = {} as workfile;
  workFile: any;
  comments: any;
  hideFolderIcon: boolean = false;
  viewwork: boolean = false;
  submitwork: boolean = false;
  selectedFile: File | null = null;
  selectedFiles: string[] = [];
  selectedFiles1: string[] = [];
  User: any;
  imageUrl: string = 'https://localhost:7172';
  jobPosts: any;
  uploadedFileName: string = ''; 
  notificationData:any;
  applies: import("d:/Sathish Software/ThePubkins/ThePubkins-UI/src/app/shared/index").applied_user[];

  constructor(private route: ActivatedRoute, public datePipe: DatePipe,public notificationsService : NotificationService, public userauthservice: UserauthenticateService,
    public appliedService:AppliedUserService,public jobservice: JobpostService, private router: Router, public commentService: CommentsService, public workfileservice: WorkfileService) { }

  @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement>;

  ngOnInit() {
    this.getPosts();
    this.getWorkFiles();
    this.getUserData();
    this.getJobPosts();
    this.getCommentNow();
    this.showCommentDetails();
  }

  submitworks() {
    this.submitwork = true;
  }

  showViewedWork() {
    this.viewwork = true;
  }
  filterCommentsWithFileUrl(comments: any[]): any[] {
    return comments.filter(comment => comment.fileUrl && comment.fileUrl.trim() !== '');
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

  UploadFileName(event:any) {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0];
    this.uploadedFileName = file ? file.name : ''; 
  }
  

  getapplies() {
    this.appliedService.getAppliedUsers().subscribe((data) => {
      this.applies = data;
    });
  }

  ChangeStatus() {
    this.jobPosts[0].status = "completed";
  }


  onSubmitStatus(form: NgForm) {
    if (form.valid && this.appliedService.applyData) {
      this.appliedService.PutStatus(form.value).subscribe();
    }
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
   
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }


    submitComment(): void {
    if (this.selectedFile) {
      const formData: FormData = new FormData();
      formData.append('FileName', this.commentService.commentData.FileName);
      formData.append('DateLastModified', this.commentService.commentData.DateLastModified);
      formData.append('FileUrl', this.commentService.commentData.FileUrl);
      formData.append('Comments', this.commentService.commentData.Comments);
      formData.append('LastModifiedBy', this.commentService.commentData.LastModifiedBy);
      formData.append('JobId', this.commentService.commentData.JobId);
      formData.append('CommentDateTime', this.commentService.commentData.CommentDateTime);
      formData.append('DateCreated', this.commentService.commentData.DateCreated);
      formData.append('Id', this.commentService.commentData.Id);
      formData.append('file', this.selectedFile, this.selectedFile.name);
      formData.append('File', this.selectedFile, this.selectedFile.name);
      formData.append('CreatedBy', this.commentService.commentData.CreatedBy);

      this.commentService.postComments(formData).subscribe(
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


  
  onSubmitWorkFiles(): void {
    if (this.selectedFile) {
      const formData1: FormData = new FormData();
      formData1.append('Id', "0e74a6a1-ad35-4ded-977a-069546c32345");
      formData1.append('FileName', this.workfileservice.fileData.FileName);
      formData1.append('FileUrl', this.workfileservice.fileData.FileUrl);
      formData1.append('JobId', this.workfileservice.fileData.JobId);
      formData1.append('UserId', this.workfileservice.fileData.UserId);
      formData1.append('file', this.selectedFile, this.selectedFile.name);
      formData1.append('File', this.selectedFile, this.selectedFile.name);

      this.workfileservice.postFile(formData1).subscribe(
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



  openFileUploadDialog() {
    this.fileInput.nativeElement.click();
  }


  showWorkDetails() {
    // this.dateFormatted = this.datePipe.transform(this.currentDate, 'dd-MM-yyyy');
    // this.workfileData.CreateDate = this.dateFormatted;
    this.workfileservice.fileData.JobId = this.jobPost.id;
    this.workfileservice.fileData.FileUrl = 'Hello';
    this.workfileservice.fileData.UserId = 'KarthiKeyan';
  }


  showCommentDetails() {
    this.dateFormatted = this.datePipe.transform(this.currentDate, 'MMM dd hh:mma');
    this.commentService.commentData.CommentDateTime = this.dateFormatted;
    this.commentService.commentData.JobId = this.jobPost.id;
    this.commentService.commentData.Id = this.jobPost.id;
    this.commentService.commentData.DateLastModified = "0001-01-01 00:00:00";
    this.commentService.commentData.DateCreated = "0001-01-01 00:00:00";
    this.commentService.commentData.CreatedBy = this.User[0].firstName;
    this.notificationsService.notificationData.userId = this.jobPost.userId;
    this.dateFormatted1 = this.datePipe.transform(this.currentDate, 'dd MMM');
    this.notificationsService.notificationData.notificationDate = this.dateFormatted1;
    this.notificationsService.notificationData.notification = "New Comment arrived for "  +this.jobPost.jobUniqueId;
  }

  showWorkNotification() {
    this.notificationsService.notificationData.userId = this.jobPost.userId;
    this.dateFormatted1 = this.datePipe.transform(this.currentDate, 'dd MMM');
    this.notificationsService.notificationData.notificationDate = this.dateFormatted1;
    this.notificationsService.notificationData.notification = "New work file submitted for "  +this.jobPost.jobUniqueId + " by " + this.User[0].firstName;
  }

  showReWorkNotification() {
    this.notificationsService.notificationData.userId = this.jobPost.userId;
    this.dateFormatted1 = this.datePipe.transform(this.currentDate, 'dd MMM');
    this.notificationsService.notificationData.notificationDate = this.dateFormatted1;
    this.notificationsService.notificationData.notification = "Rework needed for "  +this.jobPost.jobUniqueId + " by " + this.jobPost.createdBy;
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


   //Sorting the Comments
  getCommentNow() {
    this.commentService.getComments().subscribe(data => {
      this.comments = data;
      this.comments.sort((a: { commentDateTime: string; }, b: { commentDateTime: string; }) => {
        const dateA = this.parseCustomDate(a.commentDateTime).getTime();
        const dateB = this.parseCustomDate(b.commentDateTime).getTime();
        return dateA - dateB; 
      });
    });
  }
  
  parseCustomDate(dateString: string): Date {
    const parts = dateString.split(' ');
    const monthAbbrev = parts[0];
    const day = parseInt(parts[1]);
    const timeParts = parts[2].split(':');
    let hours = parseInt(timeParts[0]);
    const minutes = parseInt(timeParts[1].slice(0, 2));
    const ampm = timeParts[1].slice(2);

    // Convert to 24-hour format
    if (ampm === 'PM' && hours < 12) {
      hours += 12;
    } else if (ampm === 'AM' && hours === 12) {
      hours = 0;
    }

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames.indexOf(monthAbbrev);

    return new Date(0, 0, day, hours, minutes);
  }

  //Notifications Form 
  onSubmitNotification(form: NgForm, userId:string) {
    if (form.valid && this.notificationsService.notificationData) {
      this.notificationsService.postNotification(userId, form.value).subscribe();
    }
  }


  @ViewChild('notificationButton') notificationButton: ElementRef;
  
  notifyNow() {
    this.notificationButton.nativeElement.click();
  }
 
}
