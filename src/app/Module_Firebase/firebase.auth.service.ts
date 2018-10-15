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
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class FireAuthService {
  private _firebaseUser: firebase.User;

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private storage: StorageService
  ) {}

  get authState() {
    return this.afAuth.authState;
  }

  get firebaseUser() {
    return this.afAuth.user;
  }

  signupWithEmailPassword(userInfo: IUser) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(userInfo.email, userInfo.password)
      .then(credential => {
        userInfo._id = credential.user.uid;
        this.addSignedUpUser(userInfo);
        this.toastr.success('Sign up successfully');
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`${errorCode}:${errorMessage}`);
        if (errorCode === 'auth/email-already-in-use') {
          this.toastr.error('This Email Address is already in use');
        }
      });
  }

  signOut() {
    this.storage.removeItem(StorageItem.CLUB_ID);
    this.storage.removeItem(StorageItem.USER_ID);
    return this.afAuth.auth.signOut();
  }

  login(clubId: string, email: string, password: string, isNew: boolean) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password).then(
      credential => {
        const userId = credential.user.uid;
        this.saveLoginStatus(clubId, userId);
        const isSuper = this.isSuper(userId);
        if (isNew && !isSuper) {
          this.addUserToClub(clubId, userId, email);
        }
        return this.getCurrentUser();
      },
      e => {
        return of(null);
      }
    );
  }

  resetPassword() {
    return of(null);
  }

  isSuper(uid) {
    if (uid === environment.suid) {
      return true;
    }
    return false;
  }

  getCurrentUser(): Observable<IUser> {
    // Get auth data, then get firestore user document || null

    const userId = this.storage.getItem(StorageItem.USER_ID);
    const isSuper = this.isSuper(userId);
    if (isSuper) {
      const superUser: IUser = {
        email: 'email',
        _id: userId,
        isSuperAdmin: true,
        role: { superUser: true }
      };
      return of(superUser);
    }
    const clubId = this.storage.getItem(StorageItem.CLUB_ID);
    const docPath = this.getDocPathUser(clubId, userId);
    return this.afs
      .doc<IUser>(docPath)
      .snapshotChanges()
      .pipe(
        map(action => {
          const user = action.payload.data() as IUser;
          if (user) {
            user['loggedInClubId'] = clubId;
          }
          return user;
        })
      );
  }

  private saveLoginStatus(clubId: string, userId: string) {
    this.storage.setItem(StorageItem.USER_ID, userId);
    this.storage.setItem(StorageItem.CLUB_ID, clubId);
  }

  private addUserToClub(clubId: string, userId: string, email: string) {
    // Sets user data to firestore on login
    const docPath = this.getDocPathUser(clubId, userId);
    const userRef: AngularFirestoreDocument<IUser> = this.afs.doc(docPath);
    const userInfo: IUser = {
      _id: userId,
      email: email,
      isMember: false,
      isActive: true,
      role: {
        subscriber: true
      }
    };
    return userRef.set(userInfo, { merge: true });
  }

  private addSignedUpUser(userInfo: IUser) {
    this.afs
      .collection('users')
      .doc(userInfo._id)
      .set({
        _id: userInfo._id,
        email: userInfo.email,
        updatedAt: this.timestamp,
        createdAt: this.timestamp
      })
      .then(c => this.signOut());
  }

  private getDocPathUser(clubId: string, userId: string) {
    return `${CollectionPath.CLUBS}/${clubId}/${
      CollectionPath.USERS
    }/${userId}`;
  }

  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  /*
  googleSignIn(clubId: string, routeOk = '/', routeFaile = '/') {
    this.afAuth.auth
      .signInWithPopup(new auth.GoogleAuthProvider())
      .then(
        credential => {
          this.addUserToClub(clubId, credential.user);
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
