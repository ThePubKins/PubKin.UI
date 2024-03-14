import { Component } from '@angular/core';
import { UserauthenticateService } from '../../shared';


@Component({
  selector: 'app-profilesetting',
  templateUrl: './profilesetting.component.html',
  styleUrls: ['./profilesetting.component.scss']
})
export class ProfilesettingComponent {
  selectedButton: string  = "button1";
  User :any;

  constructor( public userauthservice: UserauthenticateService) {  }

  onButtonClick(buttonName: string): void {
    this.selectedButton = buttonName;
  }

  ngOnInit() { 
    this.getUserData();
  }

  getUserData() {
    const Email = this.userauthservice.getUserEmail() ?? sessionStorage.getItem('email');
    if (Email) {
      this.userauthservice.getUserData().subscribe({
        next: (data) => {
          this.User = data?.filter((User: any) => User.email === Email);
        },
      });
    } else {
    }
  }

}
