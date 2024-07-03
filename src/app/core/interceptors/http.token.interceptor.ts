import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

import { JwtService } from '../services';

@Injectable({ providedIn: 'root' })
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(private jwtService: JwtService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headersConfig: any = {
      'Accept': 'application/json'
    };

    if (!(req.body instanceof FormData)) {
      headersConfig['Content-Type'] = 'application/json';
    }

    const token = this.jwtService.getToken();

    if (token) {
      headersConfig['Authorization'] = `Bearer ${token}`;
    }

    const request = req.clone({ setHeaders: headersConfig });

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('HTTP Error:', error);
        return throwError(error);
      })
    );
  }
}