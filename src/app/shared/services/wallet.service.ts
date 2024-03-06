import { Injectable } from '@angular/core';
import { wallet } from '../models';
import { Observable } from 'rxjs';
import { ApiService } from '../../core';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(private apiService: ApiService) { }

  walletData: wallet = {} as wallet;
  list: wallet[] = [];

  postWallet(walletData: any): Observable<any> {
    return this.apiService.post(`Wallet`, walletData);
  }
  
  getWallet(): Observable<wallet[]> {
    return this.apiService.get(`Wallet`);
  }
}
