import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { applied_user } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AppliedUserService {

  constructor(private http: HttpClient) { }
  
  readonly applyUrl = environment.environmentUrl;
  applyData: applied_user = {} as applied_user;
  list: applied_user[] = [];

  getAppliedUsers(): Observable<applied_user[]> {
    return this.http.get<applied_user[]>(`${this.applyUrl}/AppliedUser`);
  }

  postApply(applyData: any) {
    return this.http.post(`${this.applyUrl}/AppliedUser`, applyData)
  }

  getAppliedUserById(jobId: string): Observable<any> {
    return this.http.get<any>(`${this.applyUrl}/AppliedUser/${jobId}`);
  }

}
