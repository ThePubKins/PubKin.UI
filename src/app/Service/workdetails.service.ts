import { Injectable } from '@angular/core';
import { workdetails } from './workdetails.model'; 
import  { Observable , of} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkdetailsService {

  constructor(public http:HttpClient) { }

  private workDetailsUrl = environment.environmentUrl;
  formData : workdetails = new workdetails();
  list : workdetails[];

  postWorkDetails(formData: any): Observable<any> {
    return this.http.post(`${this.workDetailsUrl}/WorkDetails`, formData);
  }

  getWorkDetails() : Observable<workdetails[]> { 
    return this.http.get<workdetails[]>(`${this.workDetailsUrl}/WorkDetails`)
  }
}
