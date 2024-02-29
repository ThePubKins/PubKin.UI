import { Injectable } from '@angular/core';
import { Users } from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http: HttpClient) { }

  readonly Userurl = environment.userurl;
  userData: Users;
  users: Users[];

  postGovtDetails(formData: any): Observable<any> {
    return this.http.post(`${this.Userurl}/Govt-Id-Details`, formData);
  }

  postExperienceDetails(formData: any): Observable<any> {
    return this.http.post(`${this.Userurl}/Experience-Details`, formData);
  }
  getmail(): Observable<Users[]> {
    return this.http.get<Users[]>(`${this.Userurl}/emails`)
  }

  percentage(formData: any): Observable<any> {
    return this.http.post(`${this.Userurl}/profilepercentage`, formData);
  }
}