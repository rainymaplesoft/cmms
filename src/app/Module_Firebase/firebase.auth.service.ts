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
import { switchMap, take } from 'rxjs/operators';
import { IUser, CollectionPath, IClub } from './models';
import { ToastrService } from '../Module_Core/services/toastr.service';

@Injectable()
export class FireAuthService {
  loginClubId: string;
  private firebaseUser: firebase.User;
  private _authState: Observable<firebase.User>;

  constructor(
    private router: Router,
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService
  ) {
    // this.afAuth.authState.subscribe(user => {
    //   this.firebaseUser = user;
    // });
  }

  get authState() {
    return this.afAuth.authState;
  }
  // Returns true if user is logged in
  get isAuthenticated(): boolean {
    return this.firebaseUser !== null;
  }

  getCurrentUser(loginClubId: string): Observable<IUser> {
    // Get auth data, then get firestore user document || null
    if (!loginClubId || !this.isAuthenticated) {
      return of(null);
    }
    const docPath = this.getDocPathUser(
      this.loginClubId,
      this.firebaseUser.uid
    );
    return this.afs.doc<IUser>(docPath).valueChanges();
  }

  signupWithEmailPassword(
    clubId: string,
    userInfo: IUser
  ): Promise<auth.UserCredential> {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(userInfo.email, userInfo.password)
      .then(credential => {
        userInfo._id = credential.user.uid;
        this.updateUserData(clubId, userInfo);
        this.loginClubId = clubId;
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

  signOut() {
    this.afAuth.auth.signOut();
    this.loginClubId = '';
  }

  login(clubId: string, email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password).then(
      credential => {
        const docPath = this.getDocPathUser(clubId, credential.user.uid);
        const userRef: Observable<IUser> = this.afs
          .doc<IUser>(docPath)
          .valueChanges();
        // .pipe(take(1));
        this.loginClubId = clubId;
        return userRef;
      },
      e => {
        this.loginClubId = '';
        return of(null);
      }
    );
  }

  private updateUserData(clubId: string, userInfo: IUser) {
    // Sets user data to firestore on login
    const docPath = this.getDocPathUser(clubId, userInfo._id);
    const userRef: AngularFirestoreDocument<IUser> = this.afs.doc(docPath);
    userInfo.role = {
      subscriber: true
    };
    return userRef.set(userInfo, { merge: true });
  }

  getDocPathClub(clubId: string) {
    return `${CollectionPath.CLUBS}/${clubId}`;
  }

  getDocPathUser(clubId: string, userId: string) {
    return `${CollectionPath.CLUBS}/${clubId}/${
      CollectionPath.USERS
    }/${userId}`;
  }

  getDocPathUsers(clubId: string) {
    return `${CollectionPath.CLUBS}/${clubId}/${CollectionPath.USERS}`;
  }

  /*
  googleSignIn(clubId: string, routeOk = '/', routeFaile = '/') {
    this.afAuth.auth
      .signInWithPopup(new auth.GoogleAuthProvider())
      .then(
        credential => {
          this.updateUserData(clubId, credential.user);
          this.router.navigate([routeOk]);
        },
        error => {
          console.log('auth error', error);
          this.router.navigate([routeFaile]);
        }
      )
      .catch(error => console.log('auth error', error));
  }
*/
}
