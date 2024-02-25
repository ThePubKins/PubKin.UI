import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-freeprofile',
  templateUrl: './freeprofile.component.html',
  styleUrls: ['./freeprofile.component.css']
})
export class FreeprofileComponent implements OnInit {
  Freelancers: any;
  Author: any;


  images=[
  
    {img_url:'/assets/avd1.png'},
    {img_url:'/assets/avd2.png'},
    {img_url:'/assets/avd3.png'},
    {img_url:'/assets/avd4.png'},
    {img_url:'/assets/avd5.png'},
    {img_url:'/assets/avd6.png'},
    {img_url:'/assets/avd7.png'},
    {img_url:'/assets/avd8.png'}
  ]

  
  selectedImage: string | null = null;
  
  selectImage(image: any) {
    this.selectedImage = image.img_url;
  }
  
  selectedImage2: string | null = null;
  saveChanges(){
   this.selectedImage2 = this.selectedImage

  }

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
    const progress = this.Freelancers[0].ProfilePercentage;

    if (progress < 35) {
      return '#666666'; 
    } else if (progress < 80) {
      return '#333333'; 
    } 
    else {
      return '#000000';
    }
  }
  
  GoNext: string  = "";
  GoNextBtn(GoBtnName: string): void {
    this.GoNext = GoBtnName;
  }
 
}
