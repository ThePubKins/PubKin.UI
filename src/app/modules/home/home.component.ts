import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { CommentsService } from "../../shared";
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

  selectedFile: File | null = null;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // submitComment(commentForm: NgForm) {
  //   const formData: FormData = new FormData();
  //   formData.append('FileName', commentForm.value.FileName);
  //   formData.append('DateLastModified', commentForm.value.DateLastModified);
  //   formData.append('FileUrl', commentForm.value.FileUrl);
  //   formData.append('Comments', commentForm.value.Comments);
  //   formData.append('LastModifiedBy', commentForm.value.LastModifiedBy);
  //   formData.append('JobId', commentForm.value.JobId);
  //   formData.append('CommentDateTime', commentForm.value.CommentDateTime);
  //   formData.append('DateCreated', commentForm.value.DateCreated);
  //   formData.append('Id', commentForm.value.Id);
  //   if (this.selectedFile) {
  //     formData.append('file', this.selectedFile);
  //   }
  //   formData.append('CreatedBy', commentForm.value.CreatedBy);

  //   this.commentService.submitComment(formData)
  //     .subscribe(
  //       (response) => {
  //         console.log('Comment submitted successfully: ', response);
  //       },
  //       (error) => {
  //         console.error('Error submitting comment: ', error);
  //       }
  //     );
  // }

}
