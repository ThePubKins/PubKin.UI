import { Injectable } from '@angular/core';
import { JobPost } from './jobpost.model'; 
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobpostService {

  constructor(private http:HttpClient) { }
  readonly jobUrl = environment.environmentUrl;
  jobData : JobPost = new JobPost();
  list : JobPost[];
 
  getJobPosts() : Observable<JobPost[]> { 
     return this.http.get<JobPost[]>(`${this.jobUrl}/JobPost`);
  }

  postJobPost(jobData : any) { 
    return this.http.post(`${this.jobUrl}/JobPost`, jobData)
  }
  
  getJobDetails(jobUniqueId: string): Observable<any> {
    return this.http.get<any>(`${this.jobUrl}/JobPost/${jobUniqueId}`); 
  }  

}
