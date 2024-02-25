import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../environment/environment';
import { Router } from '@angular/router';
declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class UserauthenticateService {

  private registerUrl = environment.userurl;
  private userEmail: string | null = null;
  currentUser: Observable<any>
  private userSource = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient, private router: Router) {
    this.currentUser = this.userSource.asObservable();
  }

  login(email: string, password: string): Observable<any> {
    const credentials = { email, password };
    return this.http.post<any>(`${this.registerUrl}/generateToken`, credentials).pipe(
        tap((response) => {
            this.userEmail = email;       
            sessionStorage.setItem('email', email);
            this.setToken(response.Token);
            this.getUserData();
        })
    );
}

  userregister(firstName: string, lastName: string, email: string, password: string, role:string): Observable<any> {
    const credentials = { firstName, lastName, email, password, role };
    return this.http.post<any>(`${this.registerUrl}/register`, credentials).pipe(
      tap((response) => {
        this.userEmail = email;
        sessionStorage.setItem('email', email);
        this.setToken(response.token);
        this.getUserData();
      })
    );
  }

  getUserData(): Observable<any> {
    return this.http.get<any>(`${this.registerUrl}`)
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
    sessionStorage.removeItem('token');
    this.userEmail = null;
    this.setUser(null);
    this.router.navigate(['/']);
  }

  signOut() {
    google.accounts.id.disableAutoSelect();
    this.router.navigate(['/']);
  }
}
