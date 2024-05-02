import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})

export class ExampleComponent {
  commentData = {
    FileName: '',
    DateLastModified: '',
    FileUrl: '',
    Comments: '',
    LastModifiedBy: '',
    JobId: '',
    CommentDateTime: '',
    DateCreated: '',
    Id: '',
    File: null as any  // Adjusted to explicitly set it as a File type
  };

  constructor(private http: HttpClient) {}

  submitComment(form: NgForm) {
    const formData = new FormData();
    formData.append('FileName', this.commentData.FileName);
    formData.append('DateLastModified', this.commentData.DateLastModified);
    formData.append('FileUrl', this.commentData.FileUrl);
    formData.append('Comments', this.commentData.Comments);
    formData.append('LastModifiedBy', this.commentData.LastModifiedBy);
    formData.append('JobId', this.commentData.JobId);
    formData.append('CommentDateTime', this.commentData.CommentDateTime);
    formData.append('DateCreated', this.commentData.DateCreated);
    formData.append('Id', this.commentData.Id);
    formData.append('File', this.commentData.File, this.commentData.File.name); // Add file with filename

    this.http.post('https://localhost:7172/api/1.0/Comment', formData)
      .subscribe(response => {
        console.log('Comment submitted successfully:', response);
        // Reset form after successful submission if needed
        form.resetForm();
      }, error => {
        console.error('Error submitting comment:', error);
      });
  }

  onFileSelected(event:any) {
    this.commentData.File = event.target.files[0];
  }

}





