import { Injectable } from '@angular/core'
import { workFiles } from './fileupload.model'; 
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FileuploadService {
  constructor(private http:HttpClient) { }
  readonly FilesUrl = environment.environmentUrl;
  FilesformData : workFiles = new workFiles();
  list : workFiles[];
 
  postFiles(FilesformData: any): Observable<any> {
    return this.http.post(`${this.FilesUrl}/Workfile`, FilesformData);
  }
  
  getFiles() : Observable<workFiles[]> { 
    return this.http.get<workFiles[]>(`${this.FilesUrl}/Workfile`)
  }
}
