import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent  {
  
  constructor(private router: Router) { }

  user1  = "'author'";
  hide = false;

  hide1() {
    this.hide = !this.hide
  }
  
  navigateToProfile(action: string): void {
    this.router.navigate(['/signup', action]);
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });}

    selectedOption: string = '1'; // Default selection

    // Make sure to include FormsModule in your module imports array.
    
    // If you want to handle changes on dropdown selection:
    onSelectionChange(event: Event) {
      // You can handle the selection change event h


}
}