import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-footertag',
  templateUrl: './footertag.component.html',
  styleUrls: ['./footertag.component.css']
})
export class FootertagComponent implements OnInit {
  heading: string;
  constructor(private router: Router,private route: ActivatedRoute) { }
  navigateToProfile(action: string): void {
    this.router.navigate(['/signup', action]);
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.heading = params['heading'];
    });
  }
}
