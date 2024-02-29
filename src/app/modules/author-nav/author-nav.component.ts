import { Component } from '@angular/core';

@Component({
  selector: 'app-author-nav',
  templateUrl: './author-nav.component.html',
  styleUrls: ['./author-nav.component.scss']
})
export class AuthorNavComponent {
  hide : boolean;
  hidden() {
    this.hide = !this.hide
  }

}
