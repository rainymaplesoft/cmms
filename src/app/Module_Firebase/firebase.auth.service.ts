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
import { IUser, CollectionPath, IClub, StorageItem } from './models';
import { ToastrService } from '../Module_Core/services/toastr.service';
import { StorageService } from '../Module_Core';

@Injectable()
export class FireAuthService {
  private firebaseUser: firebase.User;

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private storage: StorageService
  ) {}

  get authState() {
    return this.afAuth.authState;
  }
  // Returns true if user is logged in
  get isAuthenticated(): boolean {
    return this.firebaseUser !== null;
  }

  getCurrentUser(): Observable<IUser> {
    // Get auth data, then get firestore user document || null
    const userId = this.storage.getItem(StorageItem.USER_ID);
    const clubId = this.storage.getItem(StorageItem.CLUB_ID);
    if (!userId || !this.isAuthenticated) {
      return of(null);
    }
    const docPath = this.getDocPathUser(clubId, userId);
    return this.afs.doc<IUser>(docPath).valueChanges();
  }

  signupWithEmailPassword(clubId: string, userInfo: IUser) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(userInfo.email, userInfo.password)
      .then(credential => {
        userInfo._id = credential.user.uid;
        this.saveLoginStatus(clubId, credential.user.uid);
        this.updateUserData(clubId, userInfo);
        return this.getCurrentUser();
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`${errorCode}:${errorMessage}`);
        if (errorCode === 'auth/email-already-in-use') {
          this.toastr.error('This Email Address is already in use');
        }
        return of(null);
      });
  }

  signOut() {
    this.afAuth.auth.signOut();
    this.storage.removeItem(StorageItem.CLUB_ID);
    this.storage.removeItem(StorageItem.USER_ID);
  }

  login(clubId: string, email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password).then(
      credential => {
        this.saveLoginStatus(clubId, credential.user.uid);
        return this.getCurrentUser();
      },
      e => {
        return of(null);
      }
    );
  }

  private saveLoginStatus(clubId: string, userId: string) {
    this.storage.setItem(StorageItem.USER_ID, userId);
    this.storage.setItem(StorageItem.CLUB_ID, clubId);
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
