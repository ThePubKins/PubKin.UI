import { Injectable } from '@angular/core';
import { bankDetails } from './bank-details.model';
import  { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class BankDetailsService {

  constructor(public http:HttpClient) { }

  private bankDetailsUrl = environment.environmentUrl;
  bankformData : bankDetails = new bankDetails();
  list : bankDetails[];

  postBankDetails(bankformData: any): Observable<any> {
    return this.http.post(`${this.bankDetailsUrl}/BankDetails`, bankformData);
  }

  getBankDetails() : Observable<bankDetails[]> { 
    return this.http.get<bankDetails[]>(`${this.bankDetailsUrl}/BankDetails`)
  }
}
