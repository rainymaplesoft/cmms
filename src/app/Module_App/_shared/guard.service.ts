import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import * as firebase from 'firebase';
import { FireAuthService, IUser } from '../../Module_Firebase';
import { Observable, of } from 'rxjs';
import { RouteName } from '../../routename';
import { take, switchMap, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: FireAuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    console.log('AuthGuard#canActivate called');
    return this.authService.authState.pipe(
      map((u: firebase.User) => {
        if (!u) {
          this.router.navigate([RouteName.Home]);
          return false;
        }
        return true;
      })
    );
  }
}

@Injectable({ providedIn: 'root' })
export class AuthMemberGuard implements CanActivate {
  constructor(private authService: FireAuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.authState.pipe(
      switchMap((firebaseUser: firebase.User) => {
        if (!firebaseUser) {
          this.router.navigate([RouteName.Home]);
          return of(false);
        }
        return this.authService.getCurrentUser().pipe(
          take(1),
          map(u => {
            if (!u && !u.isMember) {
              this.router.navigate([RouteName.Home]);
              return false;
            }
            return true;
          })
        );
      })
    );
  }
}

@Injectable({ providedIn: 'root' })
export class AuthAdminGuard implements CanActivate {
  private _firebaseUser: firebase.User;
  constructor(private authService: FireAuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.authState.pipe(
      switchMap((firebaseUser: firebase.User) => {
        if (!firebaseUser) {
          this.router.navigate([RouteName.Home]);
          return of(false);
        }
        return this.authService.getCurrentUser().pipe(
          take(1),
          map(u => {
            if (!u && !u.isAdmin && !u.isSuperAdmin) {
              this.router.navigate([RouteName.Home]);
              return false;
            }
            return true;
          })
        );
      })
    );
  }
}

@Injectable({ providedIn: 'root' })
export class AuthSuperMemberGuard implements CanActivate {
  private _firebaseUser: firebase.User;
  private _loggedInUser: IUser;
  constructor(private authService: FireAuthService, private router: Router) {
    this.authService.authState.subscribe((u: firebase.User) => {
      this._firebaseUser = u;
    });
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.authState.pipe(
      switchMap((firebaseUser: firebase.User) => {
        if (!firebaseUser) {
          this.router.navigate([RouteName.Home]);
          return of(false);
        }
        return this.authService.getCurrentUser().pipe(
          take(1),
          map(u => {
            if (!u && !u.isSuperAdmin) {
              this.router.navigate([RouteName.Home]);
              return false;
            }
            return true;
          })
        );
      })
    );
  }
}
