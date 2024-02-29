import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private router: Router) { }

  user1  = "'author'";
  hide = false;
  hide1() {
    this.hide = !this.hide
  }

  navigateToProfile(action: string): void {
    this.router.navigate(['/signup', action]);
  }

}