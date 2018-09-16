import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { auth } from 'firebase';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { switchMap } from 'rxjs/operators';
import { ToastrService } from '../Module_Core/services/toastr.service';
// import { switchMap } from 'rxjs/operators';

export interface IUser {
  uid: string;
  email: string;
  password: string;
  passwordConfirm: string;
  cellPhone: string;
  firstName: string;
  lastName: string;
  gender: number;
}

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
    //// Get auth data, then get firestore user document || null
    // this.user$ = this.afAuth.authState.pipe(
    //   switchMap(user => {
    //     if (user) {
    //       return this.afs.doc<IUser>(`users/${user.uid}`).valueChanges();
    //     } else {
    //       return Observable.of(null);
    //     }
    //   })
    // );
  }

  signupWithEmailPassword(
    email: string,
    password: string
  ): Promise<auth.UserCredential> {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
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

  loginWithGoogle(routeOk: string, routeFaile = '/') {
    this.afAuth.auth
      .signInWithPopup(new auth.GoogleAuthProvider())
      .then(
        d => this.router.navigate([routeOk]),
        e => this.router.navigate([routeFaile])
      )
      .catch(error => console.log('auth error', error));
  }

  ///// Login/Signup //////

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider).then(credential => {
      this.updateUserData(credential.user);
    });
  }

  signOut(route = '/') {
    this.afAuth.auth.signOut();
    this.router.navigate([route]);
  }

  private updateUserData(user: any) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const data: any = {
      uid: user.uid,
      email: user.email,
      // cellPhone: user.cellPhone,
      password: user.password
    };
    return userRef.set(data, { merge: true });
  }
}
