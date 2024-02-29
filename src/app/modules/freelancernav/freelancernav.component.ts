import { Component } from '@angular/core';

@Component({
  selector: 'app-freelancernav',
  templateUrl: './freelancernav.component.html',
  styleUrls: ['./freelancernav.component.css']
})
export class FreelancernavComponent {
hide: any;
selectedButton: any;
  hidden() {
    this.hide = !this.hide
  }

  onButtonClick(buttonName: string): void {
    this.selectedButton = buttonName;
  }
  onLogoutClick(): void {
    // this.authService.logout();
    // this.authService.signOut();
  }
}
