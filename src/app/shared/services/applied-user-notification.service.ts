import { Injectable } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import * as signalR from "@microsoft/signalr"
import { AppliedUserNotification } from '../models/AppliedUserNotification.model';

@Injectable({
  providedIn: 'root'
})
export class AppliedUserNotificationService {

  constructor(private toast: NgToastService) {}
  private hubConnection!: signalR.HubConnection;
 
    public startConnection = () => {
      this.hubConnection = new signalR.HubConnectionBuilder()
                              .withUrl('https://localhost:7172/Notify',{ skipNegotiation: true,
                              transport: signalR.HttpTransportType.WebSockets})
                              .build();
      this.hubConnection
        .start()
        .then(() => console.log('Connection started'))
        .catch(err => console.log('Error while starting connection: ' + err))
    }
    
    public addProductListener = () => {
      this.hubConnection.on('SendMessage', (notification: AppliedUserNotification) => {
        this.showNotification(notification);
     
      });
    }

 
    showNotification(notification: AppliedUserNotification) {
      this.toast.success({detail:notification.message,sticky:true, position: 'topRight'});
    }

    public subscribeToProduct(jobId:string)
    {
      this.hubConnection.invoke("SuscribeToProduct",jobId)
    }
}
