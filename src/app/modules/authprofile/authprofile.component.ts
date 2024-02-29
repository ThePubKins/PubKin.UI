import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';


@Component({
  selector: 'app-authprofile',
  templateUrl: './authprofile.component.html',
  styleUrls: ['./authprofile.component.scss']
})
export class AuthprofileComponent implements OnInit {
  Author: any;
  
  ngOnInit(): void {
  }

  @ViewChild('fileInput')
  fileInput!: ElementRef;

  openFileExplorer() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
    console.log('Selected File:', selectedFile);
  }

  getProgressBarColor(): string {
    const progress = this.Author[0].ProfilePercentage;

    if (progress < 40) {
      return '#666666'; 
    } else if (progress < 80) {
      return '#333333'; 
    } 
    else {
      return '#000000';
    }
  }


}
