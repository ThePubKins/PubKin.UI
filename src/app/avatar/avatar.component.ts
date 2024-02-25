import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent {
  
  // @Output() imageSelected: EventEmitter<string> = new EventEmitter<string>();
  // images=[
  
  //   {img_url:'/assets/avd1.png'},
  //   {img_url:'/assets/avd2.png'},
  //   {img_url:'/assets/avd3.png'},
  //   {img_url:'/assets/avd4.png'},
  //   {img_url:'/assets/avd5.png'},
  //   {img_url:'/assets/avd6.png'},
  //   {img_url:'/assets/avd7.png'},
  //   {img_url:'/assets/avd8.png'}
  // ]

  
  // selectedImage: string | null = null;
  
  // selectImage(image: any) {
  //   this.selectedImage = image.img_url;
  //   this.imageSelected.emit(this.selectedImage);
  // }
  
  // saveChanges() {
  //   this.selectedImage2 = this.selectedImage;
  //   this.imageSelected.emit(this.selectedImage2);
  // }
  

}
