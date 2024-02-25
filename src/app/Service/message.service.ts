import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, map } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  uploadDefaultImage() {
    throw new Error('Method not implemented.');
  }
  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) {}

  setupMessageUpdates(userId: string, targetId: string, callback: (messages: any[]) => void): void {
    const chatPath = this.getChatPath(userId, targetId);

    this.db.list(chatPath).valueChanges().subscribe(messages => {
      callback(messages as any[]); 
    });
  }
  sendMessage(senderId: string, receiverId: string, content: string, imageFile?: File): Promise<void> {
    const messageId = this.db.createPushId();
    const timestamp = Date.now();
    const messageData: {
      content?: string;
      senderId: string;
      receiverId: string;
      createdAt: number;
      updatedAt: number;
      imageURL?: string;
    } = {
      senderId,
      receiverId,
      createdAt: timestamp,
      updatedAt: timestamp
    };

    if (content.trim() !== '') {
      messageData.content = content.trim();
    }
  
    const chatPath = this.getChatPath(senderId, receiverId);
  
    const updates: { [key: string]: any } = {};
    updates[`${chatPath}/${messageId}`] = messageData;
    if (imageFile) {
      const imagePath = `message-images/${messageId}`;
      const imageRef = this.storage.ref(imagePath);
      const uploadTask = this.storage.upload(imagePath, imageFile);
  
      return new Promise<void>((resolve, reject) => {
        uploadTask.then(() => {
          imageRef.getDownloadURL().subscribe((url) => {
            messageData.imageURL = url;
            this.db.object('/').update(updates).then(() => {
              resolve();
            });
          }, reject); 
        }, reject);
      });
    } else {
      return this.db.object('/').update(updates);
    }
  }
  private getChatPath(userId: string, targetId: string): string {
    const users = [userId, targetId].sort(); 
    return `messages/${users[0]}/${users[1]}`;
  }
    // ___________________________________________________new 05/1/2024
    getLastMessage(userId: string, targetId: string): Observable<any | null> {
      const chatPath = this.getChatPath(userId, targetId);
  
      return this.db
        .list(chatPath, ref => ref.orderByChild('timestamp').limitToLast(1))
        .valueChanges()
        .pipe(
          map(messages => (messages && messages.length > 0 ? messages[0] : null))
        );
    }
}
