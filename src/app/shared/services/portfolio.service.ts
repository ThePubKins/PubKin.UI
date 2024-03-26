import { Injectable } from '@angular/core';
import { portfolio } from '../models';
import { Observable } from 'rxjs';
import { ApiService } from '../../core';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
 
    constructor(private apiService: ApiService) { }

    portfolioFormData: portfolio = {} as portfolio;
    list: portfolio[] = [];

  postPortfolios(portfolioFormData:any): Observable<any> {
    return this.apiService.post(`Portfolio`, this.portfolioFormData);
  }
  
  getPortfolios() : Observable<portfolio[]> { 
    return this.apiService.get(`Portfolio`)
  }

  putPortfolio(portfolioFormData: any): Observable<any> {
    return this.apiService.put(`Portfolio/portfoliodetails_updated`, portfolioFormData);
  }  

  deletePortfolio(id: any): Observable<any> {
    return this.apiService.delete(`Portfolio/${id}`);
  }  
}