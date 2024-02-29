import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { workFiles } from '../models';


@Injectable({
  providedIn: 'root'
})
export class FileuploadService {
  constructor(private http:HttpClient) { }
  readonly FilesUrl = environment.environmentUrl;
  FilesformData : workFiles = {} as workFiles;
  list : workFiles[] = [];
 
  postFiles(FilesformData: any): Observable<any> {
    return this.http.post(`${this.FilesUrl}/Workfile`, FilesformData);
  }
  
  getFiles() : Observable<workFiles[]> { 
    return this.http.get<workFiles[]>(`${this.FilesUrl}/Workfile`)
  }
}
