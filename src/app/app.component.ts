import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { PubKinAppModule } from './modules';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [],
  imports: [CommonModule, RouterOutlet, RouterModule, RouterLink, PubKinAppModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'pubkin.ui';
}
