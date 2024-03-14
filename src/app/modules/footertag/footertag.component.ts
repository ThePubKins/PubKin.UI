import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-footertag',
  templateUrl: './footertag.component.html',
  styleUrls: ['./footertag.component.scss']
})
export class FootertagComponent implements OnInit {
  heading: string;
  content:any;

  constructor(private router: Router,private route: ActivatedRoute) { }
  navigateToProfile(action: string): void {
    this.router.navigate(['/signup', action]);
  }

  ngOnInit(): void {
    this.content = this.route.snapshot.paramMap.get('content');
  }
}
