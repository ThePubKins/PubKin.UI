import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService, UserauthenticateService } from '../../shared';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-setup-profile',
  templateUrl: './setup-profile.component.html',
  styleUrls: ['./setup-profile.component.scss']
})
export class SetupProfileComponent {
  contentName: string | null = null;
  UserData : any;

  constructor(private route: ActivatedRoute, public userService: UserauthenticateService,public userservice1:UserService){}
  
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.contentName = params['name'];
    });
    this.getUserData();
  }


  getUserData() {
    const Email = this.userService.getUserEmail() ?? sessionStorage.getItem('email');
    if (Email) {
      this.userService.getUserData().subscribe({
        next: (data) => {
          this.UserData = data?.filter((UserData:any) => UserData.email === Email);
        }
      });
    } else {
    }
  }
  onSubmitpresonal(form: NgForm) {
    if (this.userservice1.userData) {
      this.userservice1.putPersonalData(form.value).subscribe();
    }
  }

}
