import { Injectable } from '@angular/core';
import { role } from './role.model'; 
import  { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';


@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(public http:HttpClient) { }

  private roleUrl = environment.environmentUrl;
  formData : role = new role();
  list : role[];

  postRole(formData: any): Observable<any> {
    return this.http.post(`${this.roleUrl}/Role`, formData);
  }

  getRole() : Observable<role[]> { 
    return this.http.get<role[]>(`${this.roleUrl}/Role`)
  }
}
