import { Component, OnInit } from '@angular/core';
import { UserauthenticateService } from '../../shared/services/userauthenticate.service';

@Component({
  selector: 'app-author-nav',
  templateUrl: './author-nav.component.html',
  styleUrls: ['./author-nav.component.scss']
})
export class AuthorNavComponent implements OnInit{
  hide : boolean;
  User : any;
  
  hidden() {
    this.hide = !this.hide
  }
  constructor(public userauthservice:UserauthenticateService) {}
  ngOnInit(): void {
   this.getUserData();
  }
  
  //get the Current User Details
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
