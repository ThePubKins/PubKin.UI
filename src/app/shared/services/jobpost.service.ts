import { Injectable } from '@angular/core';
import { jobpost } from '../models';
import { Observable } from 'rxjs';
import { ApiService } from '../../core';

@Injectable({
  providedIn: 'root'
})

export class JobpostService {

  constructor(private apiService: ApiService) { }

  jobData: jobpost = {} as jobpost;
  list: jobpost[] = [];

  getJobPost(): Observable<jobpost[]> {
    return this.apiService.get(`JobPost`);
  }

  postJobPost(formData: FormData): Observable<any> {
    return this.apiService.post(`JobPost`, formData);
  }
  
  getJobPostById(jobId: string): Observable<any> {
    return this.apiService.get(`JobPost/${jobId}`);
  }

  JobStatus(jobData: any): Observable<any> {
    return this.apiService.put(`JobPost/status`,jobData);
  }
}
