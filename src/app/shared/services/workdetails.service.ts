import { Injectable } from '@angular/core';
import  { workdetails } from '../models';
import { Observable } from 'rxjs';
import { ApiService } from '../../core';

@Injectable({
  providedIn: 'root'
})
export class WorkdetailsService {

  constructor(private apiService: ApiService) { }

  workData: workdetails = {} as workdetails;
  list: workdetails[] = [];

  postWorkDetails(workData: any): Observable<any> {
    return this.apiService.post(`WorkDetails`, workData);
  }

  getWorkDetails() : Observable<workdetails[]> { 
    return this.apiService.get(`WorkDetails`)
  }

  putWorkDetails(workData: any): Observable<any> {
    return this.apiService.put(`WorkDetails/workdetails_updated`, workData);
  }  

  deleteWorkDetails(id: any): Observable<any> {
    return this.apiService.delete(`WorkDetails/${id}`);
  } 
}
