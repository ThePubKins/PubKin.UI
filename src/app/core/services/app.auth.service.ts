import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { CurrentUser } from '../models';
import { map, distinctUntilChanged } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AppAuthService {

    private currentUserSubject = new BehaviorSubject<CurrentUser>({} as CurrentUser);
    private isAuthenticatedSubject = new ReplaySubject<boolean>(1);

    public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());
    public isAuthenticated = this.isAuthenticatedSubject.asObservable();

    constructor(
        private apiService: ApiService,
        private jwtService: JwtService
    ) { }

    // Verify JWT in localstorage with server & load user's info.
    // This runs once on application startup.
    populate() {
        // If JWT detected, attempt to get & store user's info
        if (this.jwtService.getToken()) {
            this.apiService.get('/user')
                .subscribe({
                    next: data => this.setAuth(data.user),
                    error: err => this.purgeAuth()
                });
        } else {
            // Remove any potential remnants of previous auth states
            this.purgeAuth();
        }
    }

    setAuth(user: CurrentUser) {
        // Save JWT sent from server in localstorage
        this.jwtService.saveToken(user.token);
        // Set current user data into observable
        this.currentUserSubject.next(user);
        // Set isAuthenticated to true
        this.isAuthenticatedSubject.next(true);
    }

    purgeAuth() {
        this.jwtService.destroyToken();
        this.currentUserSubject.next({} as CurrentUser);
        this.isAuthenticatedSubject.next(false);
    }

    attemptAuth(type: string, credentials: any): Observable<CurrentUser> {
        const route = (type === 'login') ? '/login' : '';
        return this.apiService.post('/users' + route, { user: credentials })
            .pipe(map(
                data => {
                    this.setAuth(data.user);
                    return data;
                }
            ));
    }

    getCurrentUser(): CurrentUser {
        return this.currentUserSubject.value;
    }

    // Update the user on the server (email, pass, etc)
    update(user: CurrentUser): Observable<CurrentUser> {
        return this.apiService
            .put('/user', { user })
            .pipe(map(data => {
                this.currentUserSubject.next(data.user);
                return data.user;
            }));
    }
}
