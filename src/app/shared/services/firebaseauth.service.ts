import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';

@Injectable({ 
  providedIn: 'root'
})
export class FirebaseAuthService {
  user$: Observable<any>;

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase,    private storage: AngularFireStorage ) {
    this.user$ = this.afAuth.authState;
  }

  // signUp(email: string, password: string, displayName: string, firstName: string, lastName: string): Promise<any> {
  //   return this.afAuth.createUserWithEmailAndPassword(email, password)
  //     .then((userCredential) => {
  //       const user = userCredential.user;
  //       if (user) {
  //         // Store user data in the Realtime Database
  //         const userData = {
  //           displayName: displayName,
  //           email: email,
  //           uid: user.uid,
  //           firstName: firstName,
  //           lastName: lastName,
  //           password: password
  //         };

  //         return this.db.object(`users/${user.uid}`).set(userData);
  //       } else {
  //         throw new Error('User is null after sign-up');
  //       }
  //     });
  // }

  signUp(email: string, password: string, displayName: string, firstName: string, lastName: string): Promise<any> {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          // Upload profile image to Firebase Storage
          // if (profileImage) {
          //   const imagePath = `profile-images/${user.uid}`;
          //   const imageRef = this.storage.ref(imagePath);
          //   // const uploadTask = this.storage.upload(imagePath, profileImage);
  
          //   uploadTask.then(() => {
          //     imageRef.getDownloadURL().subscribe((url) => {
          //       // Store user data with profile image URL in Realtime Database
          //       const userData = {
          //         displayName: displayName,
          //         email: email,
          //         uid: user.uid,
          //         firstName: firstName,
          //         lastName: lastName,
          //         profileImageURL: url,
          //       };
  
          //       this.db.object(`users/${user.uid}`).set(userData);
          //     });
          //   });
          // } else {
            // If no profile image provided, store user data without the image URL
            const userData = {
              displayName: displayName,
              email: email,
              uid: user.uid,
              firstName: firstName,
              lastName: lastName,
            };
  
            this.db.object(`users/${user.uid}`).set(userData);
          }
      });
  }
  signIn(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  signOut(): Promise<void> {
    return this.afAuth.signOut();
  }
}
