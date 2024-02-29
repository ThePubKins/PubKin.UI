import { Injectable } from '@angular/core';
import  { Observable , of} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { workdetails } from '../models';

@Injectable({
  providedIn: 'root'
})
export class WorkdetailsService {

  constructor(public http:HttpClient) { }

  private workDetailsUrl = environment.environmentUrl;
  formData : workdetails = {} as workdetails;
  list : workdetails[] = [];

  postWorkDetails(formData: any): Observable<any> {
    return this.http.post(`${this.workDetailsUrl}/WorkDetails`, formData);
  }

  getWorkDetails() : Observable<workdetails[]> { 
    return this.http.get<workdetails[]>(`${this.workDetailsUrl}/WorkDetails`)
  }
}
