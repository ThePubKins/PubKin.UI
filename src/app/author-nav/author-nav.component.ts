import { Component } from '@angular/core';

@Component({
  selector: 'app-author-nav',
  templateUrl: './author-nav.component.html',
  styleUrls: ['./author-nav.component.css']
})
export class AuthorNavComponent {
  hide : boolean;
  hidden() {
    this.hide = !this.hide
  }

}
