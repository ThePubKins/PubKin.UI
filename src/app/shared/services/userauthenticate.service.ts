import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from '../../core';

@Injectable({
  providedIn: 'root'
})
export class UserauthenticateService {

  constructor(private apiService: ApiService,private router: Router) {
    this.currentUser = this.userSource.asObservable();
   }

  private userEmail: string | null = null;
  currentUser: Observable<any>
  private userSource = new BehaviorSubject<any>(null);


  login(email: string, password: string): Observable<any> {
    const credentials = { email, password };
    return this.apiService.post(`User/login`, credentials).pipe(
      tap((response) => {
        this.userEmail = email;
        sessionStorage.setItem('email', email);
        this.setToken(response.Token);
        this.getUserData();
      })
    );
  }

  userregister(firstName: string, lastName: string, email: string, password: string, role: string): Observable<any> {
    const credentials = { firstName, lastName, email, password, role };
    return this.apiService.post(`User/register`, credentials).pipe(
      tap((response) => {
        this.userEmail = email;
        sessionStorage.setItem('email', email);
        this.setToken(response.token);
        this.getUserData();
      })
    );
  }

  getUserData(): Observable<any> {
    return this.apiService.get(`User`);
  }

  setUser(user: any): void {
    this.userSource.next(user);
  }

  getUserEmail(): string | null {
    return this.userEmail;
  }

  setToken(token: string): void {
    sessionStorage.setItem('token', token);
  }

  getToken(): string | null {
    const token = sessionStorage.getItem('token');
    return token;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }

  logout(): void {
    localStorage.clear();    
    sessionStorage.clear();
    this.userEmail = null;
    this.setUser(null);
    this.router.navigate(['/']);
  }
  private hideProfileSource = new Subject<void>();
  hideProfile$ = this.hideProfileSource.asObservable();
  toggleProfileVisibility() {
    this.hideProfileSource.next(); 
  }
}
