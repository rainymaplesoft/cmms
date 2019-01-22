import { Router } from '@angular/router';
import { MetaService } from '..';
import { IUser } from '../../Module_Firebase';
import { OnInit, OnDestroy } from '@angular/core';
import RouteName from '../../routename';
import { Subscription, Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { AppState } from '../app.store';
export class ClientBase implements OnInit, OnDestroy {
  __clubId: string;
  __loggedInUser: IUser;
  subUser: Subscription;
  @Select(AppState.currentUser) currentUser$: Observable<IUser>;
  constructor(protected router: Router, protected metaService: MetaService) { }

  ngOnInit() {
    this.__clubId = this.metaService.getUrlClubId();
    this.subUser = this.currentUser$.subscribe(u => {
      this.__loggedInUser = u;
    });
  }

  ngOnDestroy(): void {
    if (this.subUser) {
      this.subUser.unsubscribe();
    }
  }

  onLogin() {
    this.router.navigate([RouteName.SignIn], {
      queryParams: { clubId: this.__clubId }
    });
  }

  onProfile() {
    this.router.navigate([RouteName.User], {
      queryParams: { clubId: this.__clubId }
    });
  }

  get welcome() {
    let name = 'To Our Club';
    if (
      this.__loggedInUser &&
      this.__loggedInUser.firstName &&
      this.__loggedInUser.lastName
    ) {
      name = `${this.__loggedInUser.firstName} ${this.__loggedInUser.lastName}`;
    }
    return name;
  }
}
