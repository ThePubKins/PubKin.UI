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
}
