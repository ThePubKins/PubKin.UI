import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, throwError } from 'rxjs';
import { CommentsService, comments } from '../../shared';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent  {
 
  constructor(private router: Router,public http: HttpClient, public commentService : CommentsService) {
    
   }

  user1  = "'author'";
  hide = false;

  hide1() {
    this.hide = !this.hide
  }
  
  navigateToProfile(action: string): void {
    this.router.navigate(['/signup', action]);
  }

  navigateToPubkin(content: string): void {
    this.router.navigate(['/docs', content]);
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });}
 
}

