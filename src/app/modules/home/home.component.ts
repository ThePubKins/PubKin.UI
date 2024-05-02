import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit, inject } from "@angular/core";
import { Router } from "@angular/router";
import { HttpHeaders } from "@angular/common/http";
import { CommentsService, Comment } from "../../shared";
import { NgForm } from "@angular/forms";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent {
  constructor(
    private router: Router,
    public http: HttpClient,
    public commentService: CommentsService,
    private datePipe: DatePipe
  ) {}

  user1 = "'author'";
  hide = false;

  hide1() {
    this.hide = !this.hide;
  }

  navigateToProfile(action: string): void {
    this.router.navigate(["/signup", action]);
  }

  navigateToPubkin(content: string): void {
    this.router.navigate(["/docs", content]);
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // onSubmit(form: NgForm) {
  //   if (form.valid && this.commentService.commentData) {
  //     const headers = new HttpHeaders();
  //     headers.set('Content-Type', 'multipart/form-data');
  //     this.commentService.commentData.dateCreated = this.datePipe.transform(this.commentService.commentData.dateCreated, 'yyyy-MM-ddTHH:mm:ss');
  //     this.commentService.addComment(this.commentService.commentData, headers).subscribe();
  //     console.log(form)
  //   }
  // }

  // onSubmit(form: NgForm) {
  //   if (form.valid && this.commentService.commentData) {
  //     this.commentService.commentData.dateCreated = this.datePipe.transform(
  //       this.commentService.commentData.dateCreated, "yyyy-MM-ddTHH:mm:ss");

  //     const formData = new FormData();
  //     formData.append(
  //       "commentDateTime",
  //       this.commentService.commentData.commentDateTime
  //     );
  //     formData.append("createdBy", this.commentService.commentData.createdBy);
  //     formData.append("jobId", this.commentService.commentData.jobId);
  //     formData.append("comments", this.commentService.commentData.Comments);

  //     if (this.commentService.commentData.file) {
  //       formData.append("file", this.commentService.commentData.file);
  //     }

  //     const headers = new HttpHeaders();

  //     this.commentService
  //       .addComment(this.commentService.commentData, headers)
  //       .subscribe(
  //         (response) => {
  //           console.log("Response from server:", response);
  //         },
  //         (error) => {
  //           console.error("Error occurred:", error);
  //         }
  //       );
  //   }
  // }

  onSubmit(form: NgForm) {
    if (form.valid && this.commentService.commentData) {
      this.commentService.commentData.dateCreated = this.datePipe.transform(
        this.commentService.commentData.dateCreated, "yyyy-MM-ddTHH:mm:ss");
  
      const formData = new FormData();
      formData.append("commentDateTime", this.commentService.commentData.commentDateTime);
      formData.append("createdBy", this.commentService.commentData.createdBy);
      formData.append("jobId", this.commentService.commentData.jobId);
      formData.append("comments", this.commentService.commentData.Comments);
      formData.append("fileName", this.commentService.commentData.fileName);
  
      if (this.commentService.commentData.file) {
        formData.append("file", this.commentService.commentData.file, this.commentService.commentData.fileName);
      }
  
      const headers = new HttpHeaders();
          headers.set('Content-Type', 'multipart/form-data');
      
          this.commentService
        .addComment(this.commentService.commentData, headers)
        .subscribe(
          (response) => {
            console.log("Response from server:", response);
          },
          (error) => {
            console.error("Error occurred:", error);
          }
        );
    }
  }

  onFileSelected(event: any): void {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      this.commentService.commentData.file = selectedFile;
      this.commentService.commentData.fileName = selectedFile.name; 
    }
  }


  
}
