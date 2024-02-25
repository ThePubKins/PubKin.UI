import { Injectable } from '@angular/core';
import { educationdetails } from './education.model'; 
import  { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})

export class EducationService {
  constructor(public http:HttpClient) { }

  private educationUrl = environment.environmentUrl;
  formData : educationdetails = new educationdetails();
  list : educationdetails[];

  postEducation(formData: any): Observable<any> {
    return this.http.post(`${this.educationUrl}/Education`, formData);
  }

  geteducation() : Observable<educationdetails[]> { 
    return this.http.get<educationdetails[]>(`${this.educationUrl}/Education`)
  }
}
