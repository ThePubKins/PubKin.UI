import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { JobPost } from '../models';

@Injectable({
  providedIn: 'root'
})
export class JobpostService {

  constructor(private http: HttpClient) { }
  readonly jobUrl = environment.environmentUrl;
  jobData: JobPost = {} as JobPost;
  list: JobPost[] = [];

  getJobPosts(): Observable<JobPost[]> {
    return this.http.get<JobPost[]>(`${this.jobUrl}/JobPost`);
  }

  postJobPost(jobData: any) {
    return this.http.post(`${this.jobUrl}/JobPost`, jobData)
  }

  getJobDetails(jobUniqueId: string): Observable<any> {
    return this.http.get<any>(`${this.jobUrl}/JobPost/${jobUniqueId}`);
  }

}
