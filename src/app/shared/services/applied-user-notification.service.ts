import { Injectable, NgZone  } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import * as signalR from "@microsoft/signalr"
import { AppliedUserNotification } from '../models/AppliedUserNotification.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppliedUserNotificationService {


  constructor(private toast: NgToastService,  private zone: NgZone) {}
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
        this.triggerChangeDetection();      
      });
    }

 
    showNotification(notification: AppliedUserNotification) {
      this.toast.success({detail:notification.message,sticky:false, position: 'topRight'});
    }

    public subscribeToProduct(jobId:string)
    {
      this.hubConnection.invoke("SuscribeToProduct",jobId)
    }

    private triggerChangeDetection(): void {
      this.zone.run(() => {}); 
    }
}
