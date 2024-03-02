import { Injectable } from '@angular/core';
import { jobPost } from '../models';
import { Observable } from 'rxjs';
import { ApiService } from '../../core';

@Injectable({
  providedIn: 'root'
})
export class JobpostService {

  constructor(private apiService: ApiService) { }

  jobData: jobPost = {} as jobPost;
  list: jobPost[] = [];

  getJobPost(): Observable<jobPost[]> {
    return this.apiService.get(`JobPost`);
  }

  postJob(jobData: any) {
    return this.apiService.post(`$JobPost`, jobData)
  }

  getJobPostById(jobId: string): Observable<any> {
    return this.apiService.get(`JobPost/${jobId}`);
  }
}
