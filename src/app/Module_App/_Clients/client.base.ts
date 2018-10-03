import { Router } from '@angular/router';
import { MetaService } from 'src/app/Module_App';
import { IUser } from 'src/app/Module_Firebase';
import { OnInit } from '@angular/core';
import RouteName from 'src/app/routename';
export class ClientBase implements OnInit {
  __clubId: string;
  __loggedInUser: IUser;
  constructor(protected router: Router, protected metaService: MetaService) {}

  ngOnInit() {
    this.__clubId = this.metaService.getUrlClubId(this.router.url);
    this.metaService.loggedInUser.subscribe(u => {
      this.__loggedInUser = u;
    });
  }

  onLogin() {
    this.router.navigate([RouteName.Sign], {
      queryParams: { clubId: this.__clubId }
    });
  }

  get welcome() {
    return this.__loggedInUser
      ? `${this.__loggedInUser.firstName} ${this.__loggedInUser.lastName}`
      : ' To Our Badminton Club';
  }
}
