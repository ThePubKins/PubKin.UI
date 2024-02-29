import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class JwtService {

    getToken(): String {
        return window.localStorage['pubkinJWTToken'];
    }

    saveToken(token: String) {
        window.localStorage['pubkinJWTToken'] = token;
    }

    destroyToken() {
        window.localStorage.removeItem('pubkinJWTToken');
    }

}