import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { applied_user } from '../models';
import { ApiService } from '../../core';

@Injectable({
  providedIn: 'root'
})
export class AppliedUserService {

  constructor(private apiService: ApiService) { }

  applyData: applied_user = {} as applied_user;
  list: applied_user[] = [];

  getAppliedUsers(): Observable<applied_user[]> {
    return this.apiService.get(`AppliedUser`);
  }

  postApply(applyData: any) {
    return this.apiService.post(`$AppliedUser`, applyData)
  }

  getAppliedUserById(applyuserId: string): Observable<any> {
    return this.apiService.get(`AppliedUser/${applyuserId}`);
  }
}
