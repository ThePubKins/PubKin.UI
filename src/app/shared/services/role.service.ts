import { Injectable } from '@angular/core';
import { role } from '../models';
import { Observable } from 'rxjs';
import { ApiService } from '../../core';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private apiService: ApiService) { }

  roleData: role = {} as role;
  list: role[] = [];

  postRole(roleData: any): Observable<any> {
    return this.apiService.post(`Role`, roleData);
  }
  
  getRole(): Observable<role[]> {
    return this.apiService.get(`Role`);
  }
}
