import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppliedUserService, UserauthenticateService } from '../../shared';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.scss']
})
export class CompletedComponent {

  userSkillSet: string = '';
  hide = false;
  searchTerm: string;
  currentUser: any;
  Applies: any;


  constructor(
    public userService: UserauthenticateService,
    public router: Router,
    public appliedService: AppliedUserService) { }


  onSearchChange(event: any) {
    this.searchTerm = event.target.value;
  }

  submitwork : boolean = false;
  submitworks()  { 
     this.submitwork = true;
  } 

  //Jobdetails Component details will be click the fn.
  showJobDetails(jobUniqueId: string): void {
    this.router.navigate(['/comments', jobUniqueId]);
  }


  ngOnInit() {
    this.getUserData(); this.getApplyPosts();
  }

  getUserData() {
    const Email = this.userService.getUserEmail() ?? sessionStorage.getItem('email');
    if (Email) {
      this.userService.getUserData().subscribe({
        next: (data) => {
          this.currentUser = data?.filter((currentUser: any) => currentUser.email === Email);
          console.log(this.currentUser)
        },
        error: (err) => {
          console.error('Error fetching data:', err);
        }
      });
    } else {
    }
  }

  getApplyPosts() {
    this.appliedService.getAppliedUsers().subscribe((posts) => {
      this.Applies = posts;
    });
  }



}
