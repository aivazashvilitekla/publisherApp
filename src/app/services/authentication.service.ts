import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { Router } from '@angular/router';
import { from } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private _currentUser: firebase.default.User | undefined | null;
  constructor(public afAuth: AngularFireAuth, public router: Router) {
    this.afAuth.authState.subscribe((user) => {
      this._currentUser = user;
    })
  }
  get currentUserState() {
    return this.afAuth.authState;
  }
  get currentUser() {
    return this._currentUser;
  }
  // Sign in with email/password
  SignIn(email: string, password: string) {
    return from(this.afAuth.signInWithEmailAndPassword(email, password));
  }
  // Sign up with email/password
  SignUp(email: string, password: string) {
    return from(
      this.afAuth.createUserWithEmailAndPassword(email, password)
    );
  }
  // Sign out
  SignOut() {
    return from(this.afAuth.signOut());
  }
  
}