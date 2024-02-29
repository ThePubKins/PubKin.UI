import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { educationdetails } from '../models';
import { ApiService } from '../../core';

@Injectable({
  providedIn: 'root'
})

export class EducationService {

  constructor(private apiService: ApiService) { }

  educationData: educationdetails = {} as educationdetails;
  list: educationdetails[] = [];

  postEducation(educationData: any): Observable<any> {
    return this.apiService.post(`Education`, educationData);
  }
  
  geteducation(): Observable<educationdetails[]> {
    return this.apiService.get(`Education`);
  }
}
