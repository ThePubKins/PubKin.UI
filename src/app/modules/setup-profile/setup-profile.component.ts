import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserauthenticateService } from '../Service/userauthenticate.service';

@Component({
  selector: 'app-setup-profile',
  templateUrl: './setup-profile.component.html',
  styleUrls: ['./setup-profile.component.css']
})
export class SetupProfileComponent {
  contentName: string | null = null;
  UserData : any;

  constructor(private route: ActivatedRoute, public userService: UserauthenticateService){}
  
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


}
