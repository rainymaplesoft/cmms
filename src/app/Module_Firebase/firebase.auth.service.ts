import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { auth } from 'firebase';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { switchMap } from 'rxjs/operators';
import { ToastrService } from '../Module_Core/services/toastr.service';
import { IUser } from '.';
// import { switchMap } from 'rxjs/operators';

@Injectable()
export class FireAuthService {
  // user$: Observable<firebase.User>;

  user$: Observable<IUser>;
  constructor(
    private router: Router,
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService
  ) {
    this.getCurrentUser();
  }

  private getCurrentUser() {
    // Get auth data, then get firestore user document || null
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<IUser>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  signupWithEmailPassword(
    email: string,
    password: string
  ): Promise<auth.UserCredential> {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(credential => {
        this.updateUserData(credential.user);
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`${errorCode}:${errorMessage}`);
        if (errorCode === 'auth/email-already-in-use') {
          this.toastr.error('This Email Address is already in use');
        }
        return null;
      });
  }

  googleSignIn(routeOk = '/', routeFaile = '/') {
    this.afAuth.auth
      .signInWithPopup(new auth.GoogleAuthProvider())
      .then(
        credential => {
          this.updateUserData(credential.user);
          this.router.navigate([routeOk]);
        },
        error => {
          console.log('auth error', error);
          this.router.navigate([routeFaile]);
        }
      )
      .catch(error => console.log('auth error', error));
  }

  signOut(route = '/') {
    this.afAuth.auth.signOut();
    this.router.navigate([route]);
  }

  private updateUserData(user: any) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<IUser> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: IUser = {
      uid: user.uid,
      email: user.email,
      role: {
        subscriber: true
      }
    };
    return userRef.set(userData, { merge: true });
  }
}
