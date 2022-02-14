import { User } from 'firebase/auth';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore/';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private db: AngularFirestore) {}

  save(user: User) {
    this.db.collection('users').doc(user.uid).set({
      name: user.displayName,
      email: user.email,
    });
  }
  update(user: User) {
    this.db.collection('users').doc(user.uid).update({
      name: user.displayName,
      email: user.email,
    });
  }
}
