import { Injectable } from '@angular/core';
import { notification } from '../models';
import { Observable } from 'rxjs';
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

  postNotification(notificationData: any) {
    return this.apiService.post(`Notification`, notificationData);
  }
}