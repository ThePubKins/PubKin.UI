import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { workfile } from '../models';
@Injectable({
  providedIn: 'root'
})
export class WorkfileService {

  constructor(public http: HttpClient) { }

  readonly workfileUrl = environment.environmentUrl;
  workFormData: workfile = {} as workfile;
  list: workfile[] = [];

  postFile(workFormData: any): Observable<any> {
    return this.http.post(`${this.workfileUrl}/Workfile`, this.workFormData);
  }

  getfile(): Observable<workfile[]> {
    return this.http.get<workfile[]>(`${this.workfileUrl}/Workfile`)
  }

}
