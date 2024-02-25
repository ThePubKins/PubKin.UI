import { Injectable } from '@angular/core';
import { pricingSkillDetails } from './payment.model';
import  { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(public http:HttpClient) { }

  private pricingSkillUrl = environment.environmentUrl;
  SkillData : pricingSkillDetails = new pricingSkillDetails();
  list : pricingSkillDetails[];

  postPricingSkill(SkillData: any): Observable<any> {
    return this.http.post(`${this.pricingSkillUrl}/PricingSkill`, SkillData);
  }

  getPricingSkill() : Observable<pricingSkillDetails[]> { 
    return this.http.get<pricingSkillDetails[]>(`${this.pricingSkillUrl}/PricingSkill`)
  }
}
