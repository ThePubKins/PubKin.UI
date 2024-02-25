import { Injectable } from '@angular/core';
import { workfile } from './workfile.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WorkfileService {

  constructor(public http:HttpClient) { }

  readonly workfileUrl = environment.environmentUrl;
  workFormData : workfile = new workfile();
  list : workfile[];

  postFile(workFormData:any): Observable<any> {
    return this.http.post(`${this.workfileUrl}/Workfile`, this.workFormData);
  }
  
  getfile() : Observable<workfile[]> { 
    return this.http.get<workfile[]>(`${this.workfileUrl}/Workfile`)
  }

}
