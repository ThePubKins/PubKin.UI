import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot }
    from '@angular/router';
import { Observable } from 'rxjs';

import { map, take } from 'rxjs/operators';
import { UserAuthService } from '../services';

@Injectable({ providedIn: 'root' })
export class PermissionsService {
    constructor(private userAuthService: UserAuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.userAuthService.isAuthenticated.pipe(take(1));
    }
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => {
    return inject(PermissionsService).canActivate(next, state);
}
