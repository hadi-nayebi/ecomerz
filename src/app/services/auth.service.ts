import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute } from '@angular/router';
import { GoogleAuthProvider, User } from 'firebase/auth';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$!: Observable<User>;
  userCredentials$;
  constructor(public afAuth: AngularFireAuth, private route: ActivatedRoute) {
    this.user$ = <Observable<User>>afAuth.authState;
    this.userCredentials$ = afAuth.credential;
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    return this.afAuth.signInWithRedirect(new GoogleAuthProvider());
  }

  logout() {
    this.afAuth.signOut();
  }

  isNewUser() {
    return this.userCredentials$.pipe(
      map((userCredential) => {
        if (userCredential?.additionalUserInfo?.isNewUser) return true;
        return false;
      })
    );
  }

  // // Sign in with Google
  // GoogleAuth() {
  //   return this.AuthLogin(new GoogleAuthProvider());
  // }
  // // Auth logic to run auth providers
  // AuthLogin(provider: any) {
  //   return this.afAuth
  //     .signInWithRedirect(provider)
  //     .then((result: any) => {
  //       console.log('You have been successfully logged in!');
  //     })
  //     .catch((error: any) => {
  //       console.log(error);
  //     });
  // }
}
