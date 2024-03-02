import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { bankDetails } from '../models';
import { ApiService } from '../../core';

@Injectable({
  providedIn: 'root'
})
export class BankDetailsService {

  constructor(private apiService: ApiService) { }

  bankData: bankDetails = {} as bankDetails;
  list: bankDetails[] = [];

  getBankDetails(): Observable<bankDetails[]> {
    return this.apiService.get(`BankDetails`);
  }

  postBankDetails(bankData: any) {
    return this.apiService.post(`$BankDetails`, bankData)
  }
}
