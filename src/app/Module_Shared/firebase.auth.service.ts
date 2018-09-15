import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { auth } from 'firebase';

@Injectable()
export class FireAuthService {
  // user$: Observable<firebase.User>;

  constructor(private router: Router, private afAuth: AngularFireAuth) {
    // this.user$ = this.afAuth.authState;
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

  logout(route = '/') {
    this.afAuth.auth.signOut();
    this.router.navigate([route]);
  }
}
