import { Component } from '@angular/core';
import { UserService } from '../../../shared';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent {
  constructor(public userservice: UserService) {}


  onSubmitPassword(form: NgForm) {
    if (form.valid && this.userservice.userData) {
      this.userservice.UpdatePassword(form.value).subscribe();
    }
  }  

}
