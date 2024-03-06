import { Injectable } from '@angular/core';
import { pricingSkillDetails } from '../models';
import { Observable } from 'rxjs';
import { ApiService } from '../../core';


@Injectable({
  providedIn: 'root'
})
export class PricingSkillService {

  constructor(private apiService: ApiService) { }

  pricingSkillData: pricingSkillDetails = {} as pricingSkillDetails;
  list: pricingSkillDetails[] = [];

  postSkillPricing(pricingSkillData: any): Observable<any> {
    return this.apiService.post(`PricingSkill`, pricingSkillData);
  }
  
  getSkillPricing(): Observable<pricingSkillDetails[]> {
    return this.apiService.get(`PricingSkill`);
  }
}
