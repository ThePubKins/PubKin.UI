import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(
    private http: HttpClient  
  ) { }

  private formatErrors(error: any): Observable<never> {
    return throwError(() => error.error);
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.baseApiURL}${path}`, { params })
      .pipe(catchError(this.formatErrors));
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${environment.baseApiURL}${path}`,body
    ).pipe(catchError(this.formatErrors));
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${environment.baseApiURL}${path}`,body
    ).pipe(catchError(this.formatErrors));
  }

  


  delete(path: string): Observable<any> {
    return this.http.delete(
      `${environment.baseApiURL}${path}`
    ).pipe(catchError(this.formatErrors));
  }
}
