import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import RouteName from '../../routename';
import { IUser } from '../../Module_Firebase';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'main-lpbc',
  templateUrl: 'main-lpbc.component.html',
  styleUrls: ['../client.component.scss']
})
export class MainLPBCComponent implements OnInit, OnDestroy {
  sub: Subscription;
  clubId: string;
  loggedInUser: IUser;
  banner = `assets/img/club/club_banner_LPBC.jpg`;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    const path = this.router.url;
    this.sub = this.route.queryParams.subscribe(params => {
      this.clubId = params['clubId'];
    });
  }

  onLogin() {
    this.router.navigate([RouteName.Sign], {
      queryParams: { clubId: this.clubId }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  get welcome() {
    return this.loggedInUser
      ? `${this.loggedInUser.firstName} ${this.loggedInUser.lastName}`
      : ' To Our Badminton Club';
  }
}
