import { Injectable } from '@angular/core';
import { Users, role } from '../models';
import { Observable } from 'rxjs';
import { ApiService } from '../../core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService: ApiService) { }

  userData: Users = {} as Users;
  list: Users[] = [];

  putGovtDetails(userData: any): Observable<any> {
    return this.apiService.put(`User/govt-id-details`, userData);
  }

  putPersonalData(userData: any): Observable<any> {
    return this.apiService.put(`User/personalData`, userData);
  }

  putFreelancingDetails(userData: any): Observable<any> {
    return this.apiService.put(`User/freelancing`, userData);
  }

  putProfile(userData: any): Observable<any> {
    return this.apiService.put(`User/profilepicture`, userData);
  }

  putProfilePercentage(formData: any): Observable<any> {
    return this.apiService.put(`User/profilepercentage`, formData);
  }

  getmail(): Observable<Users[]> {
    return this.apiService.get(`User/emails`);
  }
}