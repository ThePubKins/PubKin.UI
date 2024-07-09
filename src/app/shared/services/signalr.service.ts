import { Injectable } from "@angular/core";
import * as signalR from "@microsoft/signalr";
import { NgToastService } from "ng-angular-popup";
import { AppliedUserNotification } from "../models/AppliedUserNotification.model";

@Injectable({
  providedIn: "root",
})
export class SignalrService {
  constructor(public toast: NgToastService) {}
  private hubConnection!: signalR.HubConnection;

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl("http://13.232.215.57:5001/Notify", {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .build();
    this.hubConnection
      .start()
      .then(() => console.log("Connection started"))
      .catch((err) => console.log("Error while starting connection: " + err));
  };

  showNotification(notification: AppliedUserNotification) {
    this.toast.success({
      detail: notification.message,
      sticky: false,
      position: "bottomRight",
      duration: 6000,
    });
  }

  public addNotificationListener = (userId: string) => {
    this.hubConnection.on("SendMessage", (notification: AppliedUserNotification) => {
      if (notification.productID === userId) {
        this.showNotification(notification);
      }   
    });
  };

  public sendNotification(message: string) {
    this.hubConnection.invoke('SendNotification', message)
      .then(() => console.log('Notification sent'))
      .catch(error => console.error('Error sending notification:', error));
  }
}
