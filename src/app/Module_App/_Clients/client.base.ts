import { Router } from '@angular/router';
import { MetaService } from '..';
import { IUser } from '../../Module_Firebase';
import { OnInit } from '@angular/core';
import RouteName from '../../routename';
export class ClientBase implements OnInit {
  __clubId: string;
  __loggedInUser: IUser;
  constructor(protected router: Router, protected metaService: MetaService) {}

  ngOnInit() {
    this.__clubId = this.metaService.getUrlClubId();
    this.metaService.getLoggedInUser.subscribe(u => {
      this.__loggedInUser = u;
    });
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
