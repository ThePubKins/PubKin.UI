import { Injectable } from '@angular/core';
import  { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { pricingSkillDetails } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(public http:HttpClient) { }

  private pricingSkillUrl = environment.environmentUrl;
  SkillData : pricingSkillDetails = {} as pricingSkillDetails;
  list : pricingSkillDetails[] = [];

  postPricingSkill(SkillData: any): Observable<any> {
    return this.http.post(`${this.pricingSkillUrl}/PricingSkill`, SkillData);
  }

  getPricingSkill() : Observable<pricingSkillDetails[]> { 
    return this.http.get<pricingSkillDetails[]>(`${this.pricingSkillUrl}/PricingSkill`)
  }
}
