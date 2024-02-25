import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserauthenticateService } from './userauthenticate.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private uerauthenticateservice: UserauthenticateService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.uerauthenticateservice.getToken();

    if (token) {
      const modifiedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

      return next.handle(modifiedRequest);
    }
    return next.handle(request);
  }
}
