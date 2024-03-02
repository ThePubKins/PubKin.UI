import { Injectable } from '@angular/core';
import { workfile } from '../models';
import { Observable } from 'rxjs';
import { ApiService } from '../../core';

@Injectable({
  providedIn: 'root'
})
export class WorkfileService {

  constructor(private apiService: ApiService) { }

  fileData: workfile = {} as workfile;
  list: workfile[] = [];

  postFile(fileData: any): Observable<any> {
    return this.apiService.post(`Workfile`, this.fileData);
  }

  getfile(): Observable<workfile[]> {
    return this.apiService.get(`Workfile`)
  }

}
