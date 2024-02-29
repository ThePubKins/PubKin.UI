import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageUserService {
  constructor(private db: AngularFireDatabase) { }

  storeUserData(uid: string, email: string): Promise<void> {
    const userRef = this.db.object(`users/${uid}`);
    const userData = { uid, email, displayName: email.split('@')[0] };
    return userRef.set(userData);
  }

  getAllUsers(): Observable<any[]> {
    return this.db.list('users').valueChanges() as Observable<any[]>;
  }

  sendFriendRequest(senderId: string, receiverId: string): Promise<void> {
    return this.db.object(`friendRequests/${senderId}/${receiverId}`).set(true);
  }

  acceptFriendRequest(userId: string, friendId: string): Promise<void> {
    const updates: { [key: string]: any } = {};
    updates[`friends/${userId}/${friendId}`] = true;
    updates[`friends/${friendId}/${userId}`] = true;
    updates[`friendRequests/${friendId}/${userId}`] = null;
    return this.db.object('/').update(updates);
  }


  getFriends(userId: string): Observable<any> {
    return this.db.object(`friends/${userId}`).valueChanges();
  }
}
