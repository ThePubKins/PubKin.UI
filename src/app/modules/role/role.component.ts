import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserauthenticateService } from '../../shared';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent {

  UserData: any;
  constructor(private router: Router,
    public userservice: UserauthenticateService) { }


  ngOnInit() {
    this.getUserData();
  }

  getUserData() {
    const Email = this.userservice.getUserEmail() ?? sessionStorage.getItem('email');
    if (Email) {
      this.userservice.getUserData().subscribe({
        next: (data) => {
          this.UserData = data?.filter((UserData: any) => UserData.email === Email);
          console.log(this.UserData)
          this.navigateBasedOnRole();

        },
        error: (err) => {
          console.error('Error fetching data:', err);
        }
      });
    } else {
    }
  }

  navigateBasedOnRole() {
    if (this.UserData && this.UserData.length > 0) {
      const role = this.UserData[0].role;
      if (role === 'freelancer') {
        this.router.navigate(['/freelancers']);
      } else if (role === 'author') {
        this.router.navigate(['/authors']);
      } else {
        
      }
    }
  }
}
