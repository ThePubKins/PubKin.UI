import { Injectable } from '@angular/core';
import { notification } from '../models';
import { BehaviorSubject, Observable, of, startWith } from 'rxjs';
import { interval, switchMap } from 'rxjs';
import { ApiService } from '../../core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private apiService: ApiService) { }
  notificationData: notification = {} as notification;
  list: notification[] = [];

  getNotificaions(): Observable<notification[]> {
    return this.apiService.get(`Notification`);
  }

  getNotificationsPeriodically(): Observable<notification[]> {
    return interval(10000).pipe(
      startWith(0), 
      switchMap(() => this.getNotificaions())
    );
  }


  postNotification(userId: string, notificationData: any) {
    return this.apiService.post(`Notification?userId=${userId}`, notificationData);
  }  
}
