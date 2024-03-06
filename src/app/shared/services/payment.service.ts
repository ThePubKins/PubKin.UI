import { Injectable } from '@angular/core';
import { payment } from '../models';
import { Observable } from 'rxjs';
import { ApiService } from '../../core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private apiService: ApiService) { }

  paymentData: payment = {} as payment;
  list: payment[] = [];

  postPayment(paymentData: any): Observable<any> {
    return this.apiService.post(`Payment`, paymentData);
  }
  
  getPayment(): Observable<payment[]> {
    return this.apiService.get(`Payment`);
  }
}
