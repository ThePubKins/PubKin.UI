import { Component } from '@angular/core';
import { UserService } from '../../../shared';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent {
  constructor(public userservice: UserService) {
    this.userservice.userData.id = "9c268f74-fcab-4f5a-b802-4f957bb35f5a";
  }

  
  onSubmitPassword(form: NgForm) {
    if (form.valid && this.userservice.userData) {
      this.userservice.UpdatePassword(form.value).subscribe();
    }
  }  

}
